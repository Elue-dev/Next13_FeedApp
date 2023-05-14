"use client";

import { BASE_URL } from "@/utils/variables";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPayload } from "@/types/user.types";
import { setCookie } from "cookies-next";

const initialState: UserPayload = {
  name: "",
  email: "",
  password: "",
};

export default function Auth() {
  const [credentials, setCredentials] = useState(initialState);
  const [authState, setAuthState] = useState("login");
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
  const { name, email, password } = credentials;
  const router = useRouter();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }

  function handleAuthState() {
    authState === "login" ? setAuthState("signup") : setAuthState("login");
  }

  async function loginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      return setError("email and password are required");
    }

    setLoading(true);
    setError(false);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      setCookie("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(res.data));
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setError(error.response.data);
    }
  }

  async function signupUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !email || !password) {
      return setError("title and content are required");
    }

    setLoading(true);
    setError(false);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });
      alert(res.data);
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data);
    }
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h3 className="font-semibold text-3xl text-center">
        {authState === "login" ? "Login" : "Sign Up"}
      </h3>
      <form onSubmit={authState === "login" ? loginUser : signupUser}>
        {authState === "signup" && (
          <input
            type="text"
            value={name}
            name="name"
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="block my-2 border border-solid border-gray-300 rounded p-2 focus:border-gray-500 focus:border-2 outline-none transition duration-75"
          />
        )}
        <input
          type="email"
          value={email}
          name="email"
          onChange={handleInputChange}
          placeholder="Enter you email"
          className=" block my-2 border border-solid border-gray-300 rounded p-2 focus:border-gray-500 focus:border-2 outline-none transition duration-75"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleInputChange}
          placeholder="Enter you password"
          className=" block my-2 border border-solid border-gray-300 rounded p-2 focus:border-gray-500 focus:border-2 outline-none transition duration-75"
        />
        {error && <p className="text-red-500 max-w-full">{error}</p>}
        <button
          type="submit"
          className="bg-blue-950 text-white p-2 rounded w-full font-semibold hover:bg-blue-900 transition duration-75"
        >
          {loading ? "Processing..." : "Proceed"}
        </button>
        <p
          onClick={handleAuthState}
          className="cursor-pointer underline text-center mt-2"
        >
          {authState === "login" ? "Sign up instead" : "Login instead"}
        </p>
      </form>
    </div>
  );
}
