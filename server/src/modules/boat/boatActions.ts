import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  const boatId = Number(req.params.id);

  try {
    const boat = {
      name: req.body.name,
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
      id: boatId,
    };

    const updateBoat = await boatRepository.update(boat);

    if (!updateBoat) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  edit,
};
