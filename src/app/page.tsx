"use client";

import Link from "next/link";
import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";

export default function HomePage() {
  const [status, setStatus] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setStatus("Sending…");
    const r = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (r.ok) {
      setStatus("Request received — lead created in CRM.");
      e.currentTarget.reset();
    } else {
      setStatus("Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-spy-charcoal text-white">
        <div className="max-w-6xl mx-auto px-4 h-[72px] flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-wide">
            <img
              src="/spyglass-insurance-assets/logo-white.svg"
              alt="Spyglass Insurance"
              className="h-11 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <a href="#coverage" className="hover:text-white text-white/90">
              Coverage
            </a>
            <a href="#why" className="hover:text-white text-white/90">
              Why Us
            </a>
            <a href="#quote" className="hover:text-white text-white/90">
              Contact
            </a>
            <Link href="/crm" className="hover:text-white text-white/90">
              CRM Login
            </Link>
            <a href="#quote" className="btn-primary text-sm min-h-10">
              Free Consultation
            </a>
          </nav>
        </div>
      </header>

      <section
        className="relative text-white min-h-[78vh] grid items-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,26,.62), rgba(26,26,26,.48) 45%, rgba(26,26,26,.78)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=80) center/cover",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-white/90 mb-4">Austin · Texas · Property · Casualty · Professional · Renters</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Trusted Protection for Homes, Renters &amp; Professionals
          </h1>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#quote" className="btn-primary text-lg px-7 py-3">
              Get a Free Quote
            </a>
            <a href="#coverage" className="btn-secondary text-lg px-7 py-3">
              Explore Coverage
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold">The Best Austin Insurance Partner for Real Life</h2>
        <p className="text-spy-muted mt-3">
          Spyglass Insurance brings the Spyglass standard to property &amp; casualty, professional liability,
          renters, and supplemental coverage — with a CRM that captures chat and SMS.
        </p>
      </section>

      <section className="pb-16 max-w-6xl mx-auto px-4" id="paths">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What brings you here today?</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: "Protect Your Home",
              body: "Property & casualty for homeowners and property owners who want clear options.",
              img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
            },
            {
              title: "Protect Your Work",
              body: "Professional liability / E&O for real estate pros and service businesses.",
              img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80",
            },
          ].map((c) => (
            <article key={c.title} className="card overflow-hidden hover:shadow-md transition">
              <div className="aspect-[16/10] bg-cover bg-center" style={{ backgroundImage: `url(${c.img})` }} />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                <p className="text-spy-muted mb-3">{c.body}</p>
                <a href="#coverage" className="text-spy-orange font-semibold">
                  Learn more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="coverage" className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Coverage Options</h2>
        <p className="text-center text-spy-muted mb-10 max-w-xl mx-auto">
          P&amp;C, professional liability, renters, and supplemental — explained without the jargon wall.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            ["Property & Casualty", "Homes, personal property, and liability for Texas owners."],
            ["Professional Liability", "E&O for agents, consultants, and service professionals."],
            ["Renters Insurance", "Belongings, liability, landlord-ready proof."],
            ["Supplemental Coverage", "Gap coverage beyond a primary policy."],
          ].map(([title, body]) => (
            <article key={title} className="card p-6">
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-spy-muted text-sm mb-3">{body}</p>
              <a href="#quote" className="text-spy-orange font-semibold text-sm">
                Request options →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="why" className="bg-spy-surface py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Reasons to Work with Us</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["Clear product lineup", "Focused products: P&C, PL, renters, supplemental."],
              ["Chat + CRM connected", "Website chat and SMS land in one agent inbox."],
              ["Boutique, Texas-rooted", "Spyglass brand DNA — straightforward and local."],
            ].map(([t, b]) => (
              <div key={t} className="card p-5">
                <h3 className="font-bold mb-2">{t}</h3>
                <p className="text-sm text-spy-muted">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-spy-dark text-white py-14 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Built on the Spyglass Standard</h2>
        <p className="text-white/75 mb-6">From real estate to insurance — one family of brands.</p>
        <a
          href="https://www.spyglassrealty.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Visit Spyglass Realty
        </a>
      </section>

      <section id="quote" className="py-16 px-4">
        <div className="max-w-xl mx-auto card p-8 shadow-md">
          <h2 className="text-2xl font-bold text-center mb-1">Take The First Step to Protection</h2>
          <p className="text-center text-spy-muted text-sm mb-6">Creates a lead in the Spyglass CRM</p>
          <form className="space-y-3" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-semibold">
                Full name *
                <input name="name" required className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal" />
              </label>
              <label className="text-sm font-semibold">
                Phone *
                <input name="phone" required type="tel" className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal" />
              </label>
            </div>
            <label className="text-sm font-semibold block">
              Email *
              <input name="email" required type="email" className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal" />
            </label>
            <label className="text-sm font-semibold block">
              Coverage interest *
              <select name="interest" required className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal">
                <option value="">Select one</option>
                <option>Property &amp; Casualty</option>
                <option>Professional Liability / E&amp;O</option>
                <option>Renters Insurance</option>
                <option>Supplemental Coverage</option>
                <option>Multiple / not sure</option>
              </select>
            </label>
            <label className="text-sm font-semibold block">
              ZIP / city
              <input name="location" className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal" />
            </label>
            <label className="text-sm font-semibold block">
              Message
              <textarea name="message" className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal min-h-24" />
            </label>
            <button type="submit" className="btn-primary w-full">
              Get Your Free Quote
            </button>
            {status && <p className="text-center text-sm text-spy-muted">{status}</p>}
          </form>
        </div>
      </section>

      <footer className="bg-spy-charcoal text-white/85 py-12 px-4 text-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <img src="/spyglass-insurance-assets/logo-white.svg" alt="Spyglass Insurance" className="h-12 mb-3" />
            <p>8501 N Mopac Expy STE 110<br />Austin, TX 78759</p>
            <p className="mt-2">
              <a href="tel:+15125989701">(512) 598-9701</a>
            </p>
          </div>
          <div>
            <h3 className="text-spy-orange font-bold mb-3">Coverage</h3>
            <ul className="space-y-1">
              <li>Property &amp; Casualty</li>
              <li>Professional Liability</li>
              <li>Renters</li>
              <li>Supplemental</li>
            </ul>
          </div>
          <div>
            <h3 className="text-spy-orange font-bold mb-3">Company</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/crm">Agent CRM</Link>
              </li>
              <li>
                <a href="https://www.spyglassrealty.com/">Spyglass Realty</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-spy-orange font-bold mb-3">Contact</h3>
            <ul className="space-y-1">
              <li>
                <a href="#quote">Free consultation</a>
              </li>
              <li>
                <a href="mailto:insurance@spyglassrealty.com">insurance@spyglassrealty.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-white/10 text-white/50 text-xs flex flex-wrap justify-between gap-2">
          <span>© 2026 Spyglass Insurance</span>
          <span>Licensing disclosures required before launch</span>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
