"use client";

let token: string | null;
if (typeof window !== "undefined" && window.localStorage) {
  const item = localStorage.getItem("user");
  token = item ? JSON.parse(item).token : null;
}
export { token };
