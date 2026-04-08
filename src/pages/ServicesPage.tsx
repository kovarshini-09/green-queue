import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { RefreshCw } from "lucide-react";

import serviceBp from "@/assets/service-bp.jpg";
import serviceThyroid from "@/assets/service-thyroid.jpg";
import serviceXray from "@/assets/service-xray.jpg";
import serviceCtscan from "@/assets/service-ctscan.jpg";

// ✅ NEW IMPORTS
import serviceSugar from "@/assets/service-sugar.jpg";
import serviceMri from "@/assets/service-mri.jpg";
import serviceGlucose from "@/assets/service-glucose.jpg";

const serviceImages: Record<string, string> = {
  s1: serviceBp,
  s2: serviceThyroid,
  s3: serviceXray,
  s4: serviceCtscan,
  s5: serviceSugar,
  s6: serviceMri,
  s7: serviceGlucose,
};

const serviceDescs: Record<string, string> = {
  s1: "Accurate blood pressure monitoring and hypertension management",
  s2: "Complete thyroid tests and endocrine consultation",
  s3: "High-resolution digital X-ray imaging diagnostics",
  s4: "Advanced CT scan for detailed body imaging",

  // ✅ NEW DESCRIPTIONS
  s5: "Blood sugar testing for diabetes monitoring and control",
  s6: "Magnetic Resonance Imaging for detailed internal body scans",
  s7: "Glucose level testing for quick health assessment",
};

const ServicesPage = () => {
  const { services, refreshData } = useApp();

  const handleRefresh = async () => {
    await refreshData();
  };

  return (
    <div className="px-4 py-10">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Our Services
            </h1>
            <p className="text-muted-foreground">
              Comprehensive healthcare services with smart queue management
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
          {services.map((s) => (
            <div
              key={s.id || s._id}
              className="group rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] cursor-pointer"
            >
              {/* IMAGE */}
              <img
                src={serviceImages[s.id] || serviceCtscan}
                alt={s.name}
                className="mb-4 h-32 w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* TITLE + PRICE */}
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-md font-semibold text-card-foreground">
                  {s.name}
                </h3>
                <span className="text-md font-bold text-primary">
                  ₹{s.fee ?? s.fees}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="mb-4 text-xs text-muted-foreground">
                {serviceDescs[s.id]}
              </p>

              {/* BUTTON */}
              <Link
                to={`/book-service/${s.id}`}
                className="gradient-primary block rounded-lg py-2 text-center text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;