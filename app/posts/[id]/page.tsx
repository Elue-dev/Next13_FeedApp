"use client";

import { Post } from "@/types/post.types";
import { BASE_URL } from "@/utils/variables";
import axios from "axios";
import moment from "moment";

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function getPost(postId: number) {
  const res = await axios.get(`${BASE_URL}/api/posts/${postId}`);
  return res.data;
}

export default async function PostDetails({ params: { id } }: ParamsProps) {
  const postId = parseInt(id);
  const post: Post = await getPost(postId);
  console.log(post);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="tex-3xl font-bold">{post.title}</h1>
      <p className="text-slate-900">{post.content}</p>
      <p className="text-slate-500">Added by: {post.author.name}</p>
      <span className="text-slate-500">
        {moment(post.created_at).fromNow()}
      </span>
    </div>
  );
}
