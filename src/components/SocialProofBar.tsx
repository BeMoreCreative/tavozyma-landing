export default function SocialProofBar() {
  const count = 0;

  if (count < 5) return null;

  return (
    <section className="border-y border-accent/10 bg-accent/[0.03] px-6 py-3">
      <p className="flex items-center justify-center gap-2 text-sm text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
        <span className="font-semibold">{count}</span>{" "}
        profesionalai jau užsiregistravo
      </p>
    </section>
  );
}
