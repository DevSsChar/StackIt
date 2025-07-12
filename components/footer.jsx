"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";

const Footer = () => (
  <footer className="border-t border-border bg-background py-16 text-foreground">
    <div className="max-w-6xl mx-auto px-6 lg:px-12">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            StackIt
          </h2>
          <p className="text-foreground/70 mb-6 max-w-sm">
            Where knowledge meets community. Share, learn, and grow together in the ultimate Q&A platform.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H8.07v-2.89h2.37V9.41c0-2.36 1.4-3.66 3.55-3.66 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.53.73-1.53 1.48v1.78h2.6l-.42 2.89h-2.18v6.99C18.34 21.12 22 16.99 22 12c0-5.52-4.48-10-10-10z"/>
              </svg>
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-3 grid sm:grid-cols-3 gap-8">
          {[
            {
              heading: "Product",
              links: [
                { name: "Features", href: "#features" },
                { name: "How it Works", href: "#how-it-works" },
                { name: "Pricing", href: "#pricing" },
                { name: "FAQ", href: "#faq" }
              ],
            },
            {
              heading: "Community",
              links: [
                { name: "Questions", href: "/questions" },
                { name: "Tags", href: "/tags" },
                { name: "Users", href: "/users" },
                { name: "Blog", href: "/blog" }
              ],
            },
            {
              heading: "Company",
              links: [
                { name: "About", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy", href: "/privacy" }
              ],
            },
          ].map((section) => (
            <div key={section.heading}>
              <h3 className="font-semibold text-foreground mb-4">{section.heading}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-border text-center">
        <p className="text-sm text-foreground/60">
          © {new Date().getFullYear()} StackIt. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
