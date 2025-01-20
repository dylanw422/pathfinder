import { createContext, useContext } from "react";

interface UserThreadsContextType {
  user: any;
  threads: any;
}

export const UserThreadsContext = createContext<
  UserThreadsContextType | undefined
>(undefined);

export function useUserThreads() {
  const context = useContext(UserThreadsContext);
  if (!context) {
    throw new Error("useUserThreads must be used within a UserThreadsProvider");
  }
  return context;
}
