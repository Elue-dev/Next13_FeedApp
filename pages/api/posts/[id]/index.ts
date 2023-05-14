import { prisma } from "../../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default function Posts(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      getPost(req, res);
      break;
    case "PUT":
      updatePost(req, res);
      break;
    case "DELETE":
      deletePost(req, res);
      break;
    default:
      res
        .status(400)
        .json({ err: `${req.method} requests not supported in this API` });
  }
}

async function getPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.query.id as string,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updatePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.query.id as string,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deletePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.query.id as string,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
}
