"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/NavBar";
import Type2Toggle from "@/components/Type2Toggle";
import Type1Selector from "@/components/Type1Selector";
import StationSelector, { Station } from "@/components/StationSelector";
import TravellerSelector from "@/components/TravellerSelector";
import PassengerModal from "@/components/PassengerModal";
import PaymentModal from "@/components/PaymentModal";
import {
  fetchStations,
  calculateFare,
  registerPassenger,
  buyTicket,
  storeTransaction,
} from "@/utils/api";

type TicketState = {
  type2: "OneWay" | "Round" | "MultiCity";
  type1: "Economy" | "Business";
  fromStationId?: number;
  toStationId?: number;
  traveller: { count: number; type: "Adult" | "Child" };
  fare?: number;
  distance?: number;
  departureDate?: string;
  returnDate?: string;
};

const LOCAL_KEY = "ticket_saved_state";

function saveTicketState(state: TicketState) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  }
}

function getTicketState(): TicketState | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(LOCAL_KEY);
    if (data) return JSON.parse(data);
  }
  return null;
}

function clearTicketState() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_KEY);
  }
}

// Dummy auth check
function getLoggedInUser(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("username");
  }
  return null;
}

export default function TicketFarePage() {
  // STATE
  const [type2, setType2] = useState<"OneWay" | "Round" | "MultiCity">("OneWay");
  const [type1, setType1] = useState<"Economy" | "Business">("Economy");
  const [stations, setStations] = useState<Station[]>([]);
  const [fromStationId, setFromStationId] = useState<number | undefined>();
  const [toStationId, setToStationId] = useState<number | undefined>();
  const [traveller, setTraveller] = useState<{ count: number; type: "Adult" | "Child" }>({ count: 1, type: "Adult" });
  const [fare, setFare] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [fareLoading, setFareLoading] = useState<boolean>(false);
  const [showPassengerModal, setShowPassengerModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [ticketResult, setTicketResult] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Bkash");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  // Ref to prevent double modal after login
  const didAutoOpenRef = useRef(false);

  // FETCH STATIONS and USER
  useEffect(() => {
    fetchStations()
      .then(setStations)
      .catch(() => setStations([]));
    setLoggedInUser(getLoggedInUser());
  }, []);

  // RESTORE STATE IF COMING FROM LOGIN
  useEffect(() => {
    // If user is logged in, restore state and auto open modal
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const fromLogin = params.get("from") === "login";
    const user = getLoggedInUser();

    if (user && !didAutoOpenRef.current) {
      const saved = getTicketState();
      if (saved) {
        setType2(saved.type2);
        setType1(saved.type1);
        setFromStationId(saved.fromStationId);
        setToStationId(saved.toStationId);
        setTraveller(saved.traveller);
        setFare(saved.fare || null);
        setDistance(saved.distance || null);
        setDepartureDate(saved.departureDate || "");
        setReturnDate(saved.returnDate || "");
        setShowPassengerModal(true);
        didAutoOpenRef.current = true;
        clearTicketState();
        // Remove ?from=login from URL for cleanliness
        if (fromLogin) {
          params.delete("from");
          const newurl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
          window.history.replaceState({}, "", newurl);
        }
      }
    }
  }, []);

  function handleSwapStations() {
    setFromStationId(toStationId);
    setToStationId(fromStationId);
  }

  async function handleViewFare() {
    if (!fromStationId || !toStationId) return;
    setFareLoading(true);
    setFare(null);
    setDistance(null);
    try {
      const res = await calculateFare(
        fromStationId,
        toStationId,
        traveller.type,
        type2,
        type1
      );
      setFare(res.fare);
      setDistance(res.distance);
    } catch  {
      setFare(null);
      setDistance(null);
    } finally {
      setFareLoading(false);
    }
  }

  function handleViewTicket() {
    // Not logged in: Save state and redirect to login
    if (!loggedInUser) {
      saveTicketState({
        type2,
        type1,
        fromStationId,
        toStationId,
        traveller,
        fare: fare ?? undefined,
        distance: distance ?? undefined,
        departureDate,
        returnDate,
      });
      window.location.href = "/user/login?from=ticket";
      return;
    }
    setShowPassengerModal(true);
  }

  async function handlePassengerSubmit(data: { name: string; address: string }) {
    setShowPassengerModal(false);
    if (!fare || !fromStationId || !toStationId) return;
    try {
      // 1. Register passenger
      const { passengerId } = await registerPassenger(data.name, data.address);

      // 2. Buy ticket
      const departureStation = stations.find((s) => s.stationId === fromStationId)?.name || "";
      const destinationStation = stations.find((s) => s.stationId === toStationId)?.name || "";
      const today = new Date();
      const reservationDate = departureDate;
      const reservationTime = today.toTimeString().slice(0, 8);

      const ticket = await buyTicket(
        type1,
        type2,
        passengerId,
        reservationDate,
        reservationTime,
        fare,
        departureStation,
        destinationStation
      );
      setTicketResult(ticket);

      // 3. Open payment modal
      setShowPaymentModal(true);
    } catch {
      alert("Ticket purchase failed. Please try again.");
    }
  }

  async function handlePaymentComplete() {
    if (!ticketResult) return;
    const today = new Date();
    await storeTransaction({
      amount: fare ?? 0,
      paymentDate: today.toISOString().slice(0, 10),
      paymentMethod1: paymentMethod,
      paymentMethod2: "",
      ticketNumber: ticketResult.ticketNumber,
    });
    setShowPaymentModal(false);
    setPaymentCompleted(true);

    // Show PDF download as before...
    if (ticketResult.ticketPdfBase64) {
      const url = `data:application/pdf;base64,${ticketResult.ticketPdfBase64}`;
      setPdfUrl(url);
      // Immediate download
      const link = document.createElement("a");
      link.href = url;
      link.download = `ticket_${ticketResult.ticketNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <div className="bg-white min-h-screen w-screen m-0 p-0">
      <Navbar />
      <div className="bg-white max-w-xl mx-auto py-8 px-2 min-h-[500px]">
        <Type2Toggle value={type2} onChange={setType2} />
        <Type1Selector value={type1} onChange={setType1} />

        <div className="bg-[#2b4377] rounded-xl p-5 my-5 min-h-[120px] flex flex-col gap-3">
          <StationSelector
            label="Departure"
            icon={<span role="img" aria-label="from">🛫</span>}
            value={fromStationId}
            onChange={setFromStationId}
            options={stations}
          />
          <div className="self-center -mb-2 -mt-2 z-10">
            <button
              onClick={handleSwapStations}
              className="bg-white border-2 border-[#2b4377] rounded-full w-7 h-7 flex items-center justify-center cursor-pointer shadow"
              title="Swap Departure and Destination"
              type="button"
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <path d="M8 17l4-4-4-4" stroke="#2b4377" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 7l-4 4 4 4" stroke="#2b4377" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <StationSelector
            label="Destination"
            icon={<span role="img" aria-label="to">🛬</span>}
            value={toStationId}
            onChange={setToStationId}
            options={stations}
          />

          {/* Date and Traveller Row */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-wrap gap-3">
              <div className="bg-white text-[#2b4377] border-2 border-[#2b4377] rounded-lg px-3 py-1 font-semibold text-sm min-w-[105px] flex items-center gap-2">
                Departure
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="ml-2 border border-gray-400 rounded px-1 py-[2px] text-sm text-[#222] focus:outline-none"
                />
              </div>
              <div className="bg-white text-[#2b4377] border-2 border-[#2b4377] rounded-lg px-4 py-1 font-semibold text-sm flex items-center gap-2">
                Traveller
                <TravellerSelector value={traveller} onChange={setTraveller} />
              </div>
            </div>
            {(type2 === "Round" || type2 === "MultiCity") && (
              <div className="flex gap-3">
                <div className="bg-white text-[#2b4377] border-2 border-[#2b4377] rounded-lg px-3 py-1 font-semibold text-sm min-w-[105px] flex items-center gap-2">
                  Return
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="ml-2 border border-gray-400 rounded px-1 py-[2px] text-sm text-[#222] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-4 mb-3">
          <button
            onClick={handleViewFare}
            className="bg-[#2b4377] text-white rounded-xl font-bold text-base py-2 px-8 min-w-[110px] mr-1 cursor-pointer hover:bg-[#223160] transition"
            disabled={!fromStationId || !toStationId || fareLoading}
            type="button"
          >
            {fareLoading ? "Calculating..." : "VIEW FARE"}
          </button>
          <button
            onClick={handleViewTicket}
            className="bg-[#2b4377] text-white rounded-xl font-bold text-base py-2 px-8 min-w-[110px] ml-1 cursor-pointer hover:bg-[#223160] transition"
            disabled={!fare}
            type="button"
          >
            VIEW TICKET
          </button>
        </div>

        <div className="min-h-[20px] font-semibold text-base text-[#2b4377] text-center">
          {fare !== null && !fareLoading && (
            <>
              Fare (৳): <span className="text-[#e53935]">{fare}</span>
              {distance !== null && (
                <span className="font-normal text-[#444] text-sm ml-3">
                  | Distance: {distance} km
                </span>
              )}
            </>
          )}
        </div>
        {ticketResult && paymentCompleted && (
          <div className="mt-5 bg-green-100 rounded-lg p-3 text-green-700 text-sm font-medium">
            Payment completed! Your ticket is ready for download.
            <br />
            <a
              href={pdfUrl ?? "#"}
              download={pdfUrl ? `ticket_${ticketResult.ticketNumber}.pdf` : undefined}
              className="text-[#e53935] underline mt-1 inline-block text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Ticket PDF
            </a>
          </div>
        )}
        <PassengerModal
          open={showPassengerModal}
          onClose={() => setShowPassengerModal(false)}
          onSubmit={handlePassengerSubmit}
          username={loggedInUser || ""}
        />
        <PaymentModal
          open={showPaymentModal}
          amount={fare}
          paymentDate={new Date().toISOString().slice(0, 10)}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onComplete={handlePaymentComplete}
          onClose={() => setShowPaymentModal(false)}
        />
      </div>

{/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-lg">
          &copy; {new Date().getFullYear()} Developed with ❤️ by Maruf Siddiki Galib. All rights reserved.
          <br />
          <p> Get in touch on{" "}
          
          <a
          
            href="https://www.linkedin.com/in/maruf-siddiki-galib-7360092b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-lg"
        >
           LinkedIn
         </a>
          </p>
        </footer>



    </div>
    
  );
}