import { Thread } from "@/db/queries";
import { create } from "zustand";

interface ThreadStore {
  threads: Thread[];
  setThreads: (threads: Thread[]) => void;
}

export const useThreadStore = create<ThreadStore>((set) => ({
  threads: [],
  setThreads: (threads) => set({ threads }),
}));
