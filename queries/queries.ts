import axios from "axios";
import { supabase } from "@/lib/supabase-client";
import { NewThread, TripDetails } from "@/types/types";

export const getThreads = async (id: string | undefined) => {
  const res = await axios.post("/api/threads/get-threads", { id });

  return res.data;
};

export const getThreadById = async (id: string) => {
  const res = await axios.post("/api/threads/get-thread-by-id", { id });

  return res.data[0];
};

export const insertThread = async (data: NewThread) => {
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

export const updateSurveyAnswers = async (
  threadId: string,
  answers: Record<string, string>
) => {
  const res = await axios.post("/api/threads/update-answers", {
    threadId,
    answers,
  });

  return res.data;
};

export const updateProcess = async (threadId: string, process: string) => {
  const res = await axios.post("/api/threads/update-process", {
    threadId,
    process,
  });

  return res.data;
};

export const updateReview = async (
  threadId: string,
  object: TripDetails | undefined
) => {
  const res = await axios.post("/api/threads/update-review", {
    threadId,
    object,
  });

  return res.data;
};

export const getHotel = async (
  threadId: string,
  method: string,
  object: TripDetails | undefined
) => {
  const res = await axios.post("/api/hotel", {
    threadId,
    method,
    object,
  });
  return res.data;
};
