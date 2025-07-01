"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Navbar from "@/components/NavBar";
import AdminMenu from "@/components/AdminMenu";
import Link from "next/link";

interface Station {
  STATIONID: number;
  STATIONNAME: string;
  LOCATION: string;
  PLATFORM: string;
  ZONEID: number;
}

const StationPage = () => {
  const router = useRouter();
  const [stationList, setStationList] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  // CRUD form state
  const [stationName, setStationName] = useState("");
  const [location, setLocation] = useState("");
  const [platform, setPlatform] = useState("");
  const [zoneId, setZoneId] = useState<number | "">("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch station data from the API
  const fetchStations = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/station", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data: any[] = await res.json();
        const stationObjects:Station[] = data.map((row: any[]) => ({
          STATIONID: row[0],
          STATIONNAME: row[1],
          LOCATION: row[2],
          PLATFORM: row[3],
          ZONEID: row[4],
        }));
        setStationList(stationObjects);
      } else {
        console.error("Failed to fetch station list");
      }
    } catch (err) {
      console.error("Error fetching station list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchStations();
    // eslint-disable-next-line
  }, [router]);

  // Add or Update station
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = editId
      ? `http://localhost:8000/api/station/${editId}`
      : "http://localhost:8000/api/station";
    const method = editId ? "PUT" : "POST";
    const body = JSON.stringify({
      stationName,
      location,
      platform,
      zoneId: Number(zoneId),
    });

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (res.ok) {
      fetchStations();
      setStationName("");
      setLocation("");
      setPlatform("");
      setZoneId("");
      setEditId(null);
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  };

  // Delete station
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this station?")) return;
    const res = await fetch(`http://localhost:8000/api/station/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchStations();
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  };

  // Edit station
  const handleEdit = (station: Station) => {
    setEditId(station.STATIONID);
    setStationName(station.STATIONNAME);
    setLocation(station.LOCATION);
    setPlatform(station.PLATFORM);
    setZoneId(station.ZONEID);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading station data...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <AdminMenu />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel – Station List</h1>
            <Link
              href="/admin/zone"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              + Create Zone
            </Link>
          </div>
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 text-sm rounded border border-yellow-300">
            <strong>Warning:</strong> You must <b>first create a Zone</b> before creating a Station. <br />
            Please enter a valid <b>Zone ID</b> which already exists in your system. If you do not, the system will collapse!
          </div>
          {/* Station Form */}
          <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm mb-1">Station Name</label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Platform</label>
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Zone ID</label>
              <input
                type="number"
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value ? Number(e.target.value) : "")}
                className="border rounded px-2 py-1"
                required
                min={1}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded transition hover:bg-blue-700"
            >
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setStationName("");
                  setLocation("");
                  setPlatform("");
                  setZoneId("");
                }}
                className="ml-2 text-gray-600 underline"
              >
                Cancel
              </button>
            )}
          </form>

          {/* Station Table */}
          {stationList.length === 0 ? (
            <p className="text-gray-500">No station data found.</p>
          ) : (
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Location</th>
                  <th className="py-2 px-4 text-left">Platform</th>
                  <th className="py-2 px-4 text-left">Zone ID</th>
                  <th className="py-2 px-4 text-left">Update/Delete</th>
                </tr>
              </thead>
              <tbody>
                {stationList.map((station) => (
                  <tr key={station.STATIONID} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{station.STATIONID}</td>
                    <td className="py-2 px-4">{station.STATIONNAME}</td>
                    <td className="py-2 px-4">{station.LOCATION}</td>
                    <td className="py-2 px-4">{station.PLATFORM}</td>
                    <td className="py-2 px-4">{station.ZONEID}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(station)}
                        className="text-blue-600 underline hover:text-blue-800 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(station.STATIONID)}
                        className="text-red-600 underline hover:text-red-800 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationPage;