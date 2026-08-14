import { ConflictError } from "@/utils/errors.js";
import { hashPassword } from "@/utils/password.js";
import { findUserByEmail, insertUser } from "./auth.queries.js";
import type { RegisterInput } from "./auth.schema.js";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
};

export async function register(input: RegisterInput): Promise<PublicUser> {
  const existing = await findUserByEmail(input.email);

  if (existing) {
    throw new ConflictError("An account with this email already exists");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await insertUser({
    name: input.name,
    email: input.email,
    passwordHash,
    country: input.country,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.email_verified_at !== null,
  };
}
