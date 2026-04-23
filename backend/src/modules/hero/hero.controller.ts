import { Request, Response } from 'express';
import Hero from './hero.model';
import asyncHandler from '../../utils/asyncHandler';
import AppError from '../../utils/AppError';

export const getHero = asyncHandler(async (req: Request, res: Response) => {
  const hero = await Hero.findOne();
  res.status(200).json({ success: true, data: hero });
});

export const updateHero = asyncHandler(async (req: Request, res: Response) => {
  let hero = await Hero.findOne();
  if (hero) {
    hero = await Hero.findByIdAndUpdate(hero._id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    hero = await Hero.create(req.body);
  }
  res.status(200).json({ success: true, data: hero });
});
