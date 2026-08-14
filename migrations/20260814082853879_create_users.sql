CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE users (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email             citext NOT NULL UNIQUE,
  password_hash     text NOT NULL,
  name              text NOT NULL,
  country           text,
  email_verified_at timestamptz,
  mfa_enabled       boolean NOT NULL DEFAULT false,
  last_login_at     timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
