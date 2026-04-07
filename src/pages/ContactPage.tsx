import { MapPin, Phone, Mail } from "lucide-react";

const ContactPage = () => (
  <div className="px-4 py-10">
    <div className="container mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold text-foreground">Contact Us</h1>
      <p className="mb-8 text-muted-foreground">Get in touch with our team</p>

      <div className="mb-8 space-y-4">
        {[
          { icon: MapPin, label: "Address", value: "123 Medical Street, Health City, HC 12345" },
          { icon: Phone, label: "Phone", value: "+91 98765 43210" },
          { icon: Mail, label: "Email", value: "support@mediqueue.com" },
        ].map((c, i) => (
          <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="rounded-lg bg-accent p-2.5 text-primary"><c.icon size={20} /></div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">{c.label}</p>
              <p className="text-sm text-muted-foreground">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-4 text-lg font-semibold text-card-foreground">Send a Message</h2>
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary" placeholder="Your Name" />
          <input className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary" placeholder="Your Email" />
          <textarea className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary" rows={4} placeholder="Your Message" />
          <button className="gradient-primary rounded-lg px-6 py-2.5 text-sm font-semibold text-primary-foreground">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

export default ContactPage;
