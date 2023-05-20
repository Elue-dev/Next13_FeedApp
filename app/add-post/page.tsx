"use client";

import { postDetails } from "@/types/post.types";
import { token } from "@/utils/variables";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.types";

const initialState: postDetails = {
  title: "",
  content: "",
};

export default function PostForm() {
  const [details, setDetails] = useState(initialState);
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
  const { title, content } = details;
  const router = useRouter();

  let currentUser: User;
  if (typeof window !== "undefined" && window.localStorage) {
    const item = localStorage.getItem("user");
    currentUser = item ? JSON.parse(item).user : null;
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  }

  async function addPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !content) {
      return setError("title and content are required");
    }

    setLoading(true);

    try {
      const call = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content, authorId: currentUser.id }),
        }
      );

      const response = await call.json();

      if (response) {
        setLoading(false);
        router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h3 className="font-semibold text-3xl">Add a post</h3>
      <form onSubmit={addPost}>
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleInputChange}
          placeholder="Enter Post Title"
          className="block my-2 border border-solid border-gray-300 rounded p-2 focus:border-gray-500 focus:border-2 outline-none transition duration-75"
        />
        <textarea
          value={content}
          name="content"
          onChange={handleInputChange}
          placeholder="Enter Post Content"
          className=" block my-2 border border-solid border-gray-300 rounded p-2 focus:border-gray-500 focus:border-2 outline-none transition duration-75"
        ></textarea>
        {error && <p className="text-red-500 max-w-full">{error}</p>}
        <button
          type="submit"
          className="bg-blue-950 text-white p-2 rounded w-full font-semibold hover:bg-blue-900 transition duration-75"
        >
          {loading ? "Adding post..." : "Proceed"}
        </button>
      </form>
    </div>
  );
}
