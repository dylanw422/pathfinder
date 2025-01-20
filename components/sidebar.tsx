"use client";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ChevronsLeft, HashIcon, Home, Plane, Ticket } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUserThreads } from "./user-threads-provider";

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const { threads } = useUserThreads();

  return (
    <Sidebar>
      <SidebarContent className="p-2 z-50 text-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            <em>Pathfinder</em>
          </h1>
          <ChevronsLeft
            onClick={toggleSidebar}
            className="text-sidebar-foreground hover:cursor-pointer hover:bg-sidebar-accent transition rounded-sm p-1"
          />
        </div>
        <div id="main-menu" className="mt-2">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm px-4 py-2 w-full rounded-lg hover:bg-sidebar-accent transition duration-200 ease-linear text-primary/70 font-medium"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <div className="flex flex-col">
            <button className="flex items-center gap-2 text-sm px-4 py-2 w-full rounded-lg hover:bg-sidebar-accent transition duration-200 ease-linear text-primary/70 font-medium">
              <Plane className="w-4 h-4" />
              Trip Planning
            </button>
            <div className="w-full flex flex-col gap-1 pl-8">
              {threads &&
                threads.map((thread: any) => {
                  return (
                    <button
                      key={thread.id}
                      className="flex items-center gap-2 px-2 w-full text-center text-xs py-1 hover:bg-sidebar-accent transition rounded-md text-primary/70"
                    >
                      <HashIcon className="w-3 h-3" />
                      {thread.location}
                    </button>
                  );
                })}
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm px-4 py-2 w-full rounded-lg hover:bg-sidebar-accent transition duration-200 ease-linear text-primary/70 font-medium">
            <Ticket className="w-4 h-4" />
            Booked Trips
          </button>
          <div id="progress" className="">
            <h1 className="text-xs font-semibold my-2">Progress</h1>
            <motion.h1
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "0%" }}
              transition={{ ease: "easeInOut", delay: 0.5, duration: 1 }}
              className="px-4 flex items-center text-primary font-semibold gap-2"
            >
              <span>📍</span>
              <span className="text-blue-500">Itenerary</span>
            </motion.h1>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
