"use client";

import Link from "next/link";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-center">
      {/* @ts-ignore */}
      {error.response.data || error.message || "SOMETHING WENT WRONG"}
      <div className="flex justify-center items-center gap-5 pt-3">
        <button
          onClick={reset}
          className="bg-sky-500 border-4 border-white text-white p-2 rounded-lg text-base"
        >
          Try Again
        </button>

        <Link href="/auth">
          <button
            onClick={reset}
            className="bg-white border-2 border-sky-500 text-sky-500 p-2 rounded-lg text-base"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
