export const Placeholder = ({ title }: { title: string }) => (
  <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
    <h1 className="display text-6xl mb-4">{title}</h1>
    <p className="text-ink/60 text-lg">This page is being rebuilt in the new design.</p>
  </section>
);
