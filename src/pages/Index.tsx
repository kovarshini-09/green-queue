import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Clock, Heart, HeartPulse, Instagram, Layers, Mail, MapPin, Phone, Shield, ShieldCheck, Star, Twitter, Users, Zap, Activity, Facebook } from "lucide-react";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 md:py-32">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_50%)]" />
        <div className="absolute -right-20 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-0 bottom-10 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />

        <div className="container relative mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="mx-auto flex max-w-fit items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary shadow-sm shadow-primary/10">
              <Zap size={18} />
              New: instant queue alerts, smart doctor matching, and service booking in one place
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-foreground sm:text-6xl">
              Healthcare that works around your schedule.
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              Book appointments, lab services, and consultations in seconds — then follow your live queue status until it’s your turn.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: HeartPulse, title: "Patient-first", label: "Clear booking and faster check-ins." },
                { icon: ShieldCheck, title: "Trusted care", label: "Verified doctors and certified lab services." },
                { icon: CalendarCheck, title: "Real-time slots", label: "Choose the best time instantly." },
              ].map((item, idx) => (
                <div key={idx} className="rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/doctors"
                className="group inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-xl"
              >
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/create-account"
                className="inline-flex items-center justify-center rounded-full border border-primary px-8 py-3 text-base font-semibold text-primary transition-all hover:bg-primary/5"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-border bg-gradient-to-br from-white/90 to-slate-100/90 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between rounded-3xl bg-primary/5 p-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-primary/80">Fast booking preview</p>
                  <h2 className="mt-2 text-2xl font-bold text-foreground">Your visit in one tap</h2>
                </div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
                  <Users size={20} />
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {[
                  { title: "Instant tokens", desc: "Grab a token and follow queue status in real time." },
                  { title: "Doctor match", desc: "Find the right specialist for your symptoms." },
                  { title: "Service booking", desc: "Schedule labs, scans, and checkups instantly." },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-3xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative px-4 py-16 md:py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Choose MediQueue?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Clock, title: "Real-time Queue", desc: "Know your exact waiting time before you arrive", color: "hover:text-blue-500" },
              { icon: Users, title: "Token System", desc: "Get your token number instantly upon booking", color: "hover:text-green-500" },
              { icon: Shield, title: "Trusted Doctors", desc: "Verified specialists across all departments", color: "hover:text-purple-500" },
              { icon: Activity, title: "Live Updates", desc: "Track your queue position in real-time", color: "hover:text-orange-500" },
            ].map((f, i) => (
              <div
                key={i}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 hover:scale-105 hover:border-primary/20"
              >
                <div className={`mb-4 inline-flex rounded-lg bg-accent p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground ${f.color}`}>
                  <f.icon size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 px-4 py-16">
        <div className="container mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "12+", label: "Expert Doctors" },
              { number: "7+", label: "Medical Services" },
              { number: "1000+", label: "Happy Patients" },
              { number: "24/7", label: "Support Available" },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="mb-2 text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">{s.number}</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{s.label}</div>
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
              { step: "1", title: "Create Account", desc: "Sign up in seconds with your basic details", icon: "👤" },
              { step: "2", title: "Choose Doctor & Slot", desc: "Browse doctors and pick your preferred time", icon: "📅" },
              { step: "3", title: "Get Queue Status", desc: "Receive token, queue position & estimated wait", icon: "🎫" },
            ].map((s, i) => (
              <div key={i} className="group text-center">
                <div className="gradient-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl transition-all group-hover:scale-110 group-hover:rotate-12">
                  {s.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 md:py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">What Our Patients Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Priya S.", rating: 5, text: "Amazing service! No more waiting in long queues. Booked my appointment in minutes." },
              { name: "Rajesh K.", rating: 5, text: "The real-time queue updates are fantastic. I knew exactly when to arrive." },
              { name: "Meera L.", rating: 5, text: "Professional doctors and seamless booking experience. Highly recommended!" },
            ].map((t, i) => (
              <div key={i} className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1">
                <div className="mb-4 flex">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm text-muted-foreground italic group-hover:text-foreground/80 transition-colors">"{t.text}"</p>
                <div className="font-semibold text-card-foreground group-hover:text-primary transition-colors">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero px-4 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Experience Smart Healthcare?</h2>
          <p className="mb-8 text-lg text-muted-foreground">Join thousands of satisfied patients who trust MediQueue</p>
          <Link
            to="/create-account"
            className="group gradient-primary inline-flex items-center rounded-lg px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
          >
            Get Started Today
            <Heart className="ml-2 h-4 w-4 transition-transform group-hover:scale-125" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-12">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">MQ</div>
                <span>MediQueue</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Revolutionizing healthcare with smart queue management and instant booking.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/doctors" className="text-muted-foreground hover:text-primary transition-colors">Find Doctors</Link></li>
                <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link></li>
                <li><Link to="/create-account" className="text-muted-foreground hover:text-primary transition-colors">Create Account</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Services</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Doctor Appointments</li>
                <li className="text-muted-foreground">Medical Tests</li>
                <li className="text-muted-foreground">Emergency Care</li>
                <li className="text-muted-foreground">Health Checkups</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 font-semibold text-foreground">Contact Info</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={16} />
                  <span>hello@mediqueue.com</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>123 Health St, Medical City</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2026 MediQueue. Made with <Heart className="inline h-4 w-4 text-red-500" /> for better healthcare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
