import React from 'react';

interface Type1ToggleProps {
  value: 'OneWay' | 'Round' | 'MultiCity';
  onChange: (val: 'OneWay' | 'Round' | 'MultiCity') => void;
}

const options = [
  { label: 'One way', value: 'OneWay' },
  { label: 'Round', value: 'Round' },
  { label: 'Multi city', value: 'MultiCity' },
];

export default function Type1Toggle({ value, onChange }: Type1ToggleProps) {
  return (
    <div style={{
      display: 'flex',
      background: '#fff',
      borderRadius: 22,
      border: '2.5px solid #2b4377',
      overflow: 'hidden',
      marginBottom: 20,
      marginTop: 10,
      width: '100%',
      maxWidth: 540,
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value as any)}
          style={{
            flex: 1,
            padding: '10px 0',
            fontWeight: 600,
            fontSize: 17,
            color: value === opt.value ? '#fff' : '#2b4377',
            background: value === opt.value ? '#2b4377' : 'transparent',
            border: 'none',
            outline: 'none',
            transition: 'background 0.18s, color 0.18s'
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}