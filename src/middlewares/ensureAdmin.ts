import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { VolunteersRepository } from "../repositories/VolunteersRepository";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { volunteer_id } = req;

  const volunteersRepository = getCustomRepository(VolunteersRepository);

  const { admin } = await volunteersRepository.findOne(volunteer_id);

  if (admin) {
    return next();
  }

  return res.status(401).json({
    error: "Unauthorized",
  });
}
