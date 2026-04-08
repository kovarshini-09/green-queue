import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Star } from "lucide-react";

import doctor1 from "@/assets/doctor1.jpg";
import doctor2 from "@/assets/doctor2.jpg";
import doctor3 from "@/assets/doctor3.jpg";
import doctor4 from "@/assets/doctor4.jpg";
import doctor5 from "@/assets/doctor5.jpg";
import doctor6 from "@/assets/doctor6.jpg";
import doctor7 from "@/assets/doctor7.jpg";
import doctor8 from "@/assets/doctor8.jpg";
import doctor9 from "@/assets/doctor9.jpg";

const doctorImages: Record<string, string> = {
  d1: doctor1,
  d2: doctor2,
  d3: doctor3,
  d4: doctor4,
  d5: doctor5,
  d6: doctor6,
  d7: doctor7,
  d8: doctor8,
  d9: doctor9,
};

const DoctorsPage = () => {
  const { doctors } = useApp();

  return (
    <div className="px-4 py-10">
      <div className="container mx-auto">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Our Doctors
        </h1>

        <p className="mb-8 text-muted-foreground">
          Choose a doctor and book your appointment with real-time queue tracking
        </p>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] cursor-pointer"
           >
              {/* PROFILE */}
              <div className="mb-4 flex items-center gap-4">
                <img
                  src={doctorImages[doc.id] || doctor1}
                  alt={doc.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {doc.specialty}
                  </p>
                </div>
              </div>

              {/* RATING + FEE */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-warning">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-medium">4.8</span>
                </div>

                <span className="text-lg font-bold text-primary">
                  ₹{doc.fee}
                </span>
              </div>

              {/* BUTTON */}
              <Link
                to={`/book/${doc.id}`}
                className="gradient-primary block rounded-lg py-2.5 text-center text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;