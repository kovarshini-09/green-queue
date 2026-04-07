import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const { registerPatient, loginPatient, currentPatient } = useApp();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  if (currentPatient) {
    navigate("/doctors");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isLogin) {
      const p = loginPatient(form.email, form.password);
      if (p) navigate("/doctors");
      else setError("Invalid email or password");
    } else {
      if (!form.name || !form.email || !form.phone || !form.password) {
        setError("All fields are required");
        return;
      }
      registerPatient(form);
      navigate("/doctors");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-card">
        <h2 className="mb-2 text-2xl font-bold text-card-foreground">{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="mb-6 text-sm text-muted-foreground">{isLogin ? "Login to manage your appointments" : "Sign up to book appointments"}</p>

        {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" placeholder="john@example.com" />
          </div>
          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" placeholder="+91 9876543210" />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" placeholder="••••••••" />
          </div>
          <button type="submit" className="gradient-primary w-full rounded-lg py-2.5 text-sm font-semibold text-primary-foreground">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }} className="font-medium text-primary hover:underline">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
