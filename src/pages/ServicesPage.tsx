import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import serviceBp from "@/assets/service-bp.jpg";
import serviceThyroid from "@/assets/service-thyroid.jpg";
import serviceXray from "@/assets/service-xray.jpg";
import serviceCtscan from "@/assets/service-ctscan.jpg";

const serviceImages: Record<string, string> = {
  s1: serviceBp, s2: serviceThyroid, s3: serviceXray, s4: serviceCtscan,
};

const serviceDescs: Record<string, string> = {
  s1: "Accurate blood pressure monitoring and hypertension management with digital sphygmomanometers",
  s2: "Complete thyroid function tests, ultrasound imaging, and specialist endocrine consultations",
  s3: "High-resolution digital X-ray imaging for bones, chest, and dental diagnostics",
  s4: "Advanced computed tomography scanning for detailed cross-sectional body imaging",
};

const ServicesPage = () => {
  const { services } = useApp();

  return (
    <div className="px-4 py-10">
      <div className="container mx-auto">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Our Services</h1>
        <p className="mb-8 text-muted-foreground">Comprehensive healthcare services with smart queue management</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map(s => (
            <div key={s.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover">
              <img src={serviceImages[s.id]} alt={s.name} loading="lazy" width={640} height={512} className="h-48 w-full object-cover" />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">{s.name}</h3>
                  <span className="text-lg font-bold text-primary">₹{s.fee}</span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{serviceDescs[s.id]}</p>
                <Link to={`/book-service/${s.id}`} className="gradient-primary block rounded-lg py-2.5 text-center text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
