#!/usr/bin/env bash
#
# scripts/build-otp-graph.sh
#
# OpenTripPlanner (OTP) 用のグラフを OSM（道路・徒歩網）+ GTFS-JP（公共交通時刻表）から
# ビルドするスクリプト。Issue #82（前泊判定と移動時間の事前計算）用。
#
# OTP は常設サーバーとして運用しない。ローカル開発機や GitHub Actions の使い捨てランナー上で
# 一時的にグラフをビルド・サーバーを起動し、計算が終わったら破棄する運用を前提とする
# （このスクリプトはグラフビルドまで。サーバー起動・移動時間計算は別スクリプト/ワークフロー側で行う）。
#
# 使い方:
#   scripts/build-otp-graph.sh [--region kanto] [--build-dir .otp-build] [--xmx 6g] [--force]
#
# 環境変数（コマンドライン引数が優先）:
#   OSM_REGION         OSM抽出リージョン名（Geofabrik）。デフォルト: kanto
#                       "japan" を指定すると全国版 (japan-latest.osm.pbf) を使う
#   OTP_BUILD_DIR       作業ディレクトリ。デフォルト: <repo>/.otp-build（.gitignore 対象）
#   JAVA_XMX            OTP コンテナに割り当てる JVM ヒープサイズ。デフォルト: 6g
#                        （関東地方程度のOSMデータでもデフォルトヒープでは
#                          OutOfMemoryError: Java heap space になることを実証済み。
#                          全国版はさらに大きい値が必要になる可能性がある）
#   OTP_DOCKER_IMAGE    OTP Dockerイメージ。デフォルト: opentripplanner/opentripplanner:latest
#   GTFS_URLS           GTFS-JP zip の URL（カンマ区切り、省略可）
#   GTFS_SOURCES_FILE   GTFS URL 一覧を記載したJSON設定ファイル。
#                        デフォルト: scripts/gtfs-sources.json
#                        （jq が無い環境では読み飛ばされる。GTFS_URLS 環境変数のみでも運用可能）
#   FORCE_DOWNLOAD       1 を指定すると既存ファイルがあっても再ダウンロードする
#
# 出力:
#   成功時、"${OTP_BUILD_DIR}/graph.obj" のパスを標準出力に表示して終了する。
#
# ── GTFS-JPデータについて ──────────────────────────────────────────────
#   日本の公共交通GTFS-JPは主に公共交通オープンデータセンター（ODPT,
#   https://developer.odpt.org/）が提供。無料APIキー登録制で、本スクリプト作成時点では
#   申請中・未取得（このタスクの範囲外）。よってGTFS_URLS / gtfs-sources.json が
#   空でもOSMのみでグラフビルドできる設計にしている。
#
#   ODPTのURLパターン例（参考、キー取得後に使う想定。プレースホルダー）:
#     https://api.odpt.org/api/v4/files/<事業者>/data/<ファイル名>.zip?acl:consumerKey=<APIキー>
#
#   ODPTに無い事業者（JR西日本・四国・九州、関西・中部・九州の一部私鉄、地方バス路線等）は
#   各事業者が個別公開しているGTFS-JPを https://www.gtfs.jp/ 等のリストから収集して補完する。
#
#   ⚠️ フィードごとに利用条件（商用利用可否・クレジット表記義務等）のライセンスを
#      必ず確認してから GTFS_SOURCES_FILE / GTFS_URLS に追加すること。
#
# ── 既知の注意点（ローカルWindows実行時） ────────────────────────────────
#   ⚠️ Windows Docker Desktop: ホストのバインドマウント（-v）経由でのグラフ保存
#      （graph.obj の書き込み）が極端に遅い場合がある。実測: 関東地方のみのOSMデータで
#      約500MB→662MBのgraph.obj書き込みに約4.5時間かかった（名前付きボリュームに変えても
#      改善しなかった）。Linux環境（GitHub Actionsランナー等）ではこの問題は発生しない想定。
#      ローカルWindowsで試す場合は気長に待つか、WSL2内のファイルシステム上で直接実行する
#      ことを推奨する。
#
#   ⚠️ Git Bash (MSYS): docker run の -v 引数のパスがMSYSのパス自動変換で壊れることがある
#      （例: /var/opentripplanner が C:\Program Files\Git\var\opentripplanner に誤変換される）。
#      本スクリプトは docker run コマンドにのみ MSYS_NO_PATHCONV=1 を付与して回避している
#      （curl 等の他コマンドまでこの変数を無効化すると、今度は curl 側のパス変換が壊れて
#        ダウンロードが失敗することを確認済みのため、グローバルには設定していない）。
#      改善しない場合はPowerShellから実行するか、コンテナ側パスを //var/opentripplanner の
#      ように二重スラッシュにすること。
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

OSM_REGION="${OSM_REGION:-kanto}"
OTP_BUILD_DIR="${OTP_BUILD_DIR:-${REPO_ROOT}/.otp-build}"
JAVA_XMX="${JAVA_XMX:-6g}"
OTP_DOCKER_IMAGE="${OTP_DOCKER_IMAGE:-opentripplanner/opentripplanner:latest}"
GTFS_URLS="${GTFS_URLS:-}"
GTFS_SOURCES_FILE="${GTFS_SOURCES_FILE:-${SCRIPT_DIR}/gtfs-sources.json}"
FORCE_DOWNLOAD="${FORCE_DOWNLOAD:-0}"

print_help() {
  sed -n '2,68p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
}

while [ $# -gt 0 ]; do
  case "$1" in
    --region)
      OSM_REGION="$2"
      shift 2
      ;;
    --build-dir)
      OTP_BUILD_DIR="$2"
      shift 2
      ;;
    --xmx)
      JAVA_XMX="$2"
      shift 2
      ;;
    --force)
      FORCE_DOWNLOAD=1
      shift
      ;;
    -h|--help)
      print_help
      exit 0
      ;;
    *)
      echo "unknown option: $1" >&2
      print_help
      exit 1
      ;;
  esac
done

log() {
  echo "[build-otp-graph] $*"
}

command -v curl >/dev/null 2>&1 || { echo "[build-otp-graph] エラー: curl が必要です" >&2; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "[build-otp-graph] エラー: docker が必要です" >&2; exit 1; }

mkdir -p "${OTP_BUILD_DIR}"

# ── OSM ダウンロード ─────────────────────────────────────────────────────
if [ "${OSM_REGION}" = "japan" ]; then
  OSM_URL="https://download.geofabrik.de/asia/japan-latest.osm.pbf"
else
  OSM_URL="https://download.geofabrik.de/asia/japan/${OSM_REGION}-latest.osm.pbf"
fi
OSM_FILE="${OTP_BUILD_DIR}/${OSM_REGION}-latest.osm.pbf"

if [ -f "${OSM_FILE}" ] && [ "${FORCE_DOWNLOAD}" != "1" ]; then
  log "OSMファイルは既に存在するためスキップ: ${OSM_FILE}"
else
  log "OSMダウンロード中 [region=${OSM_REGION}]: ${OSM_URL}"
  curl -fSL --retry 3 -o "${OSM_FILE}.tmp" "${OSM_URL}"
  mv "${OSM_FILE}.tmp" "${OSM_FILE}"
  log "OSMダウンロード完了: ${OSM_FILE} ($(du -h "${OSM_FILE}" 2>/dev/null | cut -f1))"
fi

# ── GTFS ダウンロード（0件でも可） ───────────────────────────────────────
GTFS_COUNT=0

download_gtfs() {
  # $1 = name（ファイル名用）, $2 = url
  local name="$1" url="$2"
  local dest="${OTP_BUILD_DIR}/gtfs-${name}.zip"
  if [ -f "${dest}" ] && [ "${FORCE_DOWNLOAD}" != "1" ]; then
    log "GTFSは既に存在するためスキップ [${name}]: ${dest}"
    GTFS_COUNT=$((GTFS_COUNT + 1))
    return
  fi
  log "GTFSダウンロード中 [${name}]: ${url}"
  if curl -fSL --retry 3 -o "${dest}.tmp" "${url}"; then
    mv "${dest}.tmp" "${dest}"
    GTFS_COUNT=$((GTFS_COUNT + 1))
  else
    log "警告: GTFSダウンロードに失敗したためスキップします: ${url}"
    rm -f "${dest}.tmp"
  fi
}

if [ -n "${GTFS_URLS}" ]; then
  IFS=',' read -ra _gtfs_url_list <<< "${GTFS_URLS}"
  i=0
  for url in "${_gtfs_url_list[@]}"; do
    url="$(echo "${url}" | xargs)" # trim whitespace
    [ -z "${url}" ] && continue
    i=$((i + 1))
    download_gtfs "env${i}" "${url}"
  done
fi

if [ -f "${GTFS_SOURCES_FILE}" ]; then
  if command -v jq >/dev/null 2>&1; then
    while IFS=$'\t' read -r name url; do
      [ -z "${url}" ] && continue
      download_gtfs "${name}" "${url}"
    done < <(jq -r '.sources[]? | [(.name // "source"), .url] | @tsv' "${GTFS_SOURCES_FILE}")
  else
    log "警告: jq が見つからないため ${GTFS_SOURCES_FILE} の読み込みをスキップします（GTFS_URLS 環境変数のみ使用）"
  fi
else
  log "GTFS設定ファイルなし（スキップ): ${GTFS_SOURCES_FILE}"
fi

log "GTFS取得件数: ${GTFS_COUNT}（0件でもOSMのみでグラフビルド可能）"

# ── OTP グラフビルド ─────────────────────────────────────────────────────
log "OTPグラフビルド開始（イメージ: ${OTP_DOCKER_IMAGE}, ヒープ: ${JAVA_XMX}, 作業ディレクトリ: ${OTP_BUILD_DIR}）"
log "※ Windows + Docker Desktop 環境ではバインドマウントへの書き込みが非常に遅い場合があります（スクリプト冒頭コメント参照）"

# MSYS_NO_PATHCONV=1 はこの docker 呼び出しのみに限定する（curl 等の他コマンドで
# 設定すると逆にパス解決が壊れるため、環境変数のグローバル export はしない）。
# Linux（GitHub Actionsランナー等）では MSYSTEM が未設定のため何もしない。
MSYS_NO_PATHCONV=1 docker run --rm \
  -e JAVA_TOOL_OPTIONS="-Xmx${JAVA_XMX}" \
  -v "${OTP_BUILD_DIR}:/var/opentripplanner" \
  "${OTP_DOCKER_IMAGE}" \
  --build --save

GRAPH_FILE="${OTP_BUILD_DIR}/graph.obj"
if [ -f "${GRAPH_FILE}" ]; then
  log "グラフビルド成功: ${GRAPH_FILE} ($(du -h "${GRAPH_FILE}" 2>/dev/null | cut -f1))"
  echo "${GRAPH_FILE}"
else
  echo "[build-otp-graph] エラー: グラフファイルが生成されませんでした: ${GRAPH_FILE}" >&2
  exit 1
fi
