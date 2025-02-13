"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase-client";
import React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { getUser } from "@/queries/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function HomeNav() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    enabled: !!supabase.auth.getUser(),
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  };

  return (
    <div className="relative w-full">
      <div className="p-2 md:p-4 px-4 md:px-8 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold">
          <em>Pathfinder</em>
        </h1>
        <div
          id="menu"
          className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t border-t-white/20 shadow-md rounded-full bg-white/10 backdrop-blur-md px-8 flex items-center gap-x-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-16"
        >
          <Link
            href="#about"
            className="rounded-full text-xs py-3 text-white/50 hover:text-secondary transition"
          >
            About
          </Link>
          <Link
            href="#services"
            className="rounded-full text-xs py-3 text-white/50 hover:text-secondary transition"
          >
            Services
          </Link>
          <Link
            href="#how-it-works"
            className="rounded-full text-xs py-3 text-white/50 hover:text-secondary transition"
          >
            How It Works
          </Link>
          <Link
            href="#contact"
            className="rounded-full text-xs py-3 text-white/50 hover:text-secondary transition"
          >
            Contact
          </Link>
        </div>
        {user ? (
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="font-light flex items-center gap-2 py-2 px-4 hover:bg-white/10 hover:text-secondary transition"
              >
                Hello, {user?.user_metadata?.first_name}{" "}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    open ? "-rotate-180" : "rotate-0"
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/account");
                }}
                className="hover:cursor-pointer text-xs"
              >
                My Account{" "}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleSignOut();
                }}
                className="hover:cursor-pointer text-xs"
              >
                Sign Out
              </DropdownMenuItem>{" "}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div id="button" className="flex gap-2">
            <Link href="/login">
              <Button
                variant={"secondary"}
                className="rounded-full text-secondary bg-white/20 backdrop-blur px-8 text-xs hover:bg-white/30"
              >
                Log In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant={"secondary"}
                className="rounded-full px-6 text-xs hover:bg-white"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
