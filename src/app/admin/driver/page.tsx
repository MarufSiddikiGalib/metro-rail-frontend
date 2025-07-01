"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton"; // Adjust path if needed
import Navbar from "@/components/NavBar";
import AdminMenu from "@/components/AdminMenu";

interface Driver {
    DRIVERID: number;
    CONTACTINFO: string;
    EXPERIENCE: number;
    NAME: string;
    LICENSENUMBER: string;
  }

const DriverPage = () => {
  const router = useRouter();
  const [driverList, setDriverList] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  // CRUD form state
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [experience, setExperience] = useState<number | "">("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch driver data from the API
  const fetchDrivers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/driver", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data:any[] = await res.json();
        const driverObjects: Driver[] = data.map((row) => ({
          DRIVERID: row[0],
          NAME: row[1],
          LICENSENUMBER: row[2],
          CONTACTINFO: row[3],
          EXPERIENCE: row[4],
        }));
        setDriverList(driverObjects);
      } else {
        console.error("Failed to fetch driver list");
      }
    } catch (err) {
      console.error("Error fetching driver list:", err);
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
    fetchDrivers();
    
  }, [router]);

  // Add or Update driver
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = editId
      ? `http://localhost:8000/api/driver/${editId}`
      : "http://localhost:8000/api/driver";
    const method = editId ? "PUT" : "POST";
    const body = JSON.stringify({
      Name: name,
      LicenseNumber: licenseNumber,
      ContactInfo: contactInfo,
      Experience: Number(experience),
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
      fetchDrivers();
      setName("");
      setLicenseNumber("");
      setContactInfo("");
      setExperience("");
      setEditId(null);
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  };

  // Delete driver
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this driver?")) return;
    const res = await fetch(`http://localhost:8000/api/driver/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchDrivers();
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  };

  // Edit driver
  const handleEdit = (driver: Driver) => {
    setEditId(driver.DRIVERID);
    setName(driver.NAME);
    setLicenseNumber(driver.LICENSENUMBER);
    setContactInfo(driver.CONTACTINFO);
    setExperience(driver.EXPERIENCE);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading driver data...
      </div>
    );
  }

  return (
    <div>
    <Navbar />
    <AdminMenu />
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel – Driver List</h1>

        {/* Driver Form */}
        <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">License Number</label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Contact Info</label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Experience (years)</label>
            <input
              type="number"
              min={0}
              value={experience}
              onChange={(e) => setExperience(e.target.value === "" ? "" : Number(e.target.value))}
              className="border rounded px-2 py-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setName("");
                setLicenseNumber("");
                setContactInfo("");
                setExperience("");
              }}
              className="ml-2 text-gray-600 underline"
            >
              Cancel
            </button>
          )}
        </form>

        {/* Driver Table */}
        {driverList.length === 0 ? (
          <p className="text-gray-500">No driver data found.</p>
        ) : (
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">License Number</th>
                <th className="py-2 px-4 text-left">Contact Info</th>
                <th className="py-2 px-4 text-left">Experience</th>
                <th className="py-2 px-4 text-left">Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {driverList.map((driver) => (
                <tr key={driver.DRIVERID} className="border-b hover:bg-gray-50">
                  <td>{driver.DRIVERID}</td>
                  <td>{driver.CONTACTINFO}</td>
                  <td>{driver.EXPERIENCE}</td>
                  <td>{driver.NAME}</td>
                  <td>{driver.LICENSENUMBER}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(driver)}
                      className="text-blue-600 underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(driver.DRIVERID)}
                      className="text-red-600 underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
    </div>
  );
};

export default DriverPage;