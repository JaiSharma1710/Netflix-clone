import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "invalid methord" });
  }
  try {
    const { email, name, password } = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: "failed", message: "email already regestered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email: email,
        name: name,
        hashedPassword: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(201).json({ status: "success", data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", message: "something went wrong" });
  }
}
