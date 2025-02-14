"use client";

import { JSX } from "react";
import Link from "next/link";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/tiktok";
import "react-social-icons/instagram";
import "react-social-icons/twitter";

interface Icon {
  icon: JSX.Element;
  url: string;
}

const icons: Icon[] = [
  {
    icon: <SocialIcon url="www.tiktok.com" />,
    url: "#",
  },
  { icon: <SocialIcon url="www.instagram.com" />, url: "#" },
  { icon: <SocialIcon url="www.twitter.com" />, url: "#" },
];

type Link = {
  text: string;
  url: string;
};

const links: Link[] = [
  { text: "About", url: "#" },
  { text: "Disclaimer", url: "/disclaimer" },
  { text: "Contact", url: "#" },
];

export function Footer() {
  return (
    <footer className="flex flex-col gap-y-5 rounded-lg px-7 py-5 md:px-10 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div className="aspect-square w-8 flex items-center justify-center rounded-sm bg-blue-500">
            <h1 className="font-bold italic text-2xl text-white">P</h1>
          </div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
            Pathfinder
          </h2>
        </div>

        <div className="flex gap-x-2">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="w-6 h-6 flex items-center rounded-full justify-center overflow-hidden"
            >
              {icon.icon}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="flex flex-col gap-x-5 gap-y-2 text-neutral-500 md:flex-row md:items-center ">
          {links.map((link, index) => (
            <li
              key={index}
              className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-400 hover:dark:text-neutral-100"
            >
              <Link href={link.url}>
                <p>{link.text}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between text-sm font-medium tracking-tight text-neutral-500 dark:text-neutral-400">
          <p>
            Copyright © {new Date().getFullYear()} Pathfinder. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
