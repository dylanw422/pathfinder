import axios from "axios";
import { supabase } from "@/lib/supabase-client";
import { Thread } from "@/db/queries";

export const getItenerary = async (data: any) => {
  const res = await axios.post("/api/itenerary", data);
  return res.data;
};

export const getThreads = async (id: string | undefined) => {
  const res = await axios.post("/api/threads/get-threads", { id });

  return res.data;
};

export const getThreadById = async (id: string) => {
  const res = await axios.post("/api/threads/get-thread-by-id", { id });

  return res.data[0];
};

export const insertThread = async (data: Thread) => {
  const res = await axios.post("/api/threads/new-thread", data);

  return res.data;
};

export const deleteThread = async (id: string | undefined) => {
  const res = await axios.post("/api/threads/delete-thread", { id });

  return res.data;
};

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};

export const getUserDetails = async (id: string | undefined) => {
  return await axios.post("/api/auth/get-user", { id });
};
