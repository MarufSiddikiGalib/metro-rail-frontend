import React from 'react';

interface TravellerSelectorProps {
  value: { count: number; type: 'Adult' | 'Child' };
  onChange: (val: { count: number; type: 'Adult' | 'Child' }) => void;

  // value: { count: number; type: 'Adult' | 'Child' };
  // onChange: (val: { count: number; type: 'Adult' | 'Child' }) => void;
}

export default function TravellerSelector({ value, onChange }: TravellerSelectorProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <select
        value={value.count}
        onChange={e => onChange({ ...value, count: Number(e.target.value) })}
        style={{
          border: '1.5px solid #2b4377',
          borderRadius: 7,
          fontSize: 15,
          padding: '4px 7px',
          fontWeight: 500,
          color: '#2b4377',
          background: '#fff',
          marginRight: 4,
        }}
      >
        {[1].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <select
        value={value.type}
        onChange={e => onChange({ ...value, type: e.target.value as 'Adult' | 'Child' })}
        style={{
          border: '1.5px solid #2b4377',
          borderRadius: 7,
          fontSize: 15,
          padding: '4px 7px',
          fontWeight: 500,
          color: '#2b4377',
          background: '#fff',
        }}
      >
        <option value="Adult">Adult</option>
        {/* <option value="Child">Child</option> */}
      </select>
    </div>
  );
}