import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Fetch all tiles from the database
    const tiles = await tileRepository.readAll();

    // Respond with the tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const coordX = Number(req.params.coord_x);
    const coordY = Number(req.params.coord_y);

    if (coordX == null && coordY === null) {
      res.sendStatus(404);
    } else {
      res.json(coordX && coordY);
    }
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  type ValidationError = {
    coordX: number;
    coordY: number;
    message: string;
  };

  const errors: ValidationError[] = [];
  const { coord_x, coord_y } = req.body;

  if (coord_x === null && coord_y === null) {
    errors.push({
      coordX: coord_x,
      coordY: coord_y,
      message: "Coord_x and coord_y are required",
    });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

export default {
  browse,
  validate,
  read,
};
