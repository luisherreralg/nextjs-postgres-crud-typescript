import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "src/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, resp: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM tasks";
        const response = await connection.query(text);
        return resp.status(200).json(response.rows);
      } catch (error: any) {
        return resp.status(400).json({ error: error.message });
      }

    case "POST":
      try {
        const { title, description } = body;
        const text =
          "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *";
        const values = [title, description];
        const response = await connection.query(text, values);
        return resp.status(200).json(response.rows[0]);
      } catch (error: any) {
        return resp.status(400).json({ error: error.message });
      }

    default:
      return resp.status(400).json("Invalid method");
  }
};
