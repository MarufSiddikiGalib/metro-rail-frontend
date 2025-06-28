import React from "react";

const METHODS = ["Bkash", "Nogod", "Rocket"];

export default function PaymentModal({
  open,
  amount,
  paymentDate,
  paymentMethod,
  setPaymentMethod,
  onComplete,
  onClose
}: {
  open: boolean;
  amount: number | null;
  paymentDate: string;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  onComplete: () => void;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 min-w-[320px]">
        <h2 className="font-bold mb-4 text-lg">Payment</h2>
        <div className="mb-2">
          <label className="block text-sm mb-1">Amount</label>
          <input type="number" value={amount ?? ""} disabled className="border rounded px-2 py-1 bg-gray-100" />
        </div>
        <div className="mb-2">
          <label className="block text-sm mb-1">Payment Date</label>
          <input type="date" value={paymentDate} disabled className="border rounded px-2 py-1 bg-gray-100" />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
          onClick={onComplete}
        >
          Complete Payment
        </button>
        <button className="ml-4 text-gray-600 underline" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}