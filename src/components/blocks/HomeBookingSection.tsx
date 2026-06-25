import React from "react";
import BookingForm from "@/components/forms/BookingForm";

export default function HomeBookingSection() {
  return (
    <section className="relative py-20 px-4 md:px-8 bg-slate-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-pink-100/50 rounded-full mix-blend-multiply filter blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Skip the Waiting Room
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Book your diagnostic tests and scans in less than 60 seconds. Our experts will confirm your slot instantly via WhatsApp.
          </p>
        </div>

        {/* Render the Premium Booking Form */}
        <div className="w-full">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}