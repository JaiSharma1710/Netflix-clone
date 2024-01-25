import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ status: "failed", message: "invalid methord" });
  }

  try {
    const { currentUser } = await serverAuth(req,res);
    return res.status(200).json({ status: "success", currentUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", message: "something went wrong" });
  }
}
