import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  [key: string]: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { pid } = req.query;
  res.status(200).json({ name: "wjl" });
}
