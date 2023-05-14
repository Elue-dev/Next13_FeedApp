import { tokenPayload } from "@/types/user.types";
import { prisma } from "../prisma/client";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const verifyAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = req?.cookies.auth;
  console.log(cookie);

  //   let token;
  //   let headers = req.headers.authorization;

  //   if (headers && headers.startsWith("Bearer")) {
  //     token = headers.split(" ")[1];
  //   } else if (req.cookies.accessToken) {
  //     token = req.cookies.accessToken;
  //   }

  //   if (!token)
  //     return res
  //       .status(401)
  //       .json("You are not logged in. Please login to get acces");

  //   try {
  //     const verifiedToken = jwt.verify(
  //       token,
  //       process.env.JWT_SECRET as string
  //     ) as tokenPayload;

  //     const currentUser = await prisma.user.findUnique({
  //       where: { id: verifiedToken.id },
  //     });

  //     //@ts-ignore
  //     req.user = currentUser;
  //   } catch (error) {
  //     return res.status(401).json("");
  //   }

  return NextResponse.next();
};
