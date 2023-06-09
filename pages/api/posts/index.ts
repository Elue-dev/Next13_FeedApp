import { prisma } from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default function Posts(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      getPosts(req, res);
      break;
    case "POST":
      addPost(req, res);
      break;
    default:
      res
        .status(400)
        .json(`${req.method} requests not supported for this route`);
  }

  async function getPosts(req: NextApiRequest, res: NextApiResponse) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async function addPost(req: NextApiRequest, res: NextApiResponse) {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({
        status: "fail",
        message: "title, content and authorId are all required",
      });
    }

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId,
        },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
