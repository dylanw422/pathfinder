import axios from "axios";
import { supabase } from "@/lib/supabase-client";

export const getThreads = async (id: string | undefined) => {
  const res = await axios.post("/api/threads/get-threads", { id });

  return res.data;
};

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};

export const getUserDetails = async (id: string | undefined) => {
  return await axios.post("/api/auth/get-user", { id });
};
