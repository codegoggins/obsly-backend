import type { RequestHandler } from "express";
import { sendCreated } from "@/utils/respond.js";
import { register as registerUser } from "./auth.service.js";

export const register: RequestHandler = async (req, res) => {
  const user = await registerUser(req.body);

  sendCreated(res, user);
};
