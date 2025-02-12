"use client";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ChevronsLeft, Home, Plane, Ticket, Trash } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Thread } from "@/types/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUser, getThreads, getBookedTrips } from "@/queries/queries";
import Link from "next/link";
import { Badge } from "./ui/badge";

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);

  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUser });
  const { data: threads } = useQuery({
    queryKey: ["threads"],
    queryFn: () => getThreads(user?.id),
    enabled: !!user?.id,
  });
  const { data: bookedTrips } = useQuery({
    queryKey: ["bookedTrips"],
    queryFn: () => getBookedTrips(user?.id),
    enabled: !!user,
  });

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
          <Link href="/">
            <button className="flex items-center gap-2 text-sm px-4 py-2 w-full rounded-lg hover:bg-sidebar-accent transition duration-200 ease-linear text-primary/70 font-medium">
              <Home className="w-4 h-4" />
              Home
            </button>
          </Link>
          <Link href="/chat/booked">
            <button className="flex items-center gap-2 text-sm px-4 py-2 w-full rounded-lg hover:bg-sidebar-accent transition duration-200 ease-linear text-primary/70 font-medium">
              <Ticket className="w-4 h-4" />
              Booked Trips{" "}
              <Badge variant="secondary">
                <span className="text-xs text-primary/50">
                  {bookedTrips?.length > 0 ? bookedTrips.length : 0}
                </span>
              </Badge>
            </button>
          </Link>
          <div className="flex flex-col">
            <button className="flex items-center gap-2 text-sm px-4 py-2 w-full rounded-lg hover:bg-sidebar-accent transition duration-200 ease-linear text-primary/70 font-medium">
              <Plane className="w-4 h-4" />
              Trip Planning
            </button>
            <div className="w-full flex flex-col gap-1 pl-8">
              {threads &&
                threads.map((thread: Thread, index: number) => {
                  return (
                    <div key={index}>
                      <button
                        onClick={() => {
                          router.push(`/chat/${thread.id}`);
                        }}
                        className={`flex items-center justify-between px-2 w-full text-center text-xs py-1 hover:bg-sidebar-accent transition rounded-md ${
                          thread.id === pathname.split("/")[2]
                            ? "text-blue-500 font-semibold"
                            : "text-primary/70"
                        }`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <div className="flex items-center truncate">
                          <span className="truncate">{thread.location}</span>
                        </div>

                        {hoveredIndex === index && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.25 }}
                          >
                            <Trash
                              onClick={() => setConfirmDelete(true)}
                              className="w-3 h-3 text-red-500"
                            />
                          </motion.div>
                        )}
                      </button>
                      <Dialog open={confirmDelete}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Thread</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this thread?
                            </DialogDescription>
                          </DialogHeader>

                          <div className="flex justify-between gap-2">
                            <Button
                              className="flex-1"
                              variant="secondary"
                              onClick={() => setConfirmDelete(false)}
                            >
                              Cancel
                            </Button>
                            <Button className="flex-1" variant="destructive">
                              Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
