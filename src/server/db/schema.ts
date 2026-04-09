// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { int, text, singlestoreTableCreator } from "drizzle-orm/singlestore"


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = singlestoreTableCreator((name) => `file-share_${name}`);

// export const posts = createTable(
//   "post",
//   (d) => ({
//     id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
//     name: d.text({ length: 256 }),
//     createdAt: d
//       .integer({ mode: "timestamp" })
//       .default(sql`(unixepoch())`)
//       .notNull(),
//     updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
//   }),
//   (t) => [index("name_idx").on(t.name)],
// );



// export const users = singlestoreTable("users_table", {
//   id: int("id").primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age"),
// });

export const files = singlestoreTableCreator("files_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  url: text("url"),
  parent: int("parent"),
  size: text("size"),
}, (t) => {
  return [
    index("parent_index").on(t.parent)
  ];

});

export const folders = singlestoreTableCreator("folders_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  parent: int("parent"),
}, (t) => {
  return [
    index("parent_index").on(t.parent)
  ];
});


