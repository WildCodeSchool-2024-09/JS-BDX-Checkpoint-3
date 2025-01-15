import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT boat.id, boat.coord_x, boat.coord_y, boat.name, tile. type, tile.has_treasure
       FROM boat 
       INNER JOIN tile ON boat.coord_x = tile.coord_x
       AND boat.coord_y = tile.coord_y
       ORDER BY coord_y, coord_x`,
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    try {
      const query = `
        UPDATE boat
        SET name = ?, coord_x = ?, coord_y = ?
        WHERE id = ?
      `;
      const params = [
        boatToUpdate.name,
        boatToUpdate.coord_x,
        boatToUpdate.coord_y,
        boatToUpdate.id,
      ];

      const [boatResult] = await databaseClient.query<Result>(query, params);

      return boatResult.affectedRows;
    } catch (error) {
      console.error("SQL Error:", error);
      throw error;
    }
  }
}

export default new BoatRepository();
