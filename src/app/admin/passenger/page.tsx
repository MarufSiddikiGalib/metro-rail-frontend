"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton"; // Adjust path if needed
import Navbar from "@/components/NavBar";
import AdminMenu from "@/components/AdminMenu";

import Link from "next/link"; // for using link tag otherwise link tag will not work

interface Passenger {
  PASSENGERID: number;
  NAME: string;
  ADDRESS: string;
}

const PassengerPage = () => {
  const router = useRouter();
  const [passengerList, setPassengerList] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);

  // CRUD form state
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [editId, setEditId] = useState<number | null>(null);

  // Fetch passenger data from the API
  const fetchPassengers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/passenger", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data:any[] = await res.json();
        const passengerObjects:Passenger[] = data.map((row) => ({
          PASSENGERID: row[0],
          NAME: row[1],
          ADDRESS: row[2],
        }));
        setPassengerList(passengerObjects);
      } else {
        console.error("Failed to fetch passenger list");
      }
    } catch (err) {
      console.error("Error fetching passenger list:", err);
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
    fetchPassengers();
    // eslint-disable-next-line
  }, [router]);

  // Add or Update passenger
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  //   const url = editId
  //     ? `http://localhost:8000/api/passenger/${editId}`
  //     : "http://localhost:8000/api/passenger";
  //   const method = editId ? "PUT" : "POST";
  //   const body = JSON.stringify({
  //     Name: name,
  //     Address: address,
  //   });

    // const res = await fetch(url, {
    //   method,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body,
    // });

  //   if (res.ok) {
  //     fetchPassengers();
  //     setName("");
  //     setAddress("");
  //     setEditId(null);
  //   } else {
  //     const err = await res.json();
  //     alert("Error: " + err.error);
  //   }
  // };

  // Delete passenger
  // const handleDelete = async (id: number) => {
  //   const token = localStorage.getItem("token");
  //   if (!window.confirm("Delete this passenger?")) return;
  //   const res = await fetch(`http://localhost:8000/api/passenger/${id}`, {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   if (res.ok) {
  //     fetchPassengers();
  //   } else {
  //     const err = await res.json();
  //     alert("Error: " + err.error);
  //   }
  // };

  // // Edit passenger
  // const handleEdit = (passenger: Passenger) => {
  //   setEditId(passenger.PASSENGERID);
  //   setName(passenger.NAME);
  //   setAddress(passenger.ADDRESS);
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading passenger data...
      </div>
    );
  }

  return (
    <div>
    <Navbar />
    <AdminMenu />
    {/* Main content */}
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
         <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel – Passenger List</h1>
         <Link
              href="/admin/ticket"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              + SEE Ticket
            </Link>
          </div>
          <div className="mb-4 p-3 bg-red-100 text-red-800 text-sm rounded border border-red-300">
            <strong>Warning:</strong> Admin can not <b>delete passengers directly </b> after  <b>delete ticket the passenger of that ticket automatically deleted.</b> Go to ticket pages clicking the top right button <br />
            <b>Admins cannot add or update or delete passengers from this panel.</b>
          </div>

        {/* Passenger Form */}
        {/* <form onSubmit={handleSubmit} className="mb-6 flex gap-4 items-end">
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
            <label className="block text-sm mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
                setAddress("");
              }}
              className="ml-2 text-gray-600 underline"
            >
              Cancel
            </button>
          )}
        </form> */}

        {/* Passenger Table */}
        {passengerList.length === 0 ? (
          <p className="text-gray-500">No passenger data found.</p>
        ) : (
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Address</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {passengerList.map((passenger) => (
                <tr key={passenger.PASSENGERID} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{passenger.PASSENGERID}</td>
                  <td className="py-2 px-4">{passenger.NAME}</td>
                  <td className="py-2 px-4">{passenger.ADDRESS}</td>
                  <td className="py-2 px-4 flex gap-2"> No actions needed
                    {/* <button
                      onClick={() => handleEdit(passenger)} //text-blue-600 underline
                      className="text-blue-600 underline"  //"bg-blue-600 text-white px-2 py-1 rounded
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(passenger.PASSENGERID)}
                      className="text-red-600 underline" 
                    >
                      Delete
                    </button> */}
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

export default PassengerPage;