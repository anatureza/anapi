import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UserType } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

export async function ensureAtLeastVolunteer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req;

  const usersRepository = getCustomRepository(UsersRepository);

  const { type } = await usersRepository.findOne(user_id);

  if (type === UserType.VOLUNTEER || type === UserType.ADMIN) {
    return next();
  }

  return res.status(401).json({
    error: "Unauthorized",
  });
}
