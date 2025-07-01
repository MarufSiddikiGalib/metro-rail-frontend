"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/NavBar";
import "leaflet/dist/leaflet.css";

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

// Metro/user icon hooks with dynamic leaflet import
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
function useUserIcon(color: "blue" | "red") {
  const [icon, setIcon] = useState<any>(undefined);
  useEffect(() => {
    if (typeof window === "undefined") return;
    import("leaflet").then(L => {
      setIcon(
        new L.Icon({
          iconUrl: color === "blue" ? "/marker-blue.png" : "/marker-red.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })
      );
    });
  }, [color]);
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

// Map click for picking location
function LocationPicker({ onPick, disabled }: { onPick: (lat: number, lng: number) => void; disabled: boolean }) {
  // Import useMapEvents here to avoid SSR issues and always call the hook
  const { useMapEvents } = require("react-leaflet");
  useMapEvents({
    click: (e: any) => {
      if (!disabled) onPick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

// Haversine (km) calculate km distance between two lat/lng points
function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function JourneyPlannerPage() {
  const [isClient, setIsClient] = useState(false);
  const [stations, setStations] = useState<any[]>([]);
  const [from, setFrom] = useState<{ lat: number; lng: number } | null>(null);
  const [to, setTo] = useState<{ lat: number; lng: number } | null>(null);
  const [pickMode, setPickMode] = useState<"from" | "to" | null>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const metroIcon = useMetroIcon();
  const userIconBlue = useUserIcon("blue");
  const userIconRed = useUserIcon("red");

  // Dynamically import react-leaflet components
  const [leafletComponents, setLeafletComponents] = useState<any | null>(null);
  useEffect(() => {
    setIsClient(true);
    fetch("http://localhost:8000/api/stations")
      .then(res => res.json())
      .then(setStations)
      .catch(() => setStations([]));
    Promise.all([
      import("react-leaflet").then(mod => ({
        TileLayer: mod.TileLayer,
        Marker: mod.Marker,
        Polyline: mod.Polyline,
        Popup: mod.Popup,
      }))
    ]).then(([rl]) => setLeafletComponents(rl));
  }, []);

  // Map backend stations to coordinates (using your mapping)
  const stationsWithCoords = stations
    .map(([id, name, displayName, platform]: any) => {
      const coords = stationCoords[name];
      if (coords) return { id, name, lat: coords.lat, lng: coords.lng, displayName, platform };
      return null;
    })
    .filter(Boolean);

  // Ordered stations for polyline etc
  const orderedStations = orderedNames
    .map(name => {
      const s = stationsWithCoords.find(s => s && s.name === name);
      return s ? s : null;
    })
    .filter((s): s is {
      id: number;
      name: string;
      lat: number;
      lng: number;
      displayName: string;
      platform: string;
    } => s !== null);
  const polylinePoints = orderedStations.map(s => [s.lat, s.lng] as [number, number]);

  // Find nearest station to a point
  function findNearestStation(lat: number, lng: number) {
    if (!orderedStations.length) return null;
    let minDist = Infinity;
    let nearest = orderedStations[0];
    for (const st of orderedStations) {
      const d = haversine(lat, lng, st.lat, st.lng);
      if (d < minDist) {
        minDist = d;
        nearest = st;
      }
    }
    return { ...nearest, distance: minDist };
  }

  // Plan journey
  function planJourney() {
    if (!from || !to || !orderedStations.length) return;
    const fromStation = findNearestStation(from.lat, from.lng);
    const toStation = findNearestStation(to.lat, to.lng);

    if (!fromStation || !toStation) {
      alert("Could not find nearest stations.");
      return;
    }

    // Step 1: walk/ride to nearest station
    const step1 = {
      type: "walk",
      from: "Your location",
      to: fromStation.name + " Metro Station",
      distance: fromStation.distance,
      walkingTime: Math.round((fromStation.distance / 5) * 60), // walking 5km/h
    };
    // Step 2: metro journey
    const idxFrom = orderedStations.findIndex((s) => s.name === fromStation.name);
    const idxTo = orderedStations.findIndex((s) => s.name === toStation.name);
    let stationList: string[] = [];
    if (idxFrom !== -1 && idxTo !== -1) {
      if (idxFrom < idxTo) {
        stationList = orderedStations.slice(idxFrom, idxTo + 1).map((s) => s.name);
      } else {
        stationList = orderedStations.slice(idxTo, idxFrom + 1).map((s) => s.name).reverse();
      }
    }
    const stops = Math.abs(idxTo - idxFrom);
    const fare = 20 + stops * 2; // Mock: base 20 + 2 per stop
    const duration = stops * 2.5; // Mock: 2.5 min per stop
    const step2 = {
      type: "metro",
      from: fromStation.name + " Metro Station",
      to: toStation.name + " Metro Station",
      stops,
      fare,
      duration,
      stations: stationList,
    };
    // Step 3: walk/ride to destination
    const step3 = {
      type: "walk",
      from: toStation.name + " Metro Station",
      to: "Your destination",
      distance: toStation.distance,
      walkingTime: Math.round((toStation.distance / 5) * 60), // walking 5km/h
    };
    setSteps([step1, step2, step3]);
  }

  // Reset everything
  function resetAll() {
    setFrom(null);
    setTo(null);
    setSteps([]);
    setPickMode(null);
  }

  if (!leafletComponents) {
    return (
      <div className="bg-white min-h-screen w-full">
        <Navbar />
        <main className="max-w-4xl mx-auto pt-4 pb-10 px-3">
          <h1 className="text-3xl font-bold text-[#2b4377] mt-2 mb-4">Journey Planner</h1>
          <div>Loading map...</div>
        </main>
      </div>
    );
  }

  const { TileLayer, Marker, Polyline, Popup } = leafletComponents;

  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-4 pb-10 px-3">
        <h1 className="text-3xl font-bold text-[#2b4377] mt-2 mb-4">Journey Planner</h1>
        <div className="mb-3">
          <p>
            <b>Select your journey:</b> Click the <span className="text-blue-700">From</span> and <span className="text-red-700">To</span> buttons, then click on the map to set your start and end locations anywhere in Dhaka.<br/>
            <span className="text-gray-500 text-sm">Metro icons show station locations. Metro route shown in green.</span>
          </p>
        </div>
        <div className="flex gap-2 mb-2">
          <button
            className={`px-4 py-2 rounded font-semibold ${pickMode === "from" ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-700"}`}
            onClick={() => setPickMode(pickMode === "from" ? null : "from")}
          >
            {from ? "Change Origin" : "Pick Origin"}
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${pickMode === "to" ? "bg-red-700 text-white" : "bg-red-100 text-red-700"}`}
            onClick={() => setPickMode(pickMode === "to" ? null : "to")}
          >
            {to ? "Change Destination" : "Pick Destination"}
          </button>
          <button
            className="px-4 py-2 rounded font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={resetAll}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 rounded font-semibold bg-[#2b4377] text-white hover:bg-[#e53935]"
            onClick={planJourney}
            disabled={!from || !to}
          >
            Plan Journey
          </button>
        </div>
        <div className="w-full rounded-lg overflow-hidden border shadow" style={{ background: "#eee" }}>
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
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {orderedStations.map(station => (
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
                {from && (
                  <Marker position={[from.lat, from.lng]} icon={userIconBlue}>
                    <Popup>From: Your selected location</Popup>
                  </Marker>
                )}
                {to && (
                  <Marker position={[to.lat, to.lng]} icon={userIconRed}>
                    <Popup>To: Your selected location</Popup>
                  </Marker>
                )}
                {polylinePoints.length > 1 && (
                  <Polyline positions={polylinePoints} color="green" />
                )}
                {pickMode && (
                  <LocationPicker
                    onPick={(lat, lng) => {
                      if (pickMode === "from") setFrom({ lat, lng });
                      if (pickMode === "to") setTo({ lat, lng });
                      setPickMode(null);
                    }}
                    disabled={false}
                  />
                )}
              </MapContainer>
            )}
          </div>
        </div>
        {steps.length > 0 && (
          <div className="bg-[#f3f3f3] p-4 rounded space-y-4 mt-6">
            <h2 className="font-semibold text-lg mb-2">Your Journey</h2>
            {/* Step 1: Walk/ride to station */}
            <div>
              <div className="font-semibold mb-1">Step 1: <span className="text-[#2b4377]">Walk/Ride</span></div>
              <div>From: <b>{steps[0].from}</b></div>
              <div>To: <b>{steps[0].to}</b></div>
              <div>
                Distance: {steps[0].distance.toFixed(2)} km, walking time: {steps[0].walkingTime} min
              </div>
            </div>
            {/* Step 2: Metro */}
            <div>
              <div className="font-semibold mb-1">Step 2: <span className="text-[#2b4377]">Metro</span></div>
              <div>
                From: <b>{steps[1].from}</b>
                <br />
                To: <b>{steps[1].to}</b>
              </div>
              <div>
                Fare: <b>৳{steps[1].fare}</b>
                <br />
                Duration: <b>{steps[1].duration} min</b> &nbsp;|&nbsp; Stops: <b>{steps[1].stops}</b>
                <br />
                Stations: {steps[1].stations.join(" → ")}
              </div>
            </div>
            {/* Step 3: Walk/ride to destination */}
            <div>
              <div className="font-semibold mb-1">Step 3: <span className="text-[#2b4377]">Walk/Ride</span></div>
              <div>From: <b>{steps[2].from}</b></div>
              <div>To: <b>{steps[2].to}</b></div>
              <div>
                Distance: {steps[2].distance.toFixed(2)} km, walking time: {steps[2].walkingTime} min
              </div>
            </div>
          </div>
        )}
        <div className="mt-10">
          <div className="text-sm text-gray-500">
            show a step-by-step journey using the nearest metro stations.
          </div>
        </div>
      </main>
    </div>
  );
}