"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "Ticket Fare", href: "/user/ticket" },
  { name: "Timetable", href: "/user/timetable" },
  { name: "Journey Planer", href: "/user/journey-planner" },
  { name: "Routes", href: "/user/routes" },
  { name: "Rules", href: "/user/rules" },
  { name: "Maps", href: "/user/maps" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Read from localStorage on mount
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  // Optionally, add a storage event listener for cross-tab logout/login
  useEffect(() => {
    const handler = () => setUsername(localStorage.getItem("username"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await fetch("http://localhost:8000/api/user/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    window.location.href = "/user/login"; // Redirect to login page
  };

  return (
    <nav className="bg-white w-screen min-h-[68px] flex items-center border-b border-[#e4e6f1] px-4 py-0 sticky top-0 z-[100]">
      {/* Logo and site name */}
      <Link href="/" className="flex items-center no-underline mr-5 ">
        <Image
          src="/metro.jpg"
          alt="Dhaka Metro Rail Logo"
          width={40}
          height={40}
          className="rounded-full mr-2 bg-white border-2 border-[#2b4377]"
        />
        <span className="font-bold text-[22px] text-[#111] leading-none hover:text-[#e53935] hover:scale-102 transition">
          Dhaka Metro Rail
        </span>
      </Link>

      {/* Menu links */}
      <div className="flex-1 flex items-center gap-1 ">
        {menuLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`font-medium text-[18px] mx-2 pb-[1px] no-underline border-b-2  hover:text-[#e53935] hover:scale-107 transition  ${
              pathname === link.href
                ? "text-[#e53935] border-[#e53935]"
                : "text-[#222] border-transparent"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Search bar */}
      {/* <div className="bg-[#e4e6f1] rounded-lg flex items-center mr-2 px-2 min-w-[140px] max-w-[200px]">
        <span className="mr-1 text-[#555]">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <input
          placeholder="Search here"
          className="border-none outline-none bg-transparent text-[13px] w-full text-[#222]"
        />
        <span className="text-[#888] text-xs ml-1 px-1 bg-[#f1f2f9] rounded">
          ⌘ F
        </span>
      </div> */}

      {/* Account buttons */}
      
      {/* Account/User section */}
      <div className="flex items-center gap-1">
        {username ? (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#2b4377]">{username}</span>
            <button
              onClick={handleLogout}
              className="bg-[#e53935] text-white font-semibold rounded-lg px-3 py-[5px] text-[15px] ml-2 hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>

        <Link
          href="/user/signup"
          className="bg-white text-[#222] font-semibold border-[1.4px] border-[#222] rounded-lg px-3 py-[5px] mr-1 text-[15px] cursor-pointer hover:bg-[#f7f8fa] transition"
        >
          CREATE ACCOUNT
        </Link>
        <Link
          href="/user/login"
          className="bg-white text-[#222] font-semibold border-[1.4px] border-[#222] rounded-lg px-4 py-[5px] text-[15px] cursor-pointer hover:bg-[#f7f8fa] transition"
        >
          LOGIN
        </Link>
        </>
        )}
      </div>
    </nav>
  );
}