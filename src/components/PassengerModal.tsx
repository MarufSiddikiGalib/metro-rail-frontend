import React, { useState, useEffect } from 'react';

interface PassengerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; address: string }) => void;
  username?: string | null; // Optional logged-in username for autofill/readonly
  payNow?: boolean; // If true, button text becomes "Pay Now"
}

export default function PassengerModal({
  open,
  onClose,
  onSubmit,
  username,
  payNow = false,
}: PassengerModalProps) {
  const [name, setName] = useState(username || '');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset fields if modal reopens
  useEffect(() => {
    setName(username || '');
    setAddress('');
    setLoading(false);
  }, [open, username]);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      left: 0, top: 0, right: 0, bottom: 0,
      background: 'rgba(44, 67, 119, 0.38)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 14,
        minWidth: 340,
        maxWidth: 400,
        padding: 32,
        boxShadow: '0 8px 32px #2b437733',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <h2 style={{ color: '#2b4377', fontWeight: 600, marginBottom: 22, textAlign: 'center' }}>
          Passenger Information
        </h2>
        <input
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: '100%',
            fontSize: 16,
            padding: '10px 12px',
            borderRadius: 8,
            border: '1.5px solid #2b4377',
            marginBottom: 16,
            background: username ? "#f4f6fb" : "#fff",
            color: username ? "#999" : "#222"
          }}
          disabled={!!username}
        />
        <input
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{
            width: '100%',
            fontSize: 16,
            padding: '10px 12px',
            borderRadius: 8,
            border: '1.5px solid #2b4377',
            marginBottom: 24,
          }}
        />
        <div style={{ display: 'flex', gap: 16 }}>
          <button
            onClick={onClose}
            style={{
              background: '#fff',
              color: '#2b4377',
              border: '2px solid #2b4377',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer'
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setLoading(true);
              onSubmit({ name, address });
            }}
            style={{
              background: '#2b4377',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 24px',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer'
            }}
            disabled={loading || !name.trim() || !address.trim()}
          >
            {loading ? 'Submitting...' : payNow ? 'Pay Now' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}