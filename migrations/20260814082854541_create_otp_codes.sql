CREATE TABLE otp_codes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose     text NOT NULL CHECK (purpose IN ('verify', 'mfa', 'reset')),
  code_hash   text NOT NULL,
  expires_at  timestamptz NOT NULL,
  attempts    integer NOT NULL DEFAULT 0,
  consumed_at timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX otp_codes_user_purpose_idx ON otp_codes (user_id, purpose);

ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;
