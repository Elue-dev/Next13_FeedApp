import { prisma } from "../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { hashSync } from "bcryptjs";
import { UserPayload } from "@/types/user.types";

export default function Posts(req: NextApiRequest, res: NextApiResponse) {
  req.method === "POST"
    ? signup(req, res)
    : res
        .status(400)
        .json(`${req.method} requests not supported for this route`);

  async function signup(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, password }: UserPayload = req.body;
    if (!name || !email || !password) {
      return res.status(400).json("name, email and password are all rerquired");
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return res.status(400).json("Email already in use");
    }

    const passwordHash = hashSync(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });
      res.status(200).json("Registration successful");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
