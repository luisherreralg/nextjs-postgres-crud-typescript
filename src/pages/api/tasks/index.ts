import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, resp: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      return resp.status(200).json("GET");

    case "POST":
      return resp.status(200).json("POST");

    default:
      return resp.status(400).json("Invalid method");
  }
};
