import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, resp: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      return resp.status(200).json("Getting a unique task");

    case "PATCH":
      return resp.status(200).json("updating a unique task");

    case "DELETE":
      return resp.status(200).json("deleting a unique task");

    default:
      return resp.status(400).json("invalid method");
  }
};
