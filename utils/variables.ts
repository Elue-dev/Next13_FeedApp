"use client";

export const BASE_URL = "http://localhost:3000";

let token: string | null;
if (typeof window !== "undefined" && window.localStorage) {
  const item = localStorage.getItem("user");
  token = item ? JSON.parse(item).token : null;
}
export { token };
