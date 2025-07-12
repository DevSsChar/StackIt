"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import NotificationSystem from "./NotificationSystem";
import SearchBox from "./SearchBox";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-8 w-8 text-primary">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
              </svg>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">StackIt</span>
            </div>
          </Link>

          {/* Search Section (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBox className="w-full" />
          </div>

          {/* Search Button (Mobile) */}
          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search h-5 w-5">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {status === "loading" ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : session ? (
              <>
                {/* Ask Question Button */}
                <Link 
                  href="/ask"
                  className="hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground h-9 rounded-lg px-4 transition-all duration-200 hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Ask Question
                </Link>

                {/* Notifications */}
                <NotificationSystem userId={session.user?.id} />

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors duration-200"
                  >
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                      </div>
                    )}
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-border">
                        <p className="font-medium text-card-foreground">{session.user?.name}</p>
                        <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </Link>
                        <Link
                          href="/my-questions"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          My Questions
                        </Link>
                        <Link
                          href="/my-answers"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          My Answers
                        </Link>
                        <div className="border-t border-border my-2" />
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            signOut();
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors w-full text-left"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/10 h-9 rounded-lg px-4 transition-all duration-200 text-foreground border border-border">
                  Sign in
                </Link>
                <Link href="/portal" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border border-primary bg-primary text-white h-9 rounded-lg px-4 transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        {open && (
          <div className="md:hidden pb-4">
            <SearchBox />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;