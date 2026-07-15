/* Line-art globe emblem — a lazy stand-in for the Figma crest. */
export const Emblem = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1" />
    <ellipse cx="50" cy="50" rx="18" ry="46" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="50" cy="50" rx="34" ry="46" stroke="currentColor" strokeWidth="1" />
    <line x1="4" y1="50" x2="96" y2="50" stroke="currentColor" strokeWidth="1.5" />
    <line x1="9" y1="31" x2="91" y2="31" stroke="currentColor" strokeWidth="1" />
    <line x1="9" y1="69" x2="91" y2="69" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
  </svg>
);
