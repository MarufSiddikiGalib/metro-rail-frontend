"use client";
import Navbar from "@/components/NavBar";

export default function TimetablePage() {
  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />
      <main className="max-w-2xl mx-auto pt-4 pb-10 px-4">
        <h1 className="text-3xl font-bold text-[#2b4377] mt-2 mb-4">Timetable</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#e53935] mb-2">Timetable - Friday</h2>
          <ul className="mb-2">
            <li><b>Uttara North to Motijheel</b><br />From 03.00pm to 09.00 every 10 minute</li>
            <li className="mt-2"><b>Motijheel to Uttara North</b><br />From 03.20pm to 09.40pm every 10 minute</li>
          </ul>
          <div className="text-[#2b4377] font-medium mb-2">
            Live (next) train time
          </div>
          <div>Metro has not started yet. Today's first train time is shown.</div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#2b4377] mb-2">Full timetable</h2>
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-1">Sunday to Thursday</h3>
            <ul className="mb-2">
              <li><b>Uttara North to Motijheel</b></li>
              <li>From 7.10am to 7:30am every 10 minute</li>
              <li>From 7:31am to 11.36am every 8 minute</li>
              <li>From 11.37am to 02.36pm every 10 minute</li>
              <li>From 02.37pm to 08.20pm every 8 minute</li>
              <li>From 08.21pm to 9:00pm every 10 minute</li>
            </ul>
            <ul className="mb-2">
              <li><b>Motijheel to Uttara North</b></li>
              <li>From 07.30am to 08.00pm every 10 minute</li>
              <li>From 08.01am to 12.16pm every 8 minute</li>
              <li>From 12.17pm to 03.15pm every 10 minute</li>
              <li>From 03.16pm to 09.00pm every 8 minute</li>
              <li>From 09:01pm to 09:40pm every 10 minute</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-1">Saturday</h3>
            <ul className="mb-2">
              <li><b>Uttara North to Motijheel</b></li>
              <li>From 07.10am to 10.32am every 12 minute</li>
              <li>From 10.33am to 09.00pm every 10 minute</li>
            </ul>
            <ul className="mb-2">
              <li><b>Motijheel to Uttara North</b></li>
              <li>From 07.30am to 11.12am every 12 minute</li>
              <li>From 11.13am to 09.40pm every 10 minute</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Friday</h3>
            <ul>
              <li><b>Uttara North to Motijheel</b></li>
              <li>From 03.00pm to 09.00 every 10 minute</li>
            </ul>
            <ul>
              <li><b>Motijheel to Uttara North</b></li>
              <li>From 03.20pm to 09.40pm every 10 minute</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}



// "use client";
// import Navbar from "@/components/NavBar";

// export default function TimetablePage() {
//   return (
//     <div className="bg-white min-h-screen w-full">
//       <Navbar />
//       <main className="max-w-2xl mx-auto pt-4 pb-10 px-4">
//         <h1 className="text-3xl font-bold text-[#2b4377] mt-2 mb-4">Timetable</h1>
//         {/* Friday Section */}
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold text-[#e53935] mb-2">Timetable - Friday</h2>
//           <div className="mb-4 overflow-x-auto">
//             <table className="min-w-[320px] w-full border-collapse text-sm">
//               <thead>
//                 <tr className="bg-[#f3f3f3]">
//                   <th className="py-2 px-3 border font-semibold text-left">Direction</th>
//                   <th className="py-2 px-3 border font-semibold text-left">Time Period</th>
//                   <th className="py-2 px-3 border font-semibold text-left">Interval</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="py-2 px-3 border">Uttara North to Motijheel</td>
//                   <td className="py-2 px-3 border">03.00pm - 09.00pm</td>
//                   <td className="py-2 px-3 border">Every 10 min</td>
//                 </tr>
//                 <tr>
//                   <td className="py-2 px-3 border">Motijheel to Uttara North</td>
//                   <td className="py-2 px-3 border">03.20pm - 09.40pm</td>
//                   <td className="py-2 px-3 border">Every 10 min</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className="text-[#2b4377] font-medium mb-1">
//             Live (next) train time
//           </div>
//           <div>Metro has not started yet. Today's first train time is shown.</div>
//         </section>
//         {/* Full Timetable Section */}
//         <section>
//           <h2 className="text-xl font-semibold text-[#2b4377] mb-2">Full timetable</h2>
//           {/* Sunday to Thursday */}
//           <div className="mb-6">
//             <h3 className="font-semibold text-lg mb-1">Sunday to Thursday</h3>
//             <div className="overflow-x-auto mb-3">
//               <table className="min-w-[320px] w-full border-collapse text-sm">
//                 <thead>
//                   <tr className="bg-[#f3f3f3]">
//                     <th className="py-2 px-3 border font-semibold text-left">Direction</th>
//                     <th className="py-2 px-3 border font-semibold text-left">Time Period</th>
//                     <th className="py-2 px-3 border font-semibold text-left">Interval</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="py-2 px-3 border" rowSpan={5}>Uttara North to Motijheel</td>
//                     <td className="py-2 px-3 border">7:10am - 7:30am</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">7:31am - 11:36am</td>
//                     <td className="py-2 px-3 border">Every 8 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">11:37am - 02:36pm</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">02:37pm - 08:20pm</td>
//                     <td className="py-2 px-3 border">Every 8 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">08:21pm - 9:00pm</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border" rowSpan={5}>Motijheel to Uttara North</td>
//                     <td className="py-2 px-3 border">07:30am - 08:00am</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">08:01am - 12:16pm</td>
//                     <td className="py-2 px-3 border">Every 8 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">12:17pm - 03:15pm</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">03:16pm - 09:00pm</td>
//                     <td className="py-2 px-3 border">Every 8 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">09:01pm - 09:40pm</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           {/* Saturday */}
//           <div className="mb-6">
//             <h3 className="font-semibold text-lg mb-1">Saturday</h3>
//             <div className="overflow-x-auto mb-3">
//               <table className="min-w-[320px] w-full border-collapse text-sm">
//                 <thead>
//                   <tr className="bg-[#f3f3f3]">
//                     <th className="py-2 px-3 border font-semibold text-left">Direction</th>
//                     <th className="py-2 px-3 border font-semibold text-left">Time Period</th>
//                     <th className="py-2 px-3 border font-semibold text-left">Interval</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="py-2 px-3 border" rowSpan={2}>Uttara North to Motijheel</td>
//                     <td className="py-2 px-3 border">07:10am - 10:32am</td>
//                     <td className="py-2 px-3 border">Every 12 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">10:33am - 09:00pm</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border" rowSpan={2}>Motijheel to Uttara North</td>
//                     <td className="py-2 px-3 border">07:30am - 11:12am</td>
//                     <td className="py-2 px-3 border">Every 12 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">11:13am - 09:40pm</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           {/* Friday (Full Timetable) */}
//           <div>
//             <h3 className="font-semibold text-lg mb-1">Friday</h3>
//             <div className="overflow-x-auto mb-3">
//               <table className="min-w-[320px] w-full border-collapse text-sm">
//                 <thead>
//                   <tr className="bg-[#f3f3f3]">
//                     <th className="py-2 px-3 border font-semibold text-left">Direction</th>
//                     <th className="py-2 px-3 border font-semibold text-left">Time Period</th>
//                     <th className="py-2 px-3 border font-semibold text-left">Interval</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="py-2 px-3 border">Uttara North to Motijheel</td>
//                     <td className="py-2 px-3 border">03.00pm - 09.00pm</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                   <tr>
//                     <td className="py-2 px-3 border">Motijheel to Uttara North</td>
//                     <td className="py-2 px-3 border">03.20pm - 09.40pm</td>
//                     <td className="py-2 px-3 border">Every 10 min</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }