-- 给 users 表加 role 字段
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';

-- 创建评论表
CREATE TABLE IF NOT EXISTS comments (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  post_slug   TEXT    NOT NULL,
  user_id     INTEGER NOT NULL,
  username    TEXT    NOT NULL,
  content     TEXT    NOT NULL,
  created_at  TEXT    DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
