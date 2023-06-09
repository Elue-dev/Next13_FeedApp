"use client";

import RightNav from "@/components/RightNav";
import { AuthRequiredError } from "@/lib/exceptions";
import { Post } from "@/types/post.types";
import { token } from "@/utils/variables";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export default async function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  const session = useSession();
  console.log(session);
  if (session.status === "loading") return "Loading...";
  if (!session) {
    router.push("/auth");
  }

  useEffect(() => {
    setTimeout(() => {
      if (!session) router.push("/auth");
    }, 3000);
  }, []);

  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  // const posts: Post[] = await getPosts();
  // if (!posts) throw new AuthRequiredError();

  return (
    <main className="container m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mt-4 mb-3 font-bold">Feed</h1>
        <div>
          <Link
            href="/add-post"
            className="bg-blue-950 text-white p-2 rounded border-blue-900  font-semibold hover:bg-blue-900 transition duration-75"
          >
            Add Post
          </Link>
          {/* @ts-ignore */}
          <RightNav />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {posts?.length === 0 && <p>No posts yet.</p>}
        {posts?.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="font-semibold text-2xl">{post.title}</h2>
            <p className="text-gray-700 my-2 leading-relaxed mb-4">
              {post.content.slice(0, 40)}...
            </p>

            <p className="mb-4 text-gray-500">• {post.author.name}</p>
            <Link
              href={`/posts/${post.id}`}
              className="bg-blue-950 text-white p-2 rounded font-semibold hover:bg-blue-900 transition duration-75"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
