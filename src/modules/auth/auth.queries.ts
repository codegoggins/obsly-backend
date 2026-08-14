import { pool } from "@/db/pool.js";

export type UserRow = {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  country: string | null;
  email_verified_at: Date | null;
  mfa_enabled: boolean;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const { rows } = await pool.query<UserRow>(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  return rows[0] ?? null;
}

export async function insertUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  country?: string;
}): Promise<UserRow> {
  const { rows } = await pool.query<UserRow>(
    `INSERT INTO users (name, email, password_hash, country)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [input.name, input.email, input.passwordHash, input.country ?? null],
  );

  return rows[0]!;
}
