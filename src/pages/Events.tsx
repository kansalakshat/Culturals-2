import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { CLUBS, HALL_OF_FAME } from "../data";

const NODE_COLORS = [
  "#E0C094", "#F0CA79", "#AFAD8C", "#8D9580",
  "#778B7F", "#89A090", "#8EAAA2", "#6B8082",
];

// Merge a rich set of events from all clubs.
const seen = new Set<string>();
const EVENTS = CLUBS.flatMap((c) => [
  ...c.interIITEvents,
  ...c.merazEvents,
  ...c.upcomingEvents,
])
  .filter((e) => (seen.has(e.title) ? false : (seen.add(e.title), true)))
  .slice(0, 8);

const hofYear = HALL_OF_FAME[0];
const hofGenSec = hofYear?.members.find((m) => m.role === "General Secretary");

// Timeline geometry (px). Nodes and the wave share waveX() so circles sit on the line.
const N = EVENTS.length;
const ROW = 210;
const TL_H = N * ROW;
const AMP = 115; // horizontal swing
const WAVES = 4.5; // cycles over the whole timeline — higher = wavier
const CHANNEL = 150; // clear zone around the centre so cards never hit the wave
const waveX = (y: number) => AMP * Math.sin((y / TL_H) * WAVES * Math.PI * 2);

const PATH = (() => {
  const steps = 240;
  let d = `M ${waveX(0).toFixed(1)} 0`;
  for (let i = 1; i <= steps; i++) {
    const y = (TL_H / steps) * i;
    d += ` L ${waveX(y).toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
})();

export const Events = () => (
  <>
    <section className="pt-28 pb-6 max-w-6xl mx-auto px-6">
      <div className="flex items-end justify-end gap-4">
        <h1 className="display text-4xl font-bold text-ink">Events Timeline</h1>
        <span
          className="display text-7xl font-bold leading-none"
          style={{
            background: "linear-gradient(180deg, #FDFAE2 0%, #30463B 70%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          2025
        </span>
      </div>
    </section>

    {/* desktop: wavy timeline with circles sitting on the wave */}
    <section className="relative mx-auto hidden max-w-4xl px-6 pb-24 md:block">
      <div className="relative mx-auto" style={{ height: TL_H }}>
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2"
          width={2 * (AMP + 8)}
          height={TL_H}
          viewBox={`${-(AMP + 8)} 0 ${2 * (AMP + 8)} ${TL_H}`}
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="spine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(108,15,30,.7)" />
              <stop offset="24%" stopColor="rgba(240,202,121,.7)" />
              <stop offset="47%" stopColor="rgba(48,70,59,.7)" />
              <stop offset="67%" stopColor="rgba(85,134,120,.7)" />
              <stop offset="91%" stopColor="rgba(38,84,118,.7)" />
            </linearGradient>
          </defs>
          <path d={PATH} stroke="url(#spine)" strokeWidth="6" strokeLinecap="round" />
        </svg>

        {EVENTS.map((e, i) => {
          const y = ROW * i + ROW / 2;
          const x = waveX(y);
          const left = i % 2 === 0;
          const color = NODE_COLORS[i % NODE_COLORS.length];
          return (
            <div key={i}>
              {/* card */}
              <motion.div
                initial={{ opacity: 0, x: left ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="absolute -translate-y-1/2"
                style={{
                  top: y,
                  width: `calc(50% - ${CHANNEL}px)`,
                  ...(left ? { left: 0, textAlign: "right" } : { right: 0 }),
                }}
              >
                <h3 className="display text-2xl font-bold text-green">{e.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">
                  {e.fullDescription || e.description}
                </p>
                <p className="mt-2 font-semibold text-maroon">{e.date}</p>
              </motion.div>

              {/* node on the wave */}
              <span
                className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] bg-cream"
                style={{ top: y, left: `calc(50% + ${x}px)`, borderColor: color }}
              />
            </div>
          );
        })}
      </div>
    </section>

    {/* mobile: simple stacked list */}
    <section className="mx-auto max-w-xl px-6 pb-20 md:hidden">
      <div className="flex flex-col gap-8">
        {EVENTS.map((e, i) => (
          <div key={i} className="border-l-2 border-maroon/40 pl-4">
            <h3 className="display text-xl font-bold text-green">{e.title}</h3>
            <p className="mt-1 leading-relaxed text-ink/75">{e.fullDescription || e.description}</p>
            <p className="mt-1 font-semibold text-maroon">{e.date}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Hall of Fame */}
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="green-texture text-cream rounded-[40px] p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center overflow-hidden"
      >
        <div className="relative mx-auto h-[500px] w-[500px] max-w-full">
          {/* photos orbit the wheel and stay upright (offset-rotate: 0deg) */}
          {(hofYear?.members ?? []).map((m, i, arr) => (
            <img
              key={i}
              src={m.image}
              alt={m.name}
              referrerPolicy="no-referrer"
              className="hof-orbit absolute h-32 w-24 rounded-2xl border-2 border-cream/60 object-cover shadow-lg"
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
          <p className="display text-3xl mt-1">Year {hofYear?.year}</p>
          <p className="display text-4xl font-bold mt-2 mb-6">{hofGenSec?.name ?? "—"}</p>
          <ul className="space-y-2 text-cream/80">
            {hofYear?.members
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

    {/* info box below the timeline */}
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <div className="green-texture rounded-3xl p-8 text-center text-cream sm:p-12">
        <h2 className="display mb-4 text-4xl font-bold">Saaz</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-cream/80">
          Saaz is the official cultural portal of IIT Bhilai — browse every event,
          check schedules and results, and sign up for the ones you want to be part of.
        </p>
        <a
          href="https://saaz.openlake.in/"
          target="_blank"
          rel="noreferrer"
          className="btn-maroon"
        >
          Visit Saaz <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  </>
);
