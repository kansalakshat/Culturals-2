import { useState } from "react";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:culturals@iitbhilai.ac.in?subject=${encodeURIComponent(
      form.subject || "Hello from the website"
    )}&body=${body}`;
  };

  const input =
    "w-full rounded-[30px] border-2 border-cream/80 bg-cream/10 text-cream placeholder-cream/60 px-6 py-2.5 outline-none focus:border-cream transition";

  return (
    <>
      <section className="pt-28 pb-10 text-center max-w-3xl mx-auto px-6">
        <h1 className="display text-5xl sm:text-6xl font-bold mb-4">CONTACT US</h1>
        <p className="text-ink/70 text-xl">
          Connect with the heartbeat of campus culture—talk to us!
        </p>
      </section>

      <section className="green-texture text-cream py-14">
        <form onSubmit={submit} className="max-w-2xl mx-auto px-6 flex flex-col gap-4">
          <input className={input} placeholder="Name" value={form.name} onChange={set("name")} required />
          <input className={input} type="email" placeholder="Email" value={form.email} onChange={set("email")} required />
          <input className={input} placeholder="Subject" value={form.subject} onChange={set("subject")} />
          <div className="relative">
            <textarea
              className={input + " min-h-[180px] resize-none"}
              placeholder="Message"
              maxLength={1000}
              value={form.message}
              onChange={set("message")}
            />
            <span className="absolute bottom-3 right-6 text-cream/60 text-sm">
              {form.message.length}/1000
            </span>
          </div>
          <button type="submit" className="btn-maroon mx-auto mt-2 px-10">Send Message</button>

          <div className="text-center mt-6">
            <p className="mb-3">Follow us on</p>
            <div className="flex justify-center gap-3">
              {[Instagram, Linkedin, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-full bg-maroon grid place-items-center hover:brightness-110 transition">
                  <Icon className="w-5 h-5 text-cream" />
                </a>
              ))}
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
