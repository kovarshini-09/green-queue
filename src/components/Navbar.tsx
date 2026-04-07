import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import mediQueueLogo from "@/assets/mediqueue-logo.png";

const Navbar = () => {
  const { currentPatient, currentDoctor, currentAssistant, logoutPatient, logoutDoctor, logoutAssistant } = useApp();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "HOME" },
    { to: "/doctors", label: "DOCTORS" },
    { to: "/services", label: "SERVICES" },
    { to: "/contact", label: "CONTACT" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <img src={mediQueueLogo} alt="MediQueue" width={32} height={32} className="h-8 w-8" />
          <span>MediQueue</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(l.to) ? "text-primary" : "text-muted-foreground"}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {currentDoctor ? (
            <div className="flex items-center gap-2">
              <Link to="/doctor-dashboard" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Dashboard</Link>
              <button onClick={logoutDoctor} className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><LogOut size={16} /></button>
            </div>
          ) : currentAssistant ? (
            <div className="flex items-center gap-2">
              <Link to="/assistant-dashboard" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Dashboard</Link>
              <span className="text-sm text-muted-foreground">{currentAssistant.name}</span>
              <button onClick={logoutAssistant} className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><LogOut size={16} /></button>
            </div>
          ) : currentPatient ? (
            <div className="flex items-center gap-2">
              <Link to="/my-appointments" className="text-sm font-medium text-primary">My Appointments</Link>
              <span className="text-sm text-muted-foreground">Hi, {currentPatient.name.split(" ")[0]}</span>
              <button onClick={logoutPatient} className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><LogOut size={16} /></button>
            </div>
          ) : (
            <>
              <Link to="/doctor-login" className="text-sm font-medium text-muted-foreground hover:text-primary">Doctor Login</Link>
              <Link to="/assistant-login" className="text-sm font-medium text-muted-foreground hover:text-primary">Assistant Login</Link>
              <Link to="/create-account" className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90">Create Account</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${isActive(l.to) ? "text-primary" : "text-muted-foreground"}`}>
                {l.label}
              </Link>
            ))}
            <hr className="border-border" />
            {currentAssistant ? (
              <>
                <Link to="/assistant-dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-primary">Dashboard</Link>
                <button onClick={() => { logoutAssistant(); setMobileOpen(false); }} className="text-left text-sm text-muted-foreground">Logout</button>
              </>
            ) : currentPatient ? (
              <>
                <Link to="/my-appointments" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-primary">My Appointments</Link>
                <button onClick={() => { logoutPatient(); setMobileOpen(false); }} className="text-left text-sm text-muted-foreground">Logout</button>
              </>
            ) : (
              <>
                <Link to="/doctor-login" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">Doctor Login</Link>
                <Link to="/assistant-login" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">Assistant Login</Link>
                <Link to="/create-account" onClick={() => setMobileOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">Create Account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
