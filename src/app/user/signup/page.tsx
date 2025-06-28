"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfPw, setShowConfPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Signup failed");
      }
      router.push("/user/login");
    } catch (e: any) {
      setError(e.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center relative">
        {/* Back button */}
        <Link
          href="/user/ticket"
          className="absolute left-3 top-6 bg-[#2b4377] text-white rounded-lg w-8 h-8 flex items-center justify-center shadow-md text-2xl"
          aria-label="Back to home"
        >
          &lt;
        </Link>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-0 bg-transparent rounded-xl shadow-none p-0 m-0 w-full max-w-lg"
        >
          <h2 className="font-bold text-[#2b4377] text-center text-3xl mb-8 mt-0">
            Create an account
          </h2>

          {/* Username */}
          <div className="flex items-center bg-[#f5f6fa] rounded-xl px-4 py-3 mb-5 shadow-md text-lg text-[#314975] w-full">
            <span className="mr-3 text-2xl text-[#314975]">
              <svg width="22" height="22" fill="#314975" className="inline">
                <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="border-none outline-none bg-transparent text-lg text-[#314975] flex-1"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-[#f5f6fa] rounded-xl px-4 py-3 mb-5 shadow-md text-lg text-[#314975] w-full">
            <span className="mr-3 text-2xl text-[#314975]">
              <svg width="22" height="22" fill="#314975" className="inline">
                <path d="M17 8V6a5 5 0 00-10 0v2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-8a2 2 0 00-2-2h-2zm-8-2a3 3 0 016 0v2H9V6zm10 10H5v-8h14v8z" />
              </svg>
            </span>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border-none outline-none bg-transparent text-lg text-[#314975] flex-1"
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              className="bg-transparent border-none outline-none cursor-pointer text-xl text-[#314975] ml-2 p-0"
              tabIndex={-1}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw
                ? <svg width="22" height="22" fill="#314975"><path d="M1 11c2.73-5.33 8-9 11-9s8.27 3.67 11 9c-2.73 5.33-8 9-11 9S3.73 16.33 1 11zm11 7c2.76 0 7.65-2.64 10-7-2.35-4.36-7.24-7-10-7-2.76 0-7.65 2.64-10 7 2.35 4.36 7.24 7 10 7zm0-11a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
                : <svg width="22" height="22" fill="#314975"><path d="M1 11c2.73-5.33 8-9 11-9s8.27 3.67 11 9c-2.73 5.33-8 9-11 9S3.73 16.33 1 11zm11 7c2.76 0 7.65-2.64 10-7-2.35-4.36-7.24-7-10-7-2.76 0-7.65 2.64-10 7 2.35 4.36 7.24 7 10 7zm2.83-12.17l-1.41 1.41C14.41 8.41 15 9.64 15 11c0 1.36-.59 2.59-1.58 3.41l1.41 1.41C16.07 14.14 17 12.65 17 11c0-1.65-.93-3.14-2.17-4.17z"/></svg>
              }
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center bg-[#f5f6fa] rounded-xl px-4 py-3 mb-5 shadow-md text-lg text-[#314975] w-full">
            <span className="mr-3 text-2xl text-[#314975]">
              <svg width="22" height="22" fill="#314975" className="inline">
                <path d="M17 8V6a5 5 0 00-10 0v2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-8a2 2 0 00-2-2h-2zm-8-2a3 3 0 016 0v2H9V6zm10 10H5v-8h14v8z" />
              </svg>
            </span>
            <input
              type={showConfPw ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={confPassword}
              onChange={e => setConfPassword(e.target.value)}
              className="border-none outline-none bg-transparent text-lg text-[#314975] flex-1"
            />
            <button
              type="button"
              onClick={() => setShowConfPw(v => !v)}
              className="bg-transparent border-none outline-none cursor-pointer text-xl text-[#314975] ml-2 p-0"
              tabIndex={-1}
              aria-label={showConfPw ? "Hide password" : "Show password"}
            >
              {showConfPw
                ? <svg width="22" height="22" fill="#314975"><path d="M1 11c2.73-5.33 8-9 11-9s8.27 3.67 11 9c-2.73 5.33-8 9-11 9S3.73 16.33 1 11zm11 7c2.76 0 7.65-2.64 10-7-2.35-4.36-7.24-7-10-7-2.76 0-7.65 2.64-10 7 2.35 4.36 7.24 7 10 7zm0-11a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
                : <svg width="22" height="22" fill="#314975"><path d="M1 11c2.73-5.33 8-9 11-9s8.27 3.67 11 9c-2.73 5.33-8 9-11 9S3.73 16.33 1 11zm11 7c2.76 0 7.65-2.64 10-7-2.35-4.36-7.24-7-10-7-2.76 0-7.65 2.64-10 7 2.35 4.36 7.24 7 10 7zm2.83-12.17l-1.41 1.41C14.41 8.41 15 9.64 15 11c0 1.36-.59 2.59-1.58 3.41l1.41 1.41C16.07 14.14 17 12.65 17 11c0-1.65-.93-3.14-2.17-4.17z"/></svg>
              }
            </button>
          </div>

          {error && <div className="text-red-600 text-center mb-2">{error}</div>}

          {/* Signup button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2b4377] text-white rounded-xl font-bold text-lg py-3 mb-6 mt-1 shadow-md cursor-pointer hover:bg-[#223160] transition-all"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* Divider and Google Signup */}
          <div className="flex items-center gap-2 mb-3">
            <hr className="flex-1 border-t-[1.5px] border-[#cfd4e7]" />
            <span className="text-[#2b4377] font-medium text-sm">Or Signup with</span>
            <hr className="flex-1 border-t-[1.5px] border-[#cfd4e7]" />
          </div>
          <div className="flex justify-center gap-6 mb-6">
            {/* Google only */}
            <button
              type="button"
              className="w-10 h-10 rounded-lg border-none bg-white shadow-md flex items-center justify-center cursor-pointer text-2xl"
              aria-label="Signup with Google"
              onClick={() => { /* Your Google signup logic here */ }}
            >
              <svg width="26" height="26" viewBox="0 0 48 48">
                <g>
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.44 1.22 8.48 3.1l6.31-6.1C34.6 2.22 29.72 0 24 0 14.82 0 6.88 5.84 3.1 14.22l7.97 6.19C13.12 13.78 17.98 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.1 24.55c0-1.59-.13-3.11-.37-4.55H24v9.14h12.4c-.54 2.89-2.2 5.34-4.7 6.99l7.58 5.9C43.67 38.13 46.1 31.98 46.1 24.55z"/>
                  <path fill="#FBBC05" d="M10.17 28.41A14.56 14.56 0 019.5 24c0-1.52.25-2.99.67-4.41l-7.97-6.19A23.9 23.9 0 000 24c0 3.82.92 7.44 2.56 10.6l7.61-6.19z"/>
                  <path fill="#EA4335" d="M24 47.5c6.48 0 11.93-2.16 15.9-5.85l-7.58-5.9c-2.11 1.42-4.82 2.27-8.32 2.27-6.02 0-10.89-4.28-12.82-10.19l-7.97 6.19C6.88 42.16 14.82 47.5 24 47.5z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </g>
              </svg>
            </button>
          </div>

          {/* Already have an account */}
          <div className="text-center mt-3 text-lg">
            <span className="text-[#222]">I Already Have an Account </span>
            <Link href="/user/login" className="text-[#2b4377] font-bold no-underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}