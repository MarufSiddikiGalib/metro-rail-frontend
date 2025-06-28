"use client";
import Navbar from "@/components/NavBar";

export default function ContactPage() {

    return (
        <div className="bg-white min-h-screen w-full">  
            <Navbar />
            <main className="max-w-2xl mx-auto pt-4 pb-10 px-4">
                <h1 className="text-3xl font-bold text-[#2b4377] mt-2 mb-6">Contact Us</h1>
                <section className="mb-10">
                    <h2 className="text-xl font-semibold text-[#039803] mb-3">For General Inquiries</h2>
                    <p className="text-base leading-relaxed mb-4">
                        If you have any questions or need assistance, please contact us at:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                        <li>Email: ADMS@gmail.com </li>
                        <li>Phone: +8801700000000</li>
                        <li>Address: American International University, Dhaka, Bangladesh</li>
                    </ul>
                </section>
           </main>
             </div>               
);
}