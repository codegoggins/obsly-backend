CREATE TABLE sessions (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token_hash text NOT NULL,
  family_id          uuid NOT NULL,
  user_agent         text,
  ip                 inet,
  last_active_at     timestamptz NOT NULL DEFAULT now(),
  expires_at         timestamptz NOT NULL,
  revoked_at         timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX sessions_refresh_token_hash_idx ON sessions (refresh_token_hash);
CREATE INDEX sessions_user_id_idx ON sessions (user_id);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
