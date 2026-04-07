import { Link } from "react-router-dom";
import { Clock, Users, Shield, Activity } from "lucide-react";

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero px-4 py-20 md:py-28">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              🏥 Smart Queue Management
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Skip the Wait,<br />
              <span className="text-primary">Book Smart</span>
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              Real-time queue predictions, instant token booking, and zero waiting stress. Your health, your time, your way.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/doctors" className="gradient-primary rounded-lg px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:opacity-90">
                Book Appointment
              </Link>
              <Link to="/create-account" className="rounded-lg border-2 border-primary bg-background px-8 py-3 text-base font-semibold text-primary transition-all hover:bg-accent">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 md:py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Choose MediQueue?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Clock, title: "Real-time Queue", desc: "Know your exact waiting time before you arrive" },
              { icon: Users, title: "Token System", desc: "Get your token number instantly upon booking" },
              { icon: Shield, title: "Trusted Doctors", desc: "Verified specialists across all departments" },
              { icon: Activity, title: "Live Updates", desc: "Track your queue position in real-time" },
            ].map((f, i) => (
              <div key={i} className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover">
                <div className="mb-4 inline-flex rounded-lg bg-accent p-3 text-primary">
                  <f.icon size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-secondary/50 px-4 py-16 md:py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">How It Works</h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Create Account", desc: "Sign up in seconds with your basic details" },
              { step: "2", title: "Choose Doctor & Slot", desc: "Browse doctors and pick your preferred time" },
              { step: "3", title: "Get Queue Status", desc: "Receive token, queue position & estimated wait" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="gradient-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-primary-foreground">
                  {s.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2026 MediQueue. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
