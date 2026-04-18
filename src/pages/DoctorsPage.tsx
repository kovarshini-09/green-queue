import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Star, RefreshCw } from "lucide-react";

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
  d1: doctor1, // Dr. Sarah Johnson (female)
  d2: doctor2, // Dr. James Patel (male)
  d3: doctor3, // Dr. Meera Singh (female)
  d4: doctor4, // Dr. Arjun Rao (male)
  d5: doctor5, // Dr. Nisha Kapoor (female)
  d6: doctor6, // Dr. Ravi Singh (male)
  d7: doctor7, // Dr. Vikram Gupta (male)
  d8: doctor8, // Dr. Priya Sharma (female)
  d9: doctor9, // Dr. Anjali Verma (female)
  d10: doctor4, // Dr. Karan Mehta (male) - reusing male image
  d11: doctor5, // Dr. Sneha Agarwal (female) - reusing female image
  d12: doctor6, // Dr. Rohan Jain (male) - reusing male image
};

const DoctorsPage = () => {
  const { doctors, refreshData } = useApp();

  const handleRefresh = async () => {
    await refreshData();
  };

  return (
    <div className="px-4 py-10">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Our Doctors
            </h1>
            <p className="text-muted-foreground">
              Choose a doctor and book your appointment with real-time queue tracking
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Refresh data from database"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

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