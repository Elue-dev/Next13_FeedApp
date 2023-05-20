"use client";

import { Post } from "@/types/post.types";
import { BASE_URL } from "@/utils/variables";
import moment from "moment";

interface ParamsProps {
  params: {
    postId: string;
  };
}

async function getPost(postId: string) {
  const res = await fetch(`${BASE_URL}/api/posts/${postId}`);
  return res.json();
}

export default async function PostDetails({ params: { postId } }: ParamsProps) {
  const post: Post = await getPost(postId);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="tex-3xl font-bold">{post?.title}</h1>
      <p className="text-slate-900">{post?.content}</p>
      <p className="text-slate-500">Added by: {post?.author.name}</p>
      <span className="text-slate-500">
        {moment(post.created_at).fromNow()}
      </span>
    </div>
  );
}
