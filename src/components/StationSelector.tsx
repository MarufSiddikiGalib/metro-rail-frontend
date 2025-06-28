import React from "react";

export interface Station {
  stationId: number;
  name: string;
}

interface StationSelectorProps {
  label: string;
  icon: React.ReactNode;
  value: number | undefined;
  onChange: (stationId: number) => void;
  options: Station[];
  disabled?: boolean;
}

export default function StationSelector({
  label,
  icon,
  value,
  onChange,
  options,
  disabled,
}: StationSelectorProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#314975",
        borderRadius: 7,
        padding: "6px 11px",
        marginBottom: 8,
        border: "1.2px solid #2b4377",
        minWidth: 170,
        width: "100%",
        color: "#fff",
        opacity: disabled ? 0.6 : 1,
        fontSize: 15,
      }}
    >
      <span style={{ marginRight: 7, fontSize: 16 }}>{icon}</span>
      <span style={{ fontWeight: 500, marginRight: 11 }}>{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        style={{
          flex: 1,
          background: "#fff",
          color: "#222",
          border: "none",
          fontSize: 15,
          fontWeight: 500,
          outline: "none",
          minWidth: 80,
          borderRadius: 4,
          padding: "2px 5px",
          marginLeft: 8,
        }}
      >
        <option value="" disabled>
          {options.length === 0
            ? "Loading..."
            : `Select ${label}`}
        </option>
        {options
          .filter(
            (station, idx, arr) =>
              station.stationId !== undefined &&
              station.stationId !== null &&
              arr.findIndex(s => s.stationId === station.stationId) === idx
          )
          .map((station) => (
            <option
              key={station.stationId ?? station.name}
              value={station.stationId}
              style={{ color: "#222", background: "#fff" }}
            >
              {station.name}
            </option>
          ))}
      </select>
    </div>
  );
}