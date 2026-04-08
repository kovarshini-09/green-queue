import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import { CalendarDays, Clock, Users, Timer, Hash } from "lucide-react";
import doctor1 from "@/assets/doctor1.jpg";
import doctor2 from "@/assets/doctor2.jpg";
import doctor3 from "@/assets/doctor3.jpg";
import doctor4 from "@/assets/doctor4.jpg";
import doctor5 from "@/assets/doctor5.jpg";
import doctor6 from "@/assets/doctor6.jpg";

const doctorImages: Record<string, string> = {
  d1: doctor1, d2: doctor2, d3: doctor3, d4: doctor4, d5: doctor5, d6: doctor6,
};

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { doctors, currentPatient, bookAppointment, getQueueInfo, appointments } = useApp();
  const doctor = doctors.find(d => d.id === doctorId || d._id === doctorId);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [booked, setBooked] = useState<{ position: number; waitingTime: number; token: number } | null>(null);

  if (!doctor) return <div className="p-10 text-center text-muted-foreground">Doctor not found</div>;

  if (!currentPatient) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">Please create an account first</h2>
          <p className="mb-4 text-muted-foreground">You need to be logged in to book an appointment</p>
          <button onClick={() => navigate("/create-account")} className="gradient-primary rounded-lg px-6 py-2.5 font-medium text-primary-foreground">Create Account</button>
        </div>
      </div>
    );
  }

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const patientId = currentPatient.id || currentPatient._id;

  const isSlotBooked = (time: string) => {
    return appointments.some(
      a => a.doctorId === doctor.id && a.date === selectedDate && a.time === time && a.patientId === patientId
    );
  };

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return;
    const queueInfo = getQueueInfo(doctor.id, selectedDate, selectedTime);
    bookAppointment({
      patientId: patientId,
      patientName: currentPatient.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: selectedDate,
      time: selectedTime,
      fee: doctor.fee,
      type: "doctor",
    });
    setBooked(queueInfo);
  };

  if (booked) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-card">
          <div className="mb-4 text-5xl">✅</div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Appointment Booked!</h2>
          <p className="mb-6 text-muted-foreground">Your appointment with {doctor.name} is confirmed</p>
          <div className="mb-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-accent p-4">
              <Users size={20} className="mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Queue Position</p>
              <p className="text-2xl font-bold text-primary">{booked.position}</p>
            </div>
            <div className="rounded-lg bg-accent p-4">
              <Timer size={20} className="mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Waiting Time</p>
              <p className="text-2xl font-bold text-primary">{booked.waitingTime === 0 ? "0" : booked.waitingTime} min</p>
            </div>
            <div className="rounded-lg bg-accent p-4">
              <Hash size={20} className="mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Token No.</p>
              <p className="text-2xl font-bold text-primary">{booked.token}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/my-appointments")} className="gradient-primary flex-1 rounded-lg py-2.5 text-sm font-semibold text-primary-foreground">My Appointments</button>
            <button onClick={() => navigate("/doctors")} className="flex-1 rounded-lg border border-border py-2.5 text-sm font-semibold text-foreground">Back to Doctors</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10">
      <div className="container mx-auto max-w-2xl">
        {/* Doctor info */}
        <div className="mb-8 flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-card">
          <img src={doctorImages[doctor.id]} alt={doctor.name} width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
          <div>
            <h1 className="text-xl font-bold text-card-foreground">{doctor.name}</h1>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            <p className="text-lg font-bold text-primary">₹{doctor.fee}</p>
          </div>
        </div>

        {/* Date selection */}
        <div className="mb-6">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <CalendarDays size={16} className="text-primary" /> Select Date
          </label>
          <div className="flex flex-wrap gap-2">
            {dates.map(d => {
              const dayName = new Date(d).toLocaleDateString("en", { weekday: "short" });
              const dayNum = new Date(d).getDate();
              return (
                <button key={d} onClick={() => { setSelectedDate(d); setSelectedTime(""); }}
                  className={`rounded-lg border px-4 py-3 text-center transition-all ${selectedDate === d ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary"}`}>
                  <div className="text-xs">{dayName}</div>
                  <div className="text-lg font-bold">{dayNum}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time selection */}
        {selectedDate && (
          <div className="mb-6">
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Clock size={16} className="text-primary" /> Select Time
            </label>
            <div className="flex flex-wrap gap-2">
              {doctor.availableSlots.map(t => {
                const taken = isSlotBooked(t);
                return (
                  <button key={t} disabled={taken} onClick={() => setSelectedTime(t)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${taken ? "cursor-not-allowed border-border bg-muted text-muted-foreground line-through" : selectedTime === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary"}`}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Queue preview */}
        {selectedDate && selectedTime && (
          <div className="mb-6 rounded-lg border border-border bg-accent p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">📊 Queue Preview</h3>
            {(() => {
              const pending = appointments.filter(a => a.doctorId === doctor.id && a.date === selectedDate && a.status === "pending");
              const pos = pending.length + 1;
              const wait = pending.length * 15;
              return (
                <div className="flex gap-6 text-sm">
                  <span className="text-muted-foreground">Position: <strong className="text-primary">{pos}</strong></span>
                  <span className="text-muted-foreground">Wait: <strong className="text-primary">{wait} min</strong></span>
                  <span className="text-muted-foreground">Token: <strong className="text-primary">{pos}</strong></span>
                </div>
              );
            })()}
          </div>
        )}

        <button onClick={handleBook} disabled={!selectedDate || !selectedTime}
          className="gradient-primary w-full rounded-lg py-3 text-base font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
