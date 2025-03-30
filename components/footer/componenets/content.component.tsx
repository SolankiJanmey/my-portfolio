import { alice } from "@/pages";
import React from "react";

export default function Content() {
  return (
    <div className="bg-white text-black py-8 px-12 h-full w-full flex flex-col justify-between">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  const date = new Date();
  return (
    <div className="flex justify-between items-end">
      <h1 className="text-[10vw] leading-[0.8] mt-10">Janmey Solanki</h1>
      <p className={`${alice.className} text-gray-600`}>
        Copyright © {date.getFullYear()} Janmey Solanki. All rights reserved.
      </p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className={`${alice.className} flex shrink-0 gap-20`}>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-gray-500">Go To</h3>
        <NavLink>Home</NavLink>
        <NavLink>About Me</NavLink>
        <NavLink>Projects</NavLink>
        <NavLink>Blogs</NavLink>
        <NavLink>Contact Me</NavLink>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-gray-500">Socials</h3>
        <NavLink>Linkedin</NavLink>
        <NavLink>Github</NavLink>
        <NavLink>Email</NavLink>
        <NavLink>Resume</NavLink>
      </div>
    </div>
  );
};

const NavLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-gray-700 hover:text-gray-900 hover:underline transition-all duration-200 cursor-pointer">
      {children}
    </p>
  );
};
