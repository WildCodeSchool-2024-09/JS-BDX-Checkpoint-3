import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const admins = await tileRepository.readAll();
    res.json(admins);
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
};
