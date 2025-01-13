import { tr } from "@faker-js/faker/.";
import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { coord_x, coord_y } = req.body;
    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);
    if (coord_x >= 0 && coord_x <= 11 && coord_y >= 0 && coord_y <= 5) {
      next();
    } else {
      res.sendStatus(422);
    }
    res.json(tile);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
