import { singlestoreTableCreator, int, text, index } from "drizzle-orm/singlestore";

export const createTable = singlestoreTableCreator((name) => `file-share_${name}`);

// Folders table
export const folders = singlestoreTableCreator(
  "folders_table",
  {
    id: int("id").primaryKey().autoincrement(),
    name: text("name"),
    parent: int("parent").default(0),
  },
  (t) => [index("parent_index").on(t.parent)]
);

// Files table
export const files = singlestoreTableCreator(
  "files_table",
  {
    id: int("id").primaryKey().autoincrement(),
    name: text("name"),
    url: text("url"),
    parent: int("parent"),
    size: text("size"),
  },
  (t) => [index("parent_index").on(t.parent)]
);