import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "src/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, resp: NextApiResponse) => {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM tasks WHERE id = $1";
        const values = [query.id];
        const response = await connection.query(text, values);

        if (response.rows.length === 0)
          return resp.status(404).json({ message: "Task not found" });

        return resp.status(200).json(response.rows[0]);
      } catch (error: any) {
        return resp.status(500).json({ error: error.message });
      }

    case "PATCH":
      try {
        const { title, description } = body;
        const text =
          "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
        const values = [title, description, query.id];
        const response = await connection.query(text, values);

        if (response.rows.length === 0)
          return resp.status(404).json({ message: "Task not found" });

        return resp.status(200).json(response.rows[0]);
      } catch (error: any) {
        return resp.status(500).json({ error: error.message });
      }

    case "DELETE":
      try {
        const text = "DELETE FROM tasks WHERE id = $1 RETURNING *";
        const values = [query.id];
        const response = await connection.query(text, values);

        if (response.rowCount === 0)
          return resp.status(404).json({ message: "Task not found" });

        return resp.status(200).json(response.rows[0]);
      } catch (error: any) {
        return resp.status(500).json({ error: error.message });
      }

    default:
      return resp.status(400).json("invalid method");
  }
};
