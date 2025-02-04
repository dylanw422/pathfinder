"use client";
import { AppSidebar } from "@/components/sidebar";
import { motion } from "framer-motion";
import Script from "next/script";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex w-full h-[100dvh] overflow-hidden"
    >
      <Script
        id="custom-script"
        src="https://mn-tz.com/Mzg2Mjkz.js?t=386293"
        strategy="lazyOnload"
        data-noptimize="1"
        data-cfasync="false"
        data-wpfc-render="false"
      />
      <AppSidebar />
      <div className="md:w-2/3 w-full border-r">{children}</div>
    </motion.div>
  );
}
