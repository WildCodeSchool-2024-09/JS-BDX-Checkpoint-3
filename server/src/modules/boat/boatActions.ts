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
  // your code here
  try {
    // const id = +req.params.id;
    const id = Number(req.params.id);
    const { coord_x, coord_y } = req.body;

    const updatedBoat = {
      coord_x,
      coord_y,
      id,
    };

    const result = await boatRepository.update(updatedBoat);

    if (result) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  edit,
};
