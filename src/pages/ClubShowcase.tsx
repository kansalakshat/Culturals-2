import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { CLUBS, Club } from "../data";
import { cn } from "../utils";

const LOREM =
  "A vibrant part of IIT Bhilai's cultural scene, this club brings students together to learn, create and perform. Explore its events, achievements and the people who make it happen.";

type Member = { name: string; role: string; image: string };

/* Member cards revolving along a semi-circle (only the top arc is visible).
   ponytail: R/height tuned for ~4-10 members; adjust the two numbers to rescale. */
const R = 340;

const Card = ({ m }: { m: Member }) => (
  <div className="w-[150px] rounded-2xl overflow-hidden bg-green border border-ink/30 shadow-xl">
    <div className="h-[180px] bg-green-d overflow-hidden">
      <img src={m.image} alt={m.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
    <div className="py-2 px-2 text-center">
      <div className="text-stone font-semibold uppercase tracking-wide text-[12px] leading-tight">{m.name}</div>
      <div className="text-cream/70 text-[11px] mt-0.5">{m.role}</div>
    </div>
  </div>
);

const FanCore = ({ members }: { members: Member[] }) => {
  const step = 360 / Math.max(1, members.length);

  return (
    <>
      {/* desktop: revolving semi-circle */}
      <div className="relative mx-auto hidden md:block h-[440px] w-full overflow-hidden">
        <div
          className="absolute left-1/2 top-full animate-revolve"
          style={{ width: 2 * R, height: 2 * R, marginLeft: -R, marginTop: -R }}
        >
          {members.map((m, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%,-50%) rotate(${i * step}deg) translateY(-${R}px)` }}
            >
              {/* counter-rotate so cards stay upright as the ring turns */}
              <div className="animate-revolve-rev">
                <div style={{ transform: `rotate(${-i * step}deg)` }}>
                  <Card m={m} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* mobile: scroll row */}
      <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
        {members.map((m, i) => (
          <div key={i} className="snap-start shrink-0"><Card m={m} /></div>
        ))}
      </div>
    </>
  );
};

/* Reusable showcase used for both /clubs (type=club) and /societies (type=society) */
export const ClubShowcase = ({ type }: { type: "club" | "society" }) => {
  const list = CLUBS.filter((c) => c.type === type);
  const [idx, setIdx] = useState(0);
  // list shrinks when switching club<->society, so a stale idx can point past the
  // end -> undefined club -> crash. Fall back to the first item.
  const active = idx < list.length ? idx : 0;
  const club: Club = list[active];

  const go = (d: number) => setIdx((active + d + list.length) % list.length);

  const events = [
    ...club.upcomingEvents,
    ...club.interIITEvents,
    ...club.merazEvents,
    ...club.otherEvents,
  ].slice(0, 4);

  const feature = club.heroImage || club.coverimage || club.gallery?.[0];
  const feature2 = club.aboutImage || club.gallery?.[1] || feature;

  return (
    <>
      {/* HERO + selector */}
      <section className="pt-28 pb-0">
        <div className="max-w-6xl mx-auto px-6 min-h-[40vh] flex flex-col justify-center">
          <motion.h1
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display text-6xl sm:text-8xl tracking-wide"
          >
            {club.name.toUpperCase()}
          </motion.h1>
          <p className="text-green text-xl sm:text-2xl uppercase tracking-[0.25em] mt-3">
            {club.tagline}
          </p>
        </div>

        {/* selector row */}
        <div className="max-w-6xl mx-auto px-6 mt-10 flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous"
            className="w-11 h-11 shrink-0 rounded-full bg-maroon text-cream grid place-items-center hover:brightness-110 transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 flex gap-2 overflow-x-auto py-1">
            {list.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setIdx(i)}
                className={cn(
                  "px-4 py-2 rounded-full whitespace-nowrap text-sm transition border",
                  i === active
                    ? "bg-green text-cream border-green"
                    : "bg-transparent text-green border-green/40 hover:border-green"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next"
            className="w-11 h-11 shrink-0 rounded-full bg-maroon text-cream grid place-items-center hover:brightness-110 transition">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* quote band */}
      <div className="mt-8 green-texture text-cream text-center py-3 tracking-wide">
        {club.description}
      </div>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="h-[340px] rounded-[999px_999px_24px_24px] overflow-hidden bg-stone">
          <img src={feature} alt={club.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="display text-5xl text-green mb-6">About our Club</h2>
          <p className="text-ink/75 text-lg leading-relaxed">{club.about || LOREM}</p>
        </div>
      </section>

      {/* feature image + logo */}
      <section className="max-w-6xl mx-auto px-6 pb-10 grid md:grid-cols-[0.6fr_1.4fr] gap-8 items-center">
        <div className="w-40 h-40 mx-auto rounded-full bg-cream border-2 border-green/30 grid place-items-center overflow-hidden shadow">
          <img src={club.logo} alt={`${club.name} logo`} className="w-[70%] h-[70%] object-contain" />
        </div>
        <div className="h-[300px] rounded-[24px_999px_999px_24px] overflow-hidden bg-stone">
          <img src={feature2} alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* EVENTS TIMELINE */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="h-[320px] rounded-[999px_24px_24px_999px] overflow-hidden bg-stone order-2 md:order-1">
          <img src={club.gallery?.[2] || feature} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="display text-5xl text-green mb-6">Events Timeline</h2>
          <ul className="space-y-3 text-ink/80 text-lg">
            {(events.length ? events : [{ title: "More coming soon" }]).map((e, i) => (
              <li key={i} className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-maroon mt-1 shrink-0" />
                <span>{e.title}</span>
              </li>
            ))}
          </ul>
          <button className="btn-maroon mt-8">Get Notified</button>
        </div>
      </section>

      {/* OUR CORE — fanned arc of tilted cards (Figma structure) */}
      <section className="max-w-6xl mx-auto px-6 py-16 overflow-hidden">
        <h2 className="display text-6xl text-green text-center mb-20">OUR CORE</h2>
        <FanCore members={club.clubMembers} />
      </section>
    </>
  );
};
