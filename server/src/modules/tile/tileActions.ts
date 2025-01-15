import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;
  req.body.coord_x = Number(coord_x);
  req.body.coord_y = Number(coord_y);

  if (coord_x < 0 || coord_x > 11) {
    res.sendStatus(422);
    return;
  }

  if (coord_y < 0 || coord_y > 5) {
    res.sendStatus(422);
    return;
  }
  const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);

  if (tiles.length === 0) {
    res.sendStatus(422);
    return;
  }

  next();
};

export default {
  browse,
  validate,
};
