"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";

const Footer = () => (
  <footer className="border-t border-border bg-background py-12 mt-24 text-foreground text-sm">
    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10">
      {/* Brand */}
      <div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">StackIt</h2>
        <p className="max-w-xs">Where knowledge meets community. Share, learn, and grow together.</p>
        <div className="flex space-x-3 mt-4">
          {/* social icons */}
          {[
            {
              path: "M12 2C6.48 2 2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H8.07v-2.89h2.37V9.41c0-2.36 1.4-3.66 3.55-3.66 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.53.73-1.53 1.48v1.78h2.6l-.42 2.89h-2.18v6.99C18.34 21.12 22 16.99 22 12c0-5.52-4.48-10-10-10z",
              label: "Facebook",
            },
          ].map((s) => (
            <svg key={s.label} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 hover:text-primary transition">
              <path fill="currentColor" d={s.path} />
            </svg>
          ))}
        </div>
      </div>
      {/* Links */}
      <div className="md:col-span-2 grid sm:grid-cols-3 gap-8">
        {[
          {
            heading: "Product",
            links: ["Features", "Pricing", "Integrations"],
          },
          {
            heading: "Community",
            links: ["Blog", "Forums", "Events"],
          },
          {
            heading: "Company",
            links: ["About", "Careers", "Contact"],
          },
        ].map((c) => (
          <div key={c.heading}>
            <h3 className="font-semibold mb-3">{c.heading}</h3>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l} className="hover:text-primary cursor-pointer">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-10 text-center text-xs text-foreground/80">
      © {new Date().getFullYear()} StackIt. All rights reserved.
    </div>
  </footer>
);

export default Footer;
