"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// List of admin pages
const tableNames = [
  { key: "dashboard", label: "Dashboard" },
  { key: "zone", label: "Zones" },
  { key: "staff", label: "Staff" },
  { key: "driver", label: "Drivers" },
  { key: "passenger", label: "Passengers" },
  { key: "transaction", label: "Transactions" },
  { key: "routeTrains", label: "Route Trains" },
  { key: "station", label: "Stations" },
  { key: "schedule", label: "Schedules" },
  { key: "ticket", label: "Tickets" },
];

function getHref(key: string) {
  return `/admin/${key}`;
}

const NAVBAR_HEIGHT = 68; // Adjust if your Navbar is taller

export default function AdminMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Metro Rail Theme Colors (blue focus, red accent)
  const blueLight = "#e4eefd";
  const blue = "#70a1e0";
  const blueDark = "#2b4377";
  const blueMid = "#4d6fa9";
  const red = "#e53935";
  //const white = "#fff";

  return (
    <>
      {/* Hamburger button */}
      <button
        className="fixed left-6 z-[120] flex flex-col gap-1 w-10 h-10 items-center justify-center bg-white shadow-md rounded-lg border border-[#e5e7eb] hover:bg-[#f6f8fa] transition-all"
        aria-label="Open admin menu"
        onClick={() => setOpen(true)}
        style={{
          top: `${NAVBAR_HEIGHT + 16}px`,
        }}
      >
        {/* Hamburger icon with middle red */}
        <span
          className="block w-7 h-[3px] rounded transition-all"
          style={{ background: blueMid }}
        ></span>
        <span
          className="block w-7 h-[3px] rounded transition-all"
          style={{ background: red }}
        ></span>
        <span
          className="block w-7 h-[3px] rounded transition-all"
          style={{ background: blueMid }}
        ></span>
      </button>

      {/* Side menu overlay - overlays everything including navbar */}
      <div
        className={`fixed inset-0 z-[130] bg-[#4d6fa9cc] backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Side menu */}
      <aside
        className={`fixed left-0 top-0 h-full w-[320px] max-w-[90vw] z-[140] shadow-2xl overflow-y-auto transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: `linear-gradient(135deg, ${blueLight} 0%, ${blue} 80%, ${blueDark} 100%)`,
          boxShadow: open ? "2px 0 40px #0006" : "none",
        }}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 text-4xl text-[#2b4377] hover:text-[#e53935] transition z-[150]"
          aria-label="Close admin menu"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>
        {/* Menu content */}
        <div className="pt-12 pb-6 px-7 flex flex-col h-full">
          <h2
            className="mb-8 font-extrabold text-2xl tracking-widest"
            style={{
              color: blueDark,
              letterSpacing: "0.18em",
              textShadow: "0 2px 10px #e4eefd88",
            }}
          >
            MENU
          </h2>
          <nav className="flex-1">
            <ul className="space-y-2">
              {tableNames.map((item) => (
                <li key={item.key}>
                  <Link
                    href={getHref(item.key)}
                    className={`block px-3 py-3 rounded-lg text-lg font-medium border-l-4 transition-all duration-200 ${
                      pathname === getHref(item.key)
                        ? "bg-white text-[#e53935] border-[#e53935] font-bold shadow-md"
                        : "bg-transparent text-[#2b4377] border-transparent hover:bg-[#e4eefd] hover:pl-5 hover:text-[#385898]"
                    }`}
                    onClick={() => setOpen(false)}
                    style={{
                      boxShadow:
                        pathname === getHref(item.key)
                          ? "0 2px 12px 0 #e5393533"
                          : undefined,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-8 pb-2 text-center text-[#2b4377] opacity-80 text-xs">
            Powered by <span style={{ color: blueMid, fontWeight: 700 }}>Dhaka Metro Rail</span>
          </div>
        </div>
      </aside>
    </>
  );
}