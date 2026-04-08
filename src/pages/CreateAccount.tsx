import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { registerUser, loginUser } from "@/services/api";

const CreateAccount = () => {
  const navigate = useNavigate();
  const { setCurrentPatient } = useApp();
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = isLogin
        ? await loginUser({ email: form.email, password: form.password })
        : await registerUser(form);

      const user = res.user || res;
      if (!user || user.msg) {
        setError(res.msg || "Unable to login/register. Please check your input.");
        return;
      }

      const normalizedUser = { ...user, id: user.id || user._id };
      localStorage.setItem("currentPatient", JSON.stringify(normalizedUser));
      setCurrentPatient(normalizedUser);
      navigate("/doctors");
    } catch (err: any) {
      const message = err?.message || "Could not connect to the server. Please try again.";
      setError(message);
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-card">
        <h2 className="mb-2 text-2xl font-bold text-card-foreground">
          {isLogin ? "Patient Login" : "Create Account"}
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          {isLogin
            ? "Enter your email and password to sign in."
            : "Create a patient account to book appointments."}
        </p>

        {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              placeholder="name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground"
            />
          )}
          <input
            placeholder="email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground"
          />
          {!isLogin && (
            <input
              placeholder="phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground"
            />
          )}
          <input
            placeholder="password"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground"
          />

          <button type="submit" className="gradient-primary w-full rounded-lg py-2.5 text-sm font-semibold text-primary-foreground">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-primary underline"
        >
          {isLogin ? "Create a new account" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;