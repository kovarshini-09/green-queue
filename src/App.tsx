import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import DoctorsPage from "./pages/DoctorsPage";
import BookAppointment from "./pages/BookAppointment";
import CreateAccount from "./pages/CreateAccount";
import PatientAppointments from "./pages/PatientAppointments";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import ServicesPage from "./pages/ServicesPage";
import BookService from "./pages/BookService";
import AssistantLogin from "./pages/AssistantLogin";
import AssistantDashboard from "./pages/AssistantDashboard";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/book/:doctorId" element={<BookAppointment />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/my-appointments" element={<PatientAppointments />} />
            <Route path="/doctor-login" element={<DoctorLogin />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/book-service/:serviceId" element={<BookService />} />
            <Route path="/assistant-login" element={<AssistantLogin />} />
            <Route path="/assistant-dashboard" element={<AssistantDashboard />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
