import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Star } from "lucide-react";

const DoctorsPage = () => {
  const { doctors } = useApp();

  return (
    <div className="px-4 py-10">
      <div className="container mx-auto">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Our Doctors</h1>
        <p className="mb-8 text-muted-foreground">Choose a doctor and book your appointment with real-time queue tracking</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map(doc => (
            <div key={doc.id} className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl">
                  {doc.image}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                </div>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-warning">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
                <span className="text-lg font-bold text-primary">₹{doc.fee}</span>
              </div>
              <Link to={`/book/${doc.id}`} className="gradient-primary block rounded-lg py-2.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
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
