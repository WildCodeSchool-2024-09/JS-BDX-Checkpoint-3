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
  try {
    const coords = {
      coordX: Number(req.body.coord_x),
      coordY: Number(req.body.coord_y),
    };

    if (
      coords.coordX >= 0 &&
      coords.coordX <= 11 &&
      coords.coordY >= 0 &&
      coords.coordY <= 5
    ) {
      return next();
    }

    res.sendStatus(422);
  } catch (error) {
    res.sendStatus(422);
  }
};

export default {
  browse,
  validate,
};
