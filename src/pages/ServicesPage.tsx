import { Heart, Brain, Bone, Eye, Baby, Ear } from "lucide-react";

const services = [
  { icon: Heart, name: "Cardiology", desc: "Heart health checkups, ECG, and consultations" },
  { icon: Brain, name: "Neurology", desc: "Brain and nervous system specialist care" },
  { icon: Bone, name: "Orthopedics", desc: "Bone, joint, and muscle treatments" },
  { icon: Eye, name: "Ophthalmology", desc: "Eye exams, vision care, and treatments" },
  { icon: Baby, name: "Pediatrics", desc: "Comprehensive child healthcare services" },
  { icon: Ear, name: "ENT", desc: "Ear, nose, and throat specialist care" },
];

const ServicesPage = () => (
  <div className="px-4 py-10">
    <div className="container mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-foreground">Our Services</h1>
      <p className="mb-8 text-muted-foreground">Comprehensive healthcare services with smart queue management</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover">
            <div className="mb-4 inline-flex rounded-lg bg-accent p-3 text-primary"><s.icon size={24} /></div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">{s.name}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ServicesPage;
