import { NextApiRequest, NextApiResponse } from "next";
import { connection } from "src/utils/database";

/**
 * Para ver que todo funcina, en vez de crear un archivo hello world, se crea el archivo ping
 * Si la conexión funciona correctamente te devuelve un 'pong'
 * Es una tontería, pero es curioso 😅
 */

type Data = {
  message: string;
  time: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, resp: NextApiResponse<Data>) => {
  const response = await connection.query("SELECT NOW()");

  return resp.json({
    message: "pong",
    time: response.rows[0].now,
  });
};
