import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

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
    await serverAuth(req, res);
    const movies = await prismadb.movie.findMany();
    return res.status(200).json({ status: "success", data: movies });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", message: "something went wrong" });
  }
}
