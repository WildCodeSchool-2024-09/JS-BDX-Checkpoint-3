import express from "express";
import tileActions from "./modules/tile/tileActions";

const router = express.Router();

/* ************************************************************************* */
router.get("/api/tiles", tileActions.browse);
/* ************************************************************************* */

import boatActions from "./modules/boat/boatActions";

router.get("/api/boats", boatActions.browse);
router.put("/api/boats/:id", boatActions.edit);

import gameActions from "./modules/game/gameActions";


router.post("/api/games", gameActions.add);

/* ************************************************************************* */

export default router;
