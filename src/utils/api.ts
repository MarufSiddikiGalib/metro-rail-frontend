import { Station } from "../components/StationSelector";


export async function fetchStations(): Promise<Station[]> {
    const res = await fetch('http://localhost:8000/api/stations');
    if (!res.ok) throw new Error('Failed to fetch stations');
    const rawStations = await res.json(); // Array of arrays
  
    // Convert array of arrays to array of objects
    return rawStations.map((arr: any[]) => ({
      stationId: arr[0],
      name: arr[1], // or arr[2] if you want the short name
    }));
  }

export async function calculateFare(
  fromStationId: number,
  toStationId: number,
  travellerType: string,
  ticketType1: string,
  ticketType2: string
): Promise<{ fare: number; distance: number }> {
  const res = await fetch('http://localhost:8000/api/fare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fromStationId,
      toStationId,
      travellerType,
      ticketType1,
      ticketType2
    })
  });
  if (!res.ok) throw new Error('Fare calculation failed');
  return await res.json();
}

export async function registerPassenger(
  name: string,
  address: string
): Promise<{ passengerId: number }> {
  const res = await fetch('http://localhost:8000/api/passenger-registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, address })
  });
  if (!res.ok) throw new Error('Passenger registration failed');
  return await res.json();
}

export async function buyTicket(
  type1: string,
  type2: string,
  passengerId: number,
  reservationDate: string,
  reservationTime: string,
  fare: number,
  departureStation: string,
  destinationStation: string
): Promise<any> {
  const res = await fetch('http://localhost:8000/api/ticket/buy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type1,
      type2,
      passengerId,
      reservationDate,
      reservationTime,
      fare,
      departureStation,
      destinationStation
    })
  });
  if (!res.ok) throw new Error('Ticket purchase failed');
  return await res.json();
}


export async function storeTransaction({
  amount,
  paymentDate,
  paymentMethod1,
  paymentMethod2,
  ticketNumber,
}: {
  amount: number;
  paymentDate: string;
  paymentMethod1: string;
  paymentMethod2?: string;
  ticketNumber: number;
}) {
  const res = await fetch("http://localhost:8000/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      paymentDate,
      paymentMethod1,
      paymentMethod2: paymentMethod2 || "",
      ticketNumber,
    }),
  });
  if (!res.ok) throw new Error("Failed to store transaction");
  return await res.json();
}