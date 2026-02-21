import Link from "next/link";
import { nunito } from "@/lib/fonts";

export default function Footer() {
  return (
    <footer className="border-t border-border-dark bg-bg-primary px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="text-sm text-text-on-dark-secondary/60">
          <span className={nunito.className}><span className="font-semibold">Tavo</span><span className="font-extrabold text-accent">Žyma</span></span> &middot; 2026
        </span>

        <span className="text-sm font-medium text-text-on-dark">LT</span>

        <Link
          href="/privatumo-politika"
          className="text-sm text-text-on-dark-secondary/60 underline underline-offset-2 hover:text-text-on-dark-secondary transition-colors duration-200"
        >
          Privatumo politika
        </Link>
      </div>
    </footer>
  );
}
