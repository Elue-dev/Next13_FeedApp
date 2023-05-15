"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RightNav() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  let currentUser;
  if (typeof window !== "undefined" && window.localStorage) {
    const item = localStorage.getItem("user");
    currentUser = item ? JSON.parse(item) : null;
  }

  function handleLogout() {
    localStorage.setItem("user", "");
    router.push("/auth");
  }

  return (
    mounted && (
      <>
        {!currentUser ? (
          <Link
            href="/auth"
            className="mx-2 bg-white border-blue-950 border-solid border-2 text-blue-950 p-2 rounded font-semibold hover:text-slate-700	 transition duration-75"
          >
            Login
          </Link>
        ) : null}

        {currentUser && (
          <>
            <button
              onClick={handleLogout}
              className="mx-2 bg-white border-blue-950 border-solid border-2 text-blue-950 p-2 rounded font-semibold hover:text-slate-700	 transition duration-75"
            >
              Sign Out
            </button>
            <span> Hi, {currentUser.user.name}</span>
          </>
        )}
      </>
    )
  );
}
