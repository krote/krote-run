import Database from 'better-sqlite3';
import { getTableColumns, getTableName, type Table } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';

/**
 * テスト用のインメモリD1スタブ。
 *
 * better-sqlite3 を D1Database インターフェースでラップし、実際にSQLを実行しつつ
 * 発行されたクエリを記録する。rows_read 削減の回帰テスト（全件スキャンしていないこと・
 * 不要な ORDER BY を出していないこと）は、この記録に対するアサーションで行う。
 */

export type RecordedQuery = { sql: string; params: unknown[] };

/** drizzleスキーマ定義から CREATE TABLE を生成する（PK・FK・インデックスはテストに不要なため省略） */
function createTableSql(table: Table): string {
  const columns = Object.values(getTableColumns(table));
  const defs = columns.map((c) => `"${c.name}" ${c.getSQLType()}`);
  return `CREATE TABLE "${getTableName(table)}" (${defs.join(', ')})`;
}

export type FakeD1 = {
  /** data.ts に渡す drizzle インスタンス */
  db: ReturnType<typeof drizzle<typeof schema>>;
  /** 発行されたSQLの記録（新しい順ではなく発行順） */
  queries: RecordedQuery[];
  /** 記録をクリアする */
  reset(): void;
  /** 指定テーブルに行を投入する */
  insert(table: Table, rows: Record<string, unknown>[]): void;
  /** テーブル名を含むクエリだけを抜き出す */
  queriesFor(tableName: string): RecordedQuery[];
};

export function createFakeD1(): FakeD1 {
  const sqlite = new Database(':memory:');
  const queries: RecordedQuery[] = [];

  for (const value of Object.values(schema)) {
    if (isDrizzleTable(value)) sqlite.exec(createTableSql(value));
  }

  function makeStatement(sql: string, params: unknown[]) {
    const statement = {
      bind: (...bound: unknown[]) => makeStatement(sql, bound),
      all: async () => {
        queries.push({ sql, params });
        const prepared = sqlite.prepare(sql);
        const results = prepared.reader ? prepared.all(...(params as never[])) : (prepared.run(...(params as never[])), []);
        return { results, success: true, meta: {} };
      },
      run: async () => {
        queries.push({ sql, params });
        sqlite.prepare(sql).run(...(params as never[]));
        return { results: [], success: true, meta: {} };
      },
      raw: async () => {
        queries.push({ sql, params });
        return sqlite.prepare(sql).raw().all(...(params as never[]));
      },
    };
    return statement;
  }

  const client = {
    prepare: (sql: string) => makeStatement(sql, []),
    batch: async (statements: { all: () => Promise<unknown> }[]) => Promise.all(statements.map((s) => s.all())),
  };

  return {
    db: drizzle(client as never, { schema }),
    queries,
    reset: () => queries.splice(0, queries.length),
    insert(table, rows) {
      if (rows.length === 0) return;
      const columns = Object.values(getTableColumns(table)).map((c) => c.name);
      const name = getTableName(table);
      const stmt = sqlite.prepare(
        `INSERT INTO "${name}" (${columns.map((c) => `"${c}"`).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
      );
      for (const row of rows) {
        stmt.run(...columns.map((c) => (row[c] === undefined ? null : (row[c] as never))));
      }
    },
    queriesFor(tableName) {
      return queries.filter((q) => q.sql.includes(`"${tableName}"`));
    },
  };
}

function isDrizzleTable(value: unknown): value is Table {
  if (typeof value !== 'object' || value === null) return false;
  return Object.getOwnPropertySymbols(value).some((s) => s.description === 'drizzle:Name');
}
