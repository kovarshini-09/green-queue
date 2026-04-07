import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

const AssistantLogin = () => {
  const { loginAssistant, currentAssistant } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (currentAssistant) {
    navigate("/assistant-dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const a = loginAssistant(name, password);
    if (a) navigate("/assistant-dashboard");
    else setError("Invalid credentials. Use assistant name (e.g. BP Assistant) and password: assistant123");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-card">
        <h2 className="mb-2 text-2xl font-bold text-card-foreground">Assistant Login</h2>
        <p className="mb-6 text-sm text-muted-foreground">Access the service dashboard to manage appointments</p>

        {error && <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Assistant Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" placeholder="BP Assistant" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" placeholder="••••••••" />
          </div>
          <button type="submit" className="gradient-primary w-full rounded-lg py-2.5 text-sm font-semibold text-primary-foreground">Login</button>
        </form>

        <div className="mt-4 rounded-lg bg-accent p-3 text-xs text-muted-foreground">
          <strong>Demo:</strong> Use any assistant name (e.g., "BP Assistant", "X-Ray Assistant") with password "assistant123"
        </div>
      </div>
    </div>
  );
};

export default AssistantLogin;
