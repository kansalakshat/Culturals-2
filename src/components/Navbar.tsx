import { NavLink, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "../utils";
import logo from "../assets/logos/logo.png";

const LINKS = [
  { to: "/", label: "Home", short: "Home" },
  { to: "/clubs", label: "Clubs", short: "Clubs" },
  { to: "/societies", label: "Societies", short: "Societies" },
  { to: "/events", label: "Events", short: "Events" },
  { to: "/gallery", label: "Gallery", short: "Gallery" },
  { to: "/contact", label: "Contact Us", short: "Contact" },
];

const spring = { type: "spring", stiffness: 500, damping: 42 } as const;
const R = 48; // logo radius (h-24 = 96px)

const isActive = (to: string, pathname: string) =>
  to === "/" ? pathname === "/" : pathname.startsWith(to);

export const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const activeIndex = Math.max(0, LINKS.findIndex((l) => isActive(l.to, pathname)));

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [markerX, setMarkerX] = useState<number | null>(null);

  // Logo sits in the gap to the RIGHT of the active button (LEFT of Home),
  // offset so it clears the first/last labels. Bar is red from left up to it.
  useLayoutEffect(() => {
    const measure = () => {
      const items = itemRefs.current;
      const el = items[activeIndex];
      if (!el || el.offsetWidth === 0) return; // skip when hidden (mobile)
      const right = el.offsetLeft + el.offsetWidth;
      let x: number;
      if (activeIndex === 0) x = el.offsetLeft - (R - 8);
      else if (activeIndex < LINKS.length - 1) {
        const next = items[activeIndex + 1];
        x = next ? (right + next.offsetLeft) / 2 : right + (R - 8);
      } else x = right + (R - 8);
      setMarkerX(x);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  const redWidth = activeIndex === 0 ? 0 : markerX ?? 0;

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(97%,1080px)]">
      {/* ---------- desktop: sliding-logo bar ---------- */}
      <nav className="hidden md:block rounded-[70px] bg-green/95 text-cream backdrop-blur-md shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)]">
        <ul className="relative flex items-center justify-between gap-1 px-20 py-5">
          {/* red fill left of the logo */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-0 rounded-l-[70px] bg-maroon"
            initial={false}
            animate={{ width: redWidth }}
            transition={spring}
          />
          {/* sliding logo marker — larger than the bar so it pops out */}
          {markerX !== null && (
            <motion.img
              src={logo}
              alt="IIT Bhilai Culturals"
              aria-hidden
              className="pointer-events-none absolute top-1/2 z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-lg ring-2 ring-cream/70"
              initial={false}
              animate={{ left: markerX }}
              transition={spring}
            />
          )}
          {LINKS.map((l, i) => (
            <li key={l.to} ref={(el) => { itemRefs.current[i] = el; }} className="relative z-10">
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className="block whitespace-nowrap px-3 py-1.5 text-[18px] leading-none text-cream/90 hover:text-cream"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------- mobile: logo + wrapping links (always visible) ---------- */}
      <nav className="md:hidden rounded-[26px] bg-green/95 text-cream backdrop-blur-md shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] px-2 py-2.5">
        <div className="flex items-center gap-1.5">
          <img src={logo} alt="IIT Bhilai Culturals" className="h-7 w-7 shrink-0 rounded-full object-cover ring-2 ring-cream/70" />
          <ul className="flex min-w-0 flex-1 items-center justify-between gap-0.5">
            {LINKS.map((l) => (
              <li key={l.to} className="shrink-0">
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive: a }) =>
                    cn(
                      "block whitespace-nowrap rounded-full px-1.5 py-1 text-[11px] leading-none transition-colors",
                      a ? "bg-maroon text-cream" : "text-cream/85 hover:bg-cream/10"
                    )
                  }
                >
                  {l.short}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
