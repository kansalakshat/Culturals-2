import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import { Emblem } from "./Emblem";

const QUICK = [
  { to: "/", label: "Home" },
  { to: "/clubs", label: "Clubs" },
  { to: "/societies", label: "Societies" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact Us" },
];

export const Footer = () => (
  <footer className="bg-ink text-cream">
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1.4fr]">
      {/* Brand */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Emblem className="w-12 h-12 text-cream" />
          <div className="leading-tight">
            <div className="display text-2xl tracking-wide">CULTURALS</div>
            <div className="text-cream/70 text-lg">IIT Bhilai</div>
          </div>
        </div>
        <p className="mt-2 text-cream/60 text-sm">
          Made by Akshat Kansal — Cultural Development Head '26
        </p>
        <div className="flex gap-3 text-cream/70">
          <a href="#" aria-label="Instagram" className="hover:text-cream transition"><Instagram className="w-5 h-5" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-cream transition"><Linkedin className="w-5 h-5" /></a>
          <a href="#" aria-label="Facebook" className="hover:text-cream transition"><Facebook className="w-5 h-5" /></a>
          <a href="#" aria-label="YouTube" className="hover:text-cream transition"><Youtube className="w-5 h-5" /></a>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h4 className="text-cream font-semibold mb-4 text-lg">Quick Links</h4>
        <ul className="flex flex-col gap-2 text-cream/70">
          {QUICK.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="hover:text-cream transition">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Address */}
      <div>
        <h4 className="text-cream font-semibold mb-4 text-lg">Address</h4>
        <address className="not-italic text-cream/70 leading-relaxed">
          Indian Institute of Technology Bhilai<br />
          Kutelabhata Village,<br />
          Durg District, Bhilai – 490 001,<br />
          Chhattisgarh, India
        </address>
        <a href="mailto:culturals@iitbhilai.ac.in" className="inline-block mt-4 text-cream/80 hover:text-cream transition">
          culturals@iitbhilai.ac.in
        </a>
      </div>
    </div>

    <div className="border-t border-cream/10 py-5 text-center text-cream/50 text-sm">
      Culturals, IIT Bhilai © 2025
    </div>
  </footer>
);
