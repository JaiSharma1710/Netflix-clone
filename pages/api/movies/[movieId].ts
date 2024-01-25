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
    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("invalid Id");
    }

    if (!movieId) {
      throw new Error("No movie id");
    }

    const movie = await prismadb.movie.findUnique({ where: { id: movieId } });

    if (!movie) {
      throw new Error("no movie found");
    }

    return res.status(200).json({ status: "success", data: movie });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", message: "something went wrong" });
  }
}
