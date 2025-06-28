"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton"; //Components
import Navbar from "@/components/NavBar"; //Components
import AdminMenu from "@/components/AdminMenu"; //Components

// Define the Staff interface to match the expected data structure

interface Staff {
  STAFFID: number;
  ROLE: string;
  ASSIGNEDSHIFT: string;
}

const StaffPage = () => {
  const router = useRouter();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  // Added later for the CRUD operations
  const [role, setRole] = useState("");
  const [assignedShift, setAssignedShift] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  
    // Fetch staff data from the API
    const fetchStaff = async () => {

      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:8000/api/staff", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
           // Map each array to an object 
           // React needs unique keys and readable properties, so shape the data into objects.
        const staffObjects = data.map((row: any[]) => ({
            STAFFID: row[0],
            ROLE: row[1],
            ASSIGNEDSHIFT: row[2],
          }));
          setStaffList(staffObjects);
        } else {
          console.error("Failed to fetch staff");
        }
      } catch (err) {
        console.error("Error fetching staff:", err);
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

      fetchStaff();
     }, [router]);

 // Update 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = editId
      ? `http://localhost:8000/api/staff/${editId}`
      : "http://localhost:8000/api/staff";
    const method = editId ? "PUT" : "POST";
    const body = JSON.stringify({ role, assignedShift });

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (res.ok) {
      fetchStaff();
      setRole("");
      setAssignedShift("");
      setEditId(null);
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  };

 // Delete staff member
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this staff member?")) return;
    const res = await fetch(`http://localhost:8000/api/staff/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchStaff();
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  };
 // Edit staff member
  const handleEdit = (staff: Staff) => {
    setEditId(staff.STAFFID);
    setRole(staff.ROLE);
    setAssignedShift(staff.ASSIGNEDSHIFT);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold">
      Loading staff data...
    </div>;
  }


  // Logout Logic  now in components/LogoutButton.tsx
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   router.push("/admin/login");
  // };

  

  return (
    <div>
      <Navbar />
      <AdminMenu />
      {/* Main content area */}
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel – Staff List</h1>



 {/* Staff Form */}
 <form onSubmit={handleSubmit} className="mb-6 flex gap-4 items-end">
          <div>
            <label className="block text-sm mb-1">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Shift</label>
            <input
              type="text"
              value={assignedShift}
              onChange={(e) => setAssignedShift(e.target.value)}
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
                setRole("");
                setAssignedShift("");
              }}
              className="ml-2 text-gray-600 underline"
            >
              Cancel
            </button>
          )}
        </form>



{/* Staff Table */}
        {staffList.length === 0 ? (
          <p className="text-gray-500">No staff data found.</p>
        ) : (
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Shift</th>
                <th className="py-2 px-4 text-left">Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.STAFFID} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{staff.STAFFID}</td>
                  <td className="py-2 px-4">{staff.ROLE}</td>
                  <td className="py-2 px-4">{staff.ASSIGNEDSHIFT}</td>
                
                {/* Button integration and function call after click the button */}
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(staff)}
                      className="text-blue-600 underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(staff.STAFFID)}
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

export default StaffPage;
