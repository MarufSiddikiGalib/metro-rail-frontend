// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface Stats {
//   zone: number;
//   staff: number;
//   driver: number;
//   passenger: number;
//   train: number;
//   routeTrains: number;
//   station: number;
//   schedule: number;
//   ticket: number;
// }

// const tableNames = [
//   { key: "zone", label: "Zones" },
//   { key: "staff", label: "Staff" },
//   { key: "driver", label: "Drivers" },
//   { key: "passenger", label: "Passengers" },
//   { key: "train", label: "Trains" },
//   { key: "routeTrains", label: "Route Trains" },
//   { key: "station", label: "Stations" },
//   { key: "schedule", label: "Schedules" },
//   { key: "ticket", label: "Tickets" },
// ];

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/admin/login");
//       return;
//     }
//     fetchStats(token);
//   }, [router]);

//   const fetchStats = async (token: string) => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:8000/api/admin/dashboard-stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         setStats(await res.json());
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
//         <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">
//           Admin Dashboard
//         </h1>
//         {loading ? (
//           <div className="text-center text-lg text-gray-500">Loading...</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {tableNames.map(({ key, label }) => (
//               <div key={key} className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center shadow-sm">
//                 <div className="text-2xl font-bold text-blue-800">{stats && stats[key as keyof Stats]}</div>
//                 <div className="mt-2 text-gray-700">{label}</div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import Navbar from "@/components/NavBar";
import AdminMenu from "@/components/AdminMenu";


// Simple count-up animation hook
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = 0;
    let startTime: number | null = null;
    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (target - start) + start));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    if (typeof target === "number") {
      requestAnimationFrame(animate);
    }
  }, [target, duration]);
  return count;
}

interface Stats {
  zone: number;
  staff: number;
  driver: number;
  passenger: number;
  transaction: number;
  routeTrains: number;
  station: number;
  schedule: number;
  ticket: number;
}

const tableNames = [
  { key: "zone", label: "Zones" },
  { key: "staff", label: "Staff" },
  { key: "driver", label: "Drivers" },
  { key: "passenger", label: "Passengers" },
  { key: "transaction", label: "Transaction" },
  { key: "routeTrains", label: "Route Trains" },
  { key: "station", label: "Stations" },
  { key: "schedule", label: "Schedules" },
  { key: "ticket", label: "Tickets" },
];

// Helper to generate hrefs for each key
function getHref(key: string) {
  return `/admin/${key}`;
}


// Create a StatCard component, so the hook is called at the top level of a component
// export function StatCard({ value, label }: { value: number; label: string }) {
//   const animatedValue = useCountUp(value);
//   return (
//     <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center shadow-sm">
//       <div className="text-2xl font-bold text-blue-800">{animatedValue}</div>
//       <div className="mt-2 text-gray-700">{label}</div>
//     </div>
//   );
// }



// StatCard as a component, all clickable
function StatCard({
  value,
  label,
  href,
}: {
  value: number;
  label: string;
  href: string;
}) {
  const animatedValue = useCountUp(value);
  return (
    <Link href={href}>
      <span className="block bg-blue-50 border border-blue-200 rounded-lg p-6 text-center shadow-sm cursor-pointer transition-all duration-150 hover:scale-105 hover:border-blue-400 hover:shadow-md">
        <div className="text-2xl font-bold text-blue-800">{animatedValue}</div>
        <div className="mt-2 text-gray-700">{label}</div>
      </span>
    </Link>
  );
}



export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchStats(token);
  }, [router]);

  const fetchStats = async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/admin/dashboard-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStats(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Navbar />
    <AdminMenu />
    {/* Main container with padding and background */}
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">
          Admin Dashboard
        </h1>
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tableNames.map(({ key, label }) => (
             <StatCard
             key={key}
             label={label}
             value={stats ? stats[key as keyof Stats] : 0}
             href={getHref(key)}
           />
             
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}