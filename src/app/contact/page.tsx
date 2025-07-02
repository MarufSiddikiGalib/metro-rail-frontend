"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import { FaGithub, FaLinkedin, FaEnvelope, FaSquareFacebook  } from "react-icons/fa6";

export default function Contact() {
  return (
    <div className="bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 min-h-screen flex flex-col">
      {/* Sticky Navbar at the very top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      {/* Main container, height fills just under navbar */}
      <div
        className="flex flex-col items-center justify-center w-full"
        style={{
          minHeight: "calc(100vh - 68px)",
          marginTop: "68px",
        }}
      >
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-14 w-full max-w-xl flex flex-col items-center animate-fade-in">
          {/* Avatar with glow on hover */}
          <div className="mb-8">
            <Image
              src="/my-avatar.jpeg"
              alt="Your Name"
              width={140}
              height={140}
              className="rounded-full border-4 border-indigo-400 shadow-xl hover:shadow-pink-400/80 hover:ring-8 hover:ring-pink-300 hover:scale-110 transition-all duration-500"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-indigo-800 mb-3 text-center hover:tracking-widest transition-all duration-300">
            Contact Me
          </h1>
          <p className="text-gray-600 mb-7 text-center text-lg">
            Feel free to reach out through any of the platforms below!
          </p>
          <div className="flex flex-row gap-7 mb-7">
            <a
              href="https://github.com/MarufSiddikiGalib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-indigo-600 text-3xl transition-colors duration-200"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/maruf-siddiki-galib-7360092b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-3xl transition-colors duration-200"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:22-46401-1@student.aiub.edu"
              className="text-red-500 hover:text-red-700 text-3xl transition-colors duration-200"
              title="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.facebook.com/marufsiddiki.galib.5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black-400 hover:text-blue-600 text-3xl transition-colors duration-200"
              title="Facebook"
            >
              <FaSquareFacebook  />
            </a>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <a
              href="mailto:your.email@example.com"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold shadow hover:bg-indigo-600 transition-colors duration-200 text-center text-base"
            >
              Send me an Email
            </a>
            <a
              href="https://www.linkedin.com/in/maruf-siddiki-galib/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors duration-200 text-center text-base"
            >
              Connect on LinkedIn
            </a>
          </div>
          {/* Developed by text */}
          <div className="mt-8 text-center text-base md:text-lg font-medium text-gray-700">
            Developed with <span className="text-pink-500">❤️</span> by Maruf Siddiki Galib
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
}