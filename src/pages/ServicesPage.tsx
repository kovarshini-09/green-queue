import serviceBp from "@/assets/service-bp.jpg";
import serviceThyroid from "@/assets/service-thyroid.jpg";
import serviceXray from "@/assets/service-xray.jpg";
import serviceCtscan from "@/assets/service-ctscan.jpg";

const services = [
  { image: serviceBp, name: "Blood Pressure", desc: "Accurate blood pressure monitoring and hypertension management with digital sphygmomanometers" },
  { image: serviceThyroid, name: "Thyroid", desc: "Complete thyroid function tests, ultrasound imaging, and specialist endocrine consultations" },
  { image: serviceXray, name: "X-Ray", desc: "High-resolution digital X-ray imaging for bones, chest, and dental diagnostics" },
  { image: serviceCtscan, name: "CT Scan", desc: "Advanced computed tomography scanning for detailed cross-sectional body imaging" },
];

const ServicesPage = () => (
  <div className="px-4 py-10">
    <div className="container mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-foreground">Our Services</h1>
      <p className="mb-8 text-muted-foreground">Comprehensive healthcare services with smart queue management</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((s, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover">
            <img src={s.image} alt={s.name} loading="lazy" width={640} height={512} className="h-48 w-full object-cover" />
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ServicesPage;
