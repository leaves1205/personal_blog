CREATE TABLE IF NOT EXISTS posts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  content     TEXT NOT NULL,
  tags        TEXT DEFAULT '[]',
  author_id   INTEGER NOT NULL,
  author_name TEXT NOT NULL,
  status      TEXT DEFAULT 'pending',
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
