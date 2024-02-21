// const HOST = "http://localhost:3001";
const HOST = "https://questionnaire-mock-two.vercel.app";
import axios from "axios";
export async function get(url: string) {
  const res = await fetch(`${HOST}${url}`);
  const data = await res.json();
  return data;
}

export async function post(url: string, body: any) {
  const res = await fetch(`${HOST}${url}`, {
    method: "post",
    body: JSON.stringify(body),
  });
  const data =await res.json();
  return data;
}
