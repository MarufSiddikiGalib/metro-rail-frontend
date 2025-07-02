"use client";
import React from "react";
import Navbar from "@/components/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Notice from "@/components/notice";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen w-full">
      <Navbar />

 <Notice />
 

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto pt-10 pb-10 px-4 flex flex-col items-center">
        <section className="w-full text-center mt-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2b4377] mb-2 drop-shadow-sm">
            Welcome to Dhaka Metro Rail
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your gateway to fast, efficient, and modern city transport.
          </p>
        </section>

        {/* Interactive Image Section */}
        <section className="flex flex-col md:flex-row gap-10 w-full justify-center items-center mt-6">
          {/* Left side: Ticket Fare Image */}
          <div
            className="flex-1 flex flex-col items-center cursor-pointer group"
            onClick={() => router.push("/user/ticket")}
            tabIndex={0}
            role="button"
            aria-label="Go to Ticket Fare"
          >
            <div className="overflow-hidden rounded-md border-2 border-blue-200 shadow-lg group-hover:shadow-blue-300 group-hover:scale-105 transition">
              <Image
                src="/ticket-fare2.png"
                alt="Ticket Fare"
                width={400}
                height={280}
                className="object-cover"
                priority
              />
            </div>
            <span className="mt-4 text-lg font-semibold text-[#2b4377] group-hover:underline">
              Ticket Fare
            </span>
          </div>

          {/* Right side: Metro Map Image */}
          <div
            className="flex-1 flex flex-col items-center cursor-pointer group"
            onClick={() => router.push("/user/maps")}
            tabIndex={0}
            role="button"
            aria-label="Go to Metro Map"
          >
            <div className="overflow-hidden rounded-md border-2 border-blue-200 shadow-lg group-hover:shadow-blue-300 group-hover:scale-105 transition">
              <Image
                src="/metro-map-preview.png"
                alt="Metro Map"
                width={400}
                height={280}
                className="object-cover"
                priority
              />
            </div>
            <span className="mt-4 text-lg font-semibold text-[#2b4377] group-hover:underline">
              Interactive Metro Map
            </span>
          </div>
        </section>

        {/* Out Park & Features Section */}
        <section className="w-full mt-14">
          <div className="bg-white/80 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-6">
              Out Park & Explore More Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Routes"
                description="Explore all metro rail routes and stations."
                href="/user/routes"
              />
              <FeatureCard
                title="Timetable"
                description="View the train schedule for all stations."
                href="/user/timetable"
              />
              <FeatureCard
                title="Journey Planner"
                description="Plan your journey fast and easily."
                href="/user/journey-planner"
              />
              <FeatureCard
                title="Rules"
                description="Know the important rules before your journey."
                href="/user/rules"
              />
              <FeatureCard
                title="Contact Us"
                description="Get in touch for help, queries or feedback."
                href="/contact"
              />
              <FeatureCard
                title="Passenger Services"
                description="Manage your profile, bookings and tickets."
                href="/user/passenger"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-lg">
          &copy; {new Date().getFullYear()} Developed with ❤️ by Maruf Siddiki Galib. All rights reserved.
          <br />
          <p> Get in touch on{" "}
          
          <a
          
            href="https://www.linkedin.com/in/maruf-siddiki-galib-7360092b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-lg"
        >
           LinkedIn
         </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="block">
      <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-2xl shadow hover:shadow-md hover:scale-105 transition cursor-pointer border border-blue-100 h-full flex flex-col items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        </div>
        <span className="text-blue-700 font-medium mt-2 group-hover:underline">
          Explore &rarr;
        </span>
      </div>
    </Link>
  );
}