import React from 'react';

interface Type2SelectorProps {
  value: 'Economy' | 'Business';
  onChange: (val: 'Economy' | 'Business') => void;
}

export default function Type2Selector({ value, onChange }: Type2SelectorProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 24,
      marginTop: 8,
      marginBottom: 15,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        fontSize: 17,
        cursor: 'pointer'
      }}>
        <input
          type="radio"
          value="Economy"
          checked={value === 'Economy'}
          onChange={() => onChange('Economy')}
          style={{ marginRight: 7, accentColor: '#2b4377' }}
        />
        Economy
      </label>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        fontSize: 17,
        cursor: 'pointer'
      }}>
        <input
          type="radio"
          value="Business"
          checked={value === 'Business'}
          onChange={() => onChange('Business')}
          style={{ marginRight: 7, accentColor: '#2b4377' }}
        />
        Business
      </label>
    </div>
  );
}