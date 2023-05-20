import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../prisma/client";
import { compareSync } from "bcryptjs";

export default NextAuth({
  session: {
    straregy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log({ emailserver: email, password });
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error("invalid email");
        }
        const isPasswordCorrect = compareSync(password, user.password);
        console.log({ isPasswordCorrect });
        if (!isPasswordCorrect) {
          throw new Error("invalid password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
