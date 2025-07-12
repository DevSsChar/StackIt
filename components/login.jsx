"use client";

import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center flex-1 px-4"
      >
        <h1 className="text-4xl font-extrabold mb-6">Welcome back</h1>
        <p className="mb-10 text-center max-w-sm">
          Sign in to your account or create a new one to join the StackIt community.
        </p>
        <div className="space-y-4 w-full max-w-sm">
          <button className="group w-full h-14 rounded-xl border border-border bg-white dark:bg-gray-800 flex items-center justify-center gap-4 font-semibold text-base hover:-translate-y-0.5 hover:shadow-lg transition-transform duration-200">
            <svg className="w-6 h-6" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.4-34.1-4-50.2H272v95h146.9c-6.3 34-25 62.6-53.2 81.8v68h85.9c50.3-46.4 81.9-114.9 81.9-194.6z"/>
              <path fill="#34a853" d="M272 544.3c72.6 0 133.6-24 178.1-65.1l-85.9-68c-23.8 16-54.5 25.4-92.2 25.4-70.7 0-130.6-47.7-152.1-111.5H30.1v69.9C74.7 488.2 167.6 544.3 272 544.3z"/>
              <path fill="#fbbc04" d="M119.9 324.1c-10.1-29.6-10.1-61.3 0-90.9v-69.9H30.1c-43 86.1-43 192 0 278.1l89.8-69.9z"/>
              <path fill="#ea4335" d="M272 214.2c39.5 0 75 13.6 102.9 40.3l77.1-77.1C405.6 105 344.6 78 272 78 167.6 78 74.7 134 30.1 214.3l89.8 69.9C141.4 262 201.3 214.2 272 214.2z"/>
            </svg>
            Continue with Google
          </button>
          <button className="group w-full h-14 rounded-xl border border-border bg-white dark:bg-gray-800 flex items-center justify-center gap-4 font-semibold text-base hover:-translate-y-0.5 hover:shadow-lg transition-transform duration-200">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12C0 17.3 3.44 21.76 8.205 23.54C8.805 23.63 9.025 23.29 9.025 22.99C9.025 22.71 9.015 22.05 9.01 21.25C5.672 21.91 4.968 19.34 4.968 19.34C4.422 17.86 3.633 17.45 3.633 17.45C2.546 16.69 3.714 16.71 3.714 16.71C4.922 16.79 5.554 17.95 5.554 17.95C6.633 19.88 8.41 19.34 9.053 19.04C9.143 18.26 9.46 17.74 9.81 17.43C7.139 17.12 4.343 16.06 4.343 11.45C4.343 10.14 4.798 9.06 5.56 8.2C5.45 7.9 5.05 6.65 5.66 4.98C5.66 4.98 6.66 4.65 9 6.2C9.91 5.96 10.88 5.84 11.85 5.84C12.82 5.84 13.79 5.96 14.7 6.2C17.04 4.65 18.04 4.98 18.04 4.98C18.65 6.65 18.25 7.9 18.14 8.2C18.91 9.06 19.36 10.14 19.36 11.45C19.36 16.07 16.56 17.12 13.88 17.43C14.3 17.79 14.66 18.45 14.66 19.46C14.66 21.06 14.65 22.46 14.65 22.99C14.65 23.29 14.86 23.64 15.47 23.54C20.24 21.76 23.68 17.3 23.68 12C23.68 5.37 18.63 0 12 0Z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>
      </motion.main>
    </div>
  );
}
