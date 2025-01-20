"use client";
import { AppSidebar } from "@/components/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronsRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getUser, getThreads } from "@/queries/queries";
import { UserThreadsContext } from "@/components/user-threads-provider";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state, toggleSidebar } = useSidebar();

  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUser });

  const { data: threads } = useQuery({
    queryKey: ["threads"],
    queryFn: () => getThreads(user?.id),
    enabled: !!user?.id,
  });

  return (
    <UserThreadsContext.Provider value={{ user, threads }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex w-full h-screen"
      >
        <AppSidebar />
        {state === "collapsed" && (
          <AnimatePresence>
            <motion.div
              initial={{ x: "-200%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1, delay: 0.1 }}
              exit={{ x: "-200%" }}
              className="h-full border-r p-2"
            >
              <ChevronsRight
                onClick={toggleSidebar}
                className="text-sidebar-foreground hover:cursor-pointer hover:bg-sidebar-accent transition rounded-sm p-1"
              />
            </motion.div>
          </AnimatePresence>
        )}
        <div className="w-2/3 border-r">{children}</div>
      </motion.div>
    </UserThreadsContext.Provider>
  );
}
