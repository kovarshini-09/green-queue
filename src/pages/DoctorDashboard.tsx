import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { CalendarDays, CheckCircle2, IndianRupee, Clock } from "lucide-react";
import doctor1 from "@/assets/doctor1.jpg";
import doctor2 from "@/assets/doctor2.jpg";
import doctor3 from "@/assets/doctor3.jpg";
import doctor4 from "@/assets/doctor4.jpg";
import doctor5 from "@/assets/doctor5.jpg";
import doctor6 from "@/assets/doctor6.jpg";

const doctorImages: Record<string, string> = {
  d1: doctor1, d2: doctor2, d3: doctor3, d4: doctor4, d5: doctor5, d6: doctor6,
};

const DoctorDashboard = () => {
  const { currentDoctor, getDoctorAppointments, getDoctorStats, updateAppointmentStatus } = useApp();
  const navigate = useNavigate();

  if (!currentDoctor) {
    navigate("/doctor-login");
    return null;
  }

  const stats = getDoctorStats(currentDoctor.id);
  const apts = getDoctorAppointments(currentDoctor.id).sort((a, b) => {
    if (a.status !== b.status) return a.status === "pending" ? -1 : 1;
    if (a.date === b.date) return a.time.localeCompare(b.time);
    return a.date.localeCompare(b.date);
  });

  const cards = [
    { icon: CalendarDays, label: "Total Appointments", value: stats.total, color: "text-info" },
    { icon: CheckCircle2, label: "Completed", value: stats.completed, color: "text-primary" },
    { icon: IndianRupee, label: "Earnings", value: `₹${stats.earnings}`, color: "text-warning" },
  ];

  return (
    <div className="px-4 py-10">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <img
            src={doctorImages[currentDoctor.id]}
            alt={currentDoctor.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome, {currentDoctor.name}</h1>
            <p className="text-muted-foreground">{currentDoctor.specialty}</p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {cards.map((c, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="mb-2 flex items-center gap-2">
                <c.icon size={20} className={c.color} />
                <span className="text-sm text-muted-foreground">{c.label}</span>
              </div>
              <p className="text-3xl font-bold text-card-foreground">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Appointments table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-card-foreground">All Appointments</h2>
          </div>

          {apts.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">No appointments yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Token</th>
                    <th className="px-6 py-3 font-medium">Patient</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Time</th>
                    <th className="px-6 py-3 font-medium">Fee</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {apts.map(apt => (
                    <tr key={apt.id} className="border-b border-border last:border-0">
                      <td className="px-6 py-4 text-sm font-bold text-primary">#{apt.tokenNumber}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{apt.patientName}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{apt.date}</td>
                      <td className="flex items-center gap-1 px-6 py-4 text-sm text-muted-foreground"><Clock size={14} /> {apt.time}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">₹{apt.fee}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${apt.status === "completed" ? "bg-accent text-accent-foreground" : "bg-warning/10 text-warning"}`}>
                          {apt.status === "completed" ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {apt.status === "pending" ? (
                          <button onClick={() => updateAppointmentStatus(apt.id, "completed")}
                            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:opacity-90">
                            Mark Complete
                          </button>
                        ) : (
                          <button onClick={() => updateAppointmentStatus(apt.id, "pending")}
                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-muted">
                            Revert
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
