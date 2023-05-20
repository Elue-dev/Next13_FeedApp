import { token } from "@/utils/variables";
import axios from "axios";

export async function getPosts() {
  const res = await axios.get(`http://localhost:3000/api/posts`, {
    headers: {
      authorization: `Bearer ${JSON.stringify(localStorage.getItem("token"))}`,
    },
  });
  return res.data;
}
