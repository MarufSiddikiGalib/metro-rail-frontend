"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/NavBar";
import "leaflet/dist/leaflet.css";

// Dynamically import MapContainer to avoid SSR issues with window/leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

// Do NOT import from "leaflet" or "react-leaflet" at the top-level except for style

// Metro logo marker icon (must be created in useMemo and only on client)
function useMetroIcon() {
  const [icon, setIcon] = useState<any>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    import("leaflet").then(L => {
      setIcon(
        new L.Icon({
          iconUrl: "/metro.jpg",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })
      );
    });
  }, []);

  return icon;
}

// Station coordinates
const stationCoords: Record<string, { lat: number; lng: number }> = {
  "Uttara North": { lat: 23.8727, lng: 90.3845 },
  "Uttara Center": { lat: 23.8645, lng: 90.3845 },
  "Uttara South": { lat: 23.8573, lng: 90.3845 },
  "Pallabi": { lat: 23.8242, lng: 90.3654 },
  "Mirpur-11": { lat: 23.8150, lng: 90.3657 },
  "Mirpur-10": { lat: 23.8025, lng: 90.3667 },
  "Kazipara": { lat: 23.7920, lng: 90.3668 },
  "Shewrapara": { lat: 23.7827, lng: 90.3669 },
  "Agargaon": { lat: 23.7791, lng: 90.3672 },
  "Bijoy Sarani": { lat: 23.7699, lng: 90.3853 },
  "Farmgate": { lat: 23.7564, lng: 90.3909 },
  "Kawran Bazar": { lat: 23.7517, lng: 90.3930 },
  "Shahbag": { lat: 23.7386, lng: 90.3986 },
  "Dhaka University": { lat: 23.7356, lng: 90.3997 },
  "Bangladesh Secretariat": { lat: 23.7333, lng: 90.4082 },
  "Motijheel": { lat: 23.7296, lng: 90.4203 }
};

const orderedNames = [
  "Uttara North", "Uttara Center", "Uttara South", "Pallabi", "Mirpur-11",
  "Mirpur-10", "Kazipara", "Shewrapara", "Agargaon", "Bijoy Sarani", "Farmgate",
  "Kawran Bazar", "Shahbag", "Dhaka University", "Bangladesh Secretariat", "Motijheel"
];

export default function MapsPage() {
  const [stations, setStations] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const metroIcon = useMetroIcon();

  // Dynamically import react-leaflet components only on client
  const [leafletComponents, setLeafletComponents] = useState<any | null>(null);
  useEffect(() => {
    setIsClient(true); // Only render map on client
    fetch("http://localhost:8000/api/stations")
      .then(res => res.json())
      .then(setStations);
    // dynamically import react-leaflet components
    Promise.all([
      import("react-leaflet").then(mod => ({
        TileLayer: mod.TileLayer,
        Marker: mod.Marker,
        Polyline: mod.Polyline,
        Popup: mod.Popup,
      }))
    ]).then(([rl]) => {
      setLeafletComponents(rl);
    });
  }, []);

  // Prepare station data with coordinates
  const stationsWithCoords = stations
    .map(([id, name, displayName, platform]: any) => {
      const coords = stationCoords[name];
      if (coords) {
        return { id, name, lat: coords.lat, lng: coords.lng, displayName, platform };
      }
      return null;
    })
    .filter((s): s is { id: number; name: string; lat: number; lng: number; displayName: string; platform: string } => !!s);

  const orderedStations = orderedNames
    .map(name => stationsWithCoords.find(s => s.name === name))
    .filter((station): station is NonNullable<typeof station> => station != null);

  const polylinePoints = orderedStations.map(s => [s.lat, s.lng] as [number, number]);

  // Wait for dynamic imports before rendering map
  if (!leafletComponents) {
    return (
      <div className="bg-white min-h-screen w-full">
        <Navbar />
        <main className="max-w-4xl mx-auto pt-4 pb-10 px-3">
          <h1 className="text-3xl font-bold text-[#2b4377] mt-2 mb-1">Maps</h1>
          <p>Loading map...</p>
        </main>
      </div>
    );
  }

  const { TileLayer, Marker, Polyline, Popup } = leafletComponents;

  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-4 pb-10 px-3">
        <h1 className="text-3xl font-bold text-[#2b4377] mt-2 mb-1">Maps</h1>
        <p className="font-semibold mb-1">
          Dhaka Metro routes are shown below.{" "}
          <a
            href="https://www.google.com/maps/d/viewer?mid=1P5A5N6B1f7rV4my8ykqJ8FQxM3gZk0lA"
            className="underline text-[#2b4377] hover:text-[#e53935]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here
          </a>{" "}
          for an interactive full map of Bangladesh
        </p>
        <div className="w-full rounded-lg overflow-hidden border shadow mt-2" style={{ background: "#eee" }}>
          <div className="w-full" style={{ aspectRatio: "2.2/1" }}>
            {isClient && MapContainer && (
              <MapContainer
                center={[23.7791, 90.3672]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
                attributionControl={false}
                zoomControl={true}
                preferCanvas={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {stationsWithCoords.map(station => (
                  <Marker
                    key={station.id}
                    position={[station.lat, station.lng]}
                    icon={metroIcon}
                  >
                    <Popup>
                      <b>{station.displayName}</b><br />
                      {station.platform}
                    </Popup>
                  </Marker>
                ))}
                <Polyline positions={polylinePoints} color="green" />
              </MapContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}