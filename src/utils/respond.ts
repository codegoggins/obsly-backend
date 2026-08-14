import type { Response } from "express";

export function sendOk<T>(res: Response, data: T): void {
  res.status(200).json({ data });
}

export function sendCreated<T>(res: Response, data: T): void {
  res.status(201).json({ data });
}

export function sendNoContent(res: Response): void {
  res.status(204).end();
}

export function sendList<T>(
  res: Response,
  data: T[],
  nextCursor: string | null = null,
): void {
  res.status(200).json({ data, nextCursor });
}
