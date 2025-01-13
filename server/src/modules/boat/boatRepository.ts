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
      "select * from boat order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    try {
      const [boatResult] = await databaseClient.query<Result>(
        `
            UPDATE boat
            SET name = ?, coord_x = ?, coord_y = ?
            WHERE id = ?
            `,
        [
          boatToUpdate.name,
          boatToUpdate.coord_x,
          boatToUpdate.coord_y,
          boatToUpdate.id,
        ],
      );
      return boatResult.affectedRows;
    } catch (error) {
      throw new Error("Bateau non mis à jour");
    }
  }
}

export default new BoatRepository();
