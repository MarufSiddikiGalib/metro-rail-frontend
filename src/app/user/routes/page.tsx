"use client";
import Link from "next/link";
import Navbar from "@/components/NavBar";

export default function RoutesPage() {
  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />
      <main className="max-w-3xl mx-auto pt-4 pb-10 px-4">
      <h1 className="text-3xl font-bold text-[#2b4377] mt-2 mb-4">Routes</h1>
        {/* Intro with map button */}
        <section className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <p className="mb-2 text-base">
              Five lines have been planned for Dhaka Metro Mass Rapid Transit (MRT) system. An overview of these lines is provided below. MRT Line-6 has been constructed and the first phase of this line became operational from December 2022. 
              <br />
              <b >A map showing this line is available here.</b>
              <br />
              
              <span className="inline-block md:float-left mt-3 md:mt-0 ml-0 md:ml-4">
              
                <Link href="/user/maps">
                  <button
                    className="px-4 py-2 bg-[#2b4377] hover:bg-[#e53935] text-white rounded transition"
                    title="View Interactive Map"
                  >
                    🗺️ Click / tap for a bigger interactive map
                  </button>
                </Link>
              </span>
              
              
              
            </p>
          </div>
        </section>

        {/* MRT Line-6 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#2b4377] mb-2">Details of MRT Line-6</h2>
          <p className="mb-2">
            MRT Line-6 is a 20km-long line extending from Uttara in the north to Motijheel in the south. The line runs parallel to the Turag River in the west of Dhaka and curves as it moves south-east following the path of the Buriganga River.
          </p>
          <p className="mb-2">
            The line is a standard gauge track, including a total of 16 elevated stations crossing busy areas such as Pallabi and Mirpur. The travel time from north to south Dhaka will be approximately 35 minutes.
          </p>
          <p className="mb-2">
            <b>Bijoy Sarani, Kawran Bazar, Shahbag and Dhaka University stations are not open yet.</b> They will be operational in phases by Feb/March 2024.
          </p>
        </section>

        {/* MRT Line-1 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#2b4377] mb-2">Details of MRT Line-1</h2>
          <p className="mb-2">
            MRT Line-1 will be 30.6km long, including an 18.8km underground section and an 11.8km viaduct section that will cover 19 stations. The physical work of MRT Line-1 began in February 2023. The MRT Line-1, which will be Bangladesh’s first underground metro rail, is expected to be completed in 2026. The line comprises two routes, the Airport Line and the Purbachal Line.
          </p>
          <h3 className="font-semibold text-[#2b4377] mt-4 mb-1">Line 1 Airport</h3>
          <p className="mb-2">
            The Airport line will connect the Kamalapur station with the Dhaka International Airport. It will include 12 stations, running through an underground tunnel starting from Kamalapur, Rampura DIT, and Pragati Sharani Road, crossing the Kuril flyover, and continuing under the New Airport Road to the airport. The expected travel time on the route is 24 minutes and 40 seconds.
          </p>
          <h3 className="font-semibold text-[#2b4377] mt-4 mb-1">Line 1 Purbachal</h3>
          <p className="mb-2">
            The Airport Line will branch out to the Purbachal Line at the Notun Bazar station, which will include seven stations. It will include underground and elevated sections and run from Kamalapur to Purbachal New Town, the biggest planned township in the country. The expected travel time on the route is 36 minutes and ten seconds.
          </p>
        </section>

        {/* MRT Line-2 and Line-4 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#2b4377] mb-2">Details of MRT Line-2</h2>
          <p className="mb-2">
            MRT Line 2 will be 24 km long from Gabtoli to Chittagong Road with a total of 24 stations, while MRT Line-4 is planned to connect Kamalapur Railway Station with Narayanganj, a distance of 16 km with underground lines.
          </p>
        </section>

        {/* MRT Line-5 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#2b4377] mb-2">Details of MRT Line-5</h2>
          <p className="mb-2">
            The Line-5 will connect with MRT Line-6 at Mirpur and Line-1 at Notun Bazar. The expected travel time on the route is 30 minutes and 30 seconds. The MRT Line 5 will have two routes: northern and southern.
          </p>
          <h3 className="font-semibold text-[#2b4377] mt-4 mb-1">Line 5 Northern</h3>
          <p className="mb-2">
            MRT Line-5 northern route will be 20km long, extending from Hemayetpur to Vatara. It will include a 13.5km underground stretch to cover high-density areas from Gabtoli to Notun Bazar.
          </p>
          <h3 className="font-semibold text-[#2b4377] mt-4 mb-1">Line 5 Southern</h3>
          <p className="mb-2">
            The southern route of Line 5 will include a 6.5km viaduct running between Hemayetpur and Amin Bazar and from Notun Bazar to Vatara. It will also include an underground route running from Gabtoli through Adabor, Mohammadpur, Kalabagan, Karwan Bazar, Hatirjheel, and South Badda to Aftab Nagar. It will cover 14 stations, including Gabtoli, Dar-us-salam, Mirpur1, Mirpur10, Mirpur14, Kochunkhet, Banani, Gulshan2 and Notun Bazar.
          </p>
        </section>
      </main>
    </div>
  );
}