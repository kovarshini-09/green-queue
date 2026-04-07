import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Clock, Users, Timer, Hash } from "lucide-react";

const PatientAppointments = () => {
  const { currentPatient, getPatientAppointments, appointments } = useApp();
  const navigate = useNavigate();

  if (!currentPatient) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold text-foreground">Please login first</h2>
          <button onClick={() => navigate("/create-account")} className="gradient-primary mt-2 rounded-lg px-6 py-2 text-sm font-medium text-primary-foreground">Create Account</button>
        </div>
      </div>
    );
  }

  const myApts = getPatientAppointments(currentPatient.id).sort((a, b) => {
    if (a.date === b.date) return a.time.localeCompare(b.time);
    return a.date.localeCompare(b.date);
  });

  return (
    <div className="px-4 py-10">
      <div className="container mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-foreground">My Appointments</h1>
        <p className="mb-8 text-muted-foreground">Track your appointments and queue status</p>

        {myApts.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center shadow-card">
            <p className="mb-4 text-muted-foreground">No appointments yet</p>
            <button onClick={() => navigate("/doctors")} className="gradient-primary rounded-lg px-6 py-2 text-sm font-medium text-primary-foreground">Book Now</button>
          </div>
        ) : (
          <div className="space-y-4">
            {myApts.map(apt => {
              const pendingBefore = appointments.filter(
                a => a.doctorId === apt.doctorId && a.date === apt.date && a.status === "pending" && a.tokenNumber < apt.tokenNumber
              );
              const queuePosition = apt.status === "completed" ? 0 : pendingBefore.length + 1;
              const waitingTime = apt.status === "completed" ? 0 : pendingBefore.length * 15;

              return (
                <div key={apt.id} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">{apt.doctorName}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><CalendarDays size={14} /> {apt.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${apt.status === "completed" ? "bg-accent text-accent-foreground" : "bg-warning/10 text-warning"}`}>
                      {apt.status === "completed" ? "✓ Completed" : "⏳ Pending"}
                    </span>
                  </div>

                  {apt.status === "pending" && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-lg bg-accent p-3 text-center">
                        <Users size={16} className="mx-auto mb-1 text-primary" />
                        <p className="text-[10px] text-muted-foreground">Queue</p>
                        <p className="text-xl font-bold text-primary">{queuePosition}</p>
                      </div>
                      <div className="rounded-lg bg-accent p-3 text-center">
                        <Timer size={16} className="mx-auto mb-1 text-primary" />
                        <p className="text-[10px] text-muted-foreground">Wait</p>
                        <p className="text-xl font-bold text-primary">{waitingTime} min</p>
                      </div>
                      <div className="rounded-lg bg-accent p-3 text-center">
                        <Hash size={16} className="mx-auto mb-1 text-primary" />
                        <p className="text-[10px] text-muted-foreground">Token</p>
                        <p className="text-xl font-bold text-primary">{apt.tokenNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
