# デプロイ用ディレクトリを準備
$src = 'C:\Dev\krote-run\.open-next'
$dist = 'C:\Dev\krote-run\.open-next\dist'

# distを再作成
if (Test-Path $dist) { Remove-Item $dist -Recurse -Force }
New-Item -ItemType Directory -Path $dist | Out-Null

# 1) 静的アセット (assets/*) をルートへコピー
Copy-Item "$src\assets\*" $dist -Recurse -Force

# 2) worker.js を _worker.js としてルートへコピー
Copy-Item "$src\worker.js" "$dist\_worker.js" -Force

# 3) ワーカーが参照する外部ディレクトリをコピー
$dirs = @('cloudflare', 'middleware', 'server-functions', '.build')
foreach ($dir in $dirs) {
    if (Test-Path "$src\$dir") {
        Copy-Item "$src\$dir" "$dist\$dir" -Recurse -Force
    }
}

# 4) _routes.json を生成: 静的アセットはワーカーを通さない
$routesJson = '{"version":1,"include":["/*"],"exclude":["/_next/static/*","/favicon.ico","/*.svg","/*.ico","/*.png","/*.jpg","/*.webp"]}'
Set-Content "$dist\_routes.json" $routesJson -Encoding UTF8

Write-Host "dist contents:"
Get-ChildItem $dist | Select-Object Name
Write-Host "Done"
