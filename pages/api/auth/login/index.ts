import { prisma } from "../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserPayload } from "@/types/user.types";

export default function Posts(req: NextApiRequest, res: NextApiResponse) {
  req.method === "POST"
    ? login(req, res)
    : res
        .status(400)
        .json(`${req.method} requests not supported for this route`);

  async function login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password }: UserPayload = req.body;
    if (!email || !password) {
      return res.status(400).json("email and password are rerquired");
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) return res.status(400).json("Invalid credentials provided");

      const isPasswordCorrect = compareSync(req.body.password, user.password);
      if (!isPasswordCorrect)
        return res.status(400).json("Invalid credentials provided");

      const token = generateToken(user.id);
      const { password, ...credentials } = user;
      res.status(200).json({ user: credentials, token });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
