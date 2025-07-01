"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//import LogoutButton from "@/components/LogoutButton";
import Navbar from "@/components/NavBar";
import AdminMenu from "@/components/AdminMenu";
import Link from "next/link";

interface Transaction {
  TRANSACTIONID: number;
  AMOUNT: number;
  PAYMENTDATE: string; // e.g., "2025-06-24"
  PAYMENTMETHOD1: string;
  PAYMENTMETHOD2: string;
  TICKETNUMBER: number;
}

const TransactionPage = () => {
  const router = useRouter();
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch transaction data from the API
  const fetchTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data: any[] = await res.json();
        // If data is array of arrays, map to objects
        const transactionObjects:Transaction[] = data.map((row: any[]) => ({
          TRANSACTIONID: row[0],
          AMOUNT: row[1],
          PAYMENTDATE: row[2] ? String(row[2]).slice(0, 10) : "",
          PAYMENTMETHOD1: row[3],
          PAYMENTMETHOD2: row[4],
          TICKETNUMBER: row[5],
        }));
        setTransactionList(transactionObjects);
      } else {
        console.error("Failed to fetch transaction list");
      }
    } catch (err) {
      console.error("Error fetching transaction list:", err);
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
    fetchTransactions();
    // eslint-disable-next-line
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading transaction data...
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
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel – Transaction List</h1>
            <Link
              href="/admin/ticket"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              + SEE Ticket
            </Link>
          </div>
          <div className="mb-4 p-3 bg-blue-100 text-blue-800 text-sm rounded border border-blue-300">
            <strong>Info:</strong> Admins can only <b>view</b> transactions. No add/update/delete.<br />
            <b>Each transaction is linked to a valid ticket.</b>
          </div>

          {/* Transaction Table */}
          {transactionList.length === 0 ? (
            <p className="text-gray-500">No transaction data found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Transaction ID</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                    <th className="py-2 px-4 text-left">Payment Date</th>
                    <th className="py-2 px-4 text-left">Payment Method 1</th>
                    <th className="py-2 px-4 text-left">Payment Method 2</th>
                    <th className="py-2 px-4 text-left">Ticket Number</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionList.map((transaction) => (
                    <tr key={transaction.TRANSACTIONID} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{transaction.TRANSACTIONID}</td>
                      <td className="py-2 px-4">{transaction.AMOUNT}</td>
                      <td className="py-2 px-4">{transaction.PAYMENTDATE}</td>
                      <td className="py-2 px-4">{transaction.PAYMENTMETHOD1}</td>
                      <td className="py-2 px-4">{transaction.PAYMENTMETHOD2}</td>
                      <td className="py-2 px-4">{transaction.TICKETNUMBER}</td>
                      <td className="py-2 px-4">No actions needed</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div>
            {/* <LogoutButton /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;