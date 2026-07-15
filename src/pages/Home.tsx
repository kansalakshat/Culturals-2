import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  CLUBS,
  CURRENT_COUNCIL,
  HALL_OF_FAME,
  UPCOMING_EVENTS,
} from "../data";
import heroImg from "../assets/figma/hero.png";
import gsFrame from "../assets/figma/gs-frame.png";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const clubs = CLUBS.filter((c) => c.type === "club");
const societies = CLUBS.filter((c) => c.type === "society");
const leaders = [
  ...CURRENT_COUNCIL.coordinators,
  ...CURRENT_COUNCIL.societySecretaries,
];
const eventStrip = [
  ...UPCOMING_EVENTS.map((e) => e.image),
  ...clubs.map((c) => c.coverimage || c.heroImage || ""),
]
  .filter(Boolean)
  .slice(0, 6);

/* ---------------- Club / society card ---------------- */
const CultCard = ({
  img,
  name,
  tagline,
  to,
}: {
  img?: string;
  name: string;
  tagline?: string;
  to: string;
}) => (
  <Link
    to={to}
    className="group relative block h-[274px] rounded-3xl overflow-hidden bg-stone"
  >
    <img
      src={img}
      alt={name}
      className="w-full h-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
    <div className="absolute bottom-4 left-0 right-0 text-center px-3">
      <h3 className="display text-cream text-xl leading-tight">{name}</h3>
      {tagline && (
        <p className="text-cream/70 text-sm mt-0.5 line-clamp-1">{tagline}</p>
      )}
    </div>
  </Link>
);

/* ---------------- Council member card (green) ---------------- */
const CouncilCard = ({
  name,
  role,
  img,
}: {
  name: string;
  role: string;
  img: string;
}) => (
  <motion.div
    {...fadeUp}
    className="rounded-2xl overflow-hidden bg-green border border-ink/40 shadow-lg"
  >
    <div className="h-[230px] bg-green-d overflow-hidden">
      <img src={img} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
    <div className="py-3 px-2 text-center">
      <div className="text-stone font-semibold tracking-wide uppercase text-sm">{name}</div>
      <div className="text-cream/70 text-[13px] mt-0.5">{role}</div>
    </div>
  </motion.div>
);

export const Home = () => {
  const hofYear = HALL_OF_FAME[0];
  const hofGenSec = hofYear.members.find((m) => m.role === "General Secretary");

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative w-full">
        <img src={heroImg} alt="IIT Bhilai Culturals" className="w-full h-auto select-none" />
      </section>

      {/* ================= THE CLUBS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16">
        <motion.div {...fadeUp} className="panel p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-4 items-start mb-8">
            <h2 className="display text-5xl sm:text-6xl">The Clubs</h2>
            <p className="text-ink/70 text-lg leading-relaxed">
              Our clubs are where passion meets craft — music, dance, film, design,
              quizzing and more. Each one is a home for students to learn, create and
              perform together through the year.
            </p>
          </div>
          <div className="border-t border-ink/40 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {clubs.map((c) => (
              <CultCard
                key={c.id}
                img={c.coverimage || c.heroImage || c.gallery?.[0]}
                name={c.name}
                tagline={c.tagline}
                to="/clubs"
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= THE SOCIETIES ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <motion.div {...fadeUp} className="panel p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-4 items-start mb-8">
            <h2 className="display text-5xl sm:text-6xl">The Societies</h2>
            <p className="text-ink/70 text-lg leading-relaxed">
              The societies are our larger cultural collectives — the arts, expression
              and stagecraft of campus. They host the flagship shows, workshops and
              inter-college events that shape the cultural calendar.
            </p>
          </div>
          <div className="border-t border-ink/40 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="hidden md:block" />
            {societies.map((c) => (
              <CultCard
                key={c.id}
                img={c.coverimage || c.heroImage || c.gallery?.[0]}
                name={c.name}
                tagline={c.tagline}
                to="/societies"
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= EVENTS ================= */}
      <section className="relative mt-16 py-16 green-texture text-cream rounded-t-[50%_60px] rounded-b-[50%_60px]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2 {...fadeUp} className="display text-5xl sm:text-6xl mb-8">
            Events
          </motion.h2>
        </div>
        {/* full-bleed auto-sliding strip — edge to edge, no side margin */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...eventStrip, ...eventStrip].map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="h-96 sm:h-[34rem] w-96 shrink-0 object-cover"
              />
            ))}
          </div>
          {/* gentle concave carve — kept shallow so the strip stays thick everywhere */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[52%] w-[130%] h-[70%] rounded-[50%] green-texture" />
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-[52%] w-[130%] h-[70%] rounded-[50%] green-texture" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.p {...fadeUp} className="text-cream/80 text-lg max-w-3xl mx-auto mt-8">
            From open-mic nights and dance battles to our flagship cultural fest, the
            year is packed with events that turn the campus into a stage. Come watch,
            compete, or take the spotlight yourself.
          </motion.p>
          <motion.div {...fadeUp} className="mt-6">
            <Link to="/events" className="btn-maroon">View More</Link>
          </motion.div>
        </div>
      </section>

      {/* ================= MEET OUR COUNCIL ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <h2 className="display text-6xl sm:text-7xl leading-[0.95] mb-6">
              Meet our<br />Council
            </h2>
            <p className="text-ink/70 text-lg leading-relaxed max-w-md mb-8">
              The Cultural Council leads it all — a team of coordinators and secretaries
              who plan, organise and power every performance, competition and
              celebration across the year.
            </p>
            <Link to="/contact" className="btn-maroon">View More</Link>
          </motion.div>

          {/* General Secretary showcase */}
          <motion.div {...fadeUp} className="flex flex-col items-center text-center">
            <div className="relative w-[320px] max-w-full aspect-square">
              <img src={gsFrame} alt="" className="absolute inset-0 w-full h-full object-contain animate-spin-slow" />
              <img
                src={CURRENT_COUNCIL.genSec.image}
                alt={CURRENT_COUNCIL.genSec.name}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] h-[38%] object-cover rounded-full border-2 border-cream"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="display text-3xl mt-6 tracking-wide">GENERAL SECRETARY</h3>
            <p className="text-green uppercase tracking-wide mt-1">Media and Cultural Affairs</p>
            <p className="display text-2xl font-bold mt-2 uppercase">{CURRENT_COUNCIL.genSec.name}</p>
          </motion.div>
        </div>

        {/* Secretaries & Coordinators */}
        <div className="mt-16">
          <div className="flex items-center gap-4 justify-center mb-10">
            <span className="h-px flex-1 max-w-[180px] bg-ink/30" />
            <h3 className="text-2xl tracking-wide">Secretaries and Coordinators</h3>
            <span className="h-px flex-1 max-w-[180px] bg-ink/30" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {leaders.map((m, i) => (
              <CouncilCard key={i} name={m.name} role={m.role} img={m.image} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= HALL OF FAME ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          {...fadeUp}
          className="green-texture text-cream rounded-[40px] p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center overflow-hidden"
        >
          <div className="relative mx-auto h-[500px] w-[500px] max-w-full">
            {hofYear.members.map((m, i, arr) => (
              <img
                key={i}
                src={m.image}
                alt={m.name}
                referrerPolicy="no-referrer"
                className="hof-orbit absolute h-24 w-24 rounded-full border-2 border-cream/60 object-cover shadow-lg"
                style={{ animationDelay: `${(-(i / arr.length) * 60).toFixed(2)}s` }}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="display text-4xl sm:text-5xl leading-tight text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] text-center">
                HALL<br />OF<br />FAME
              </span>
            </div>
          </div>

          <div>
            <p className="uppercase tracking-[0.2em] text-cream/70 text-sm">General Secretary</p>
            <p className="display text-3xl mt-1">Year {hofYear.year}</p>
            <p className="display text-4xl font-bold mt-2 mb-6">
              {hofGenSec?.name ?? "—"}
            </p>
            <ul className="space-y-2 text-cream/80">
              {hofYear.members
                .filter((m) => m.role !== "General Secretary")
                .map((m, i) => (
                  <li key={i} className="flex items-center gap-2 border-b border-cream/10 pb-2">
                    <ArrowRight className="w-4 h-4 text-cream/50 shrink-0" />
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-cream/50">— {m.role}</span>
                  </li>
                ))}
            </ul>
            <Link to="/contact" className="btn-maroon mt-8">
              Full Roster <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};
