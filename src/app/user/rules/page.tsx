"use client";
import Navbar from "@/components/NavBar";

export default function RulesPage() {
  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />
      <main className="max-w-2xl mx-auto pt-4 pb-10 px-4">
        <h1 className="text-3xl font-bold text-[#2b4377] mt-2 mb-6">Metro Rail Rules</h1>
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[#039803] mb-3">What to do</h2>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li>Stand in line even if you have an MRT pass</li>
            <li>Let others get off before you board</li>
            <li>Be mindful of the gap between the platform and the metro rail coach</li>
            <li>Stand behind the yellow line on the platform for your safety</li>
            <li>Give priority to people with special needs while using lifts</li>
            <li>Leave designated seats for the elderly and for those with special needs</li>
            <li>Stand on the left side of escalators</li>
            <li>Refer to the metro rail map to choose your destination</li>
            <li>Stay away from the yellow tactile paving built for the visually impaired</li>
            <li>Cleanliness should always be maintained</li>
            <li>Speak in a low voice</li>
            <li>Cooperate with security personnel</li>
            <li>Always carry your MRT pass</li>
            <li>Pay attention to announcements</li>
            <li>Take notice of the guidance signs and displays inside the train for important travel information</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[#e53935] mb-3">What not to do</h2>
          <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
            <li>Do not smoke on the station premises</li>
            <li>Do not rush or jostle with other passengers while boarding or getting off trains</li>
            <li>Do not jump over the entry and exit gates on the second floor of the station</li>
            <li>Do not use mobile phones while boarding or getting off trains</li>
            <li>Do not obstruct train doors</li>
            <li>Do not lean on the coach door</li>
            <li>Do not leave mobile phone speakers switched on</li>
            <li>Do not occupy multiple seats</li>
            <li>Do not cause inconvenience to other passengers</li>
            <li>Do not open the driver's cab door</li>
            <li>Do not stand in the path between two coaches</li>
            <li>Do not eat or drink inside the train</li>
            <li>Do not spit, except in designated areas</li>
            <li>Do not attach posters, banners and graffiti in the metro rail area</li>
            <li>Do not stick your head over the platform screen door to get a view of the metro rail</li>
          </ul>
        </section>
      </main>
    </div>
  );
}