"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Sun, Moon } from "lucide-react";

export type AdminTheme = "dark" | "light";

interface AdminThemeContextType {
  theme: AdminTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: AdminTheme) => void;
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(
  undefined
);

const THEME_STORAGE_KEY = "bnb_admin_theme";

export function AdminThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<AdminTheme>("dark");

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY) as AdminTheme | null;
        if (stored === "light" || stored === "dark") {
          setThemeState(stored);
        }
      } catch {
        // localStorage may fail in restricted/private contexts
      }
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const setTheme = useCallback((newTheme: AdminTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: AdminTheme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <AdminThemeContext.Provider value={value}>
      <div
        data-admin-theme={theme}
        className={theme === "light" ? "admin-light-mode" : "admin-dark-mode"}
      >
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme(): AdminThemeContextType {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error("useAdminTheme must be used within an AdminThemeProvider");
  }
  return context;
}

/**
 * Modern Segmented Theme Switcher for Admin Panel
 * Fits in sidebar, headers, and toolbars
 */
export function AdminThemeToggle({
  className = "",
  showLabels = true,
}: {
  className?: string;
  showLabels?: boolean;
}) {
  const { setTheme, isDark } = useAdminTheme();

  return (
    <div
      role="group"
      aria-label="Theme toggle"
      className={`grid grid-cols-2 p-1 rounded-xl transition-all gap-1 ${
        isDark
          ? "bg-[#16181d] border border-white/10"
          : "bg-zinc-100 border border-zinc-200 shadow-2xs"
      } ${className}`}
    >
      {/* Dark Button */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={isDark}
        title="Switch to Dark Mode"
        className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer select-none ${
          isDark
            ? "bg-[#222630] text-white shadow-sm border border-white/10"
            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60"
        }`}
      >
        <Moon
          className={`w-3.5 h-3.5 shrink-0 transition-colors ${
            isDark ? "text-blue-400" : "text-zinc-400"
          }`}
        />
        {showLabels && <span>Dark</span>}
      </button>

      {/* Light Button */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={!isDark}
        title="Switch to Light Mode"
        className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer select-none ${
          !isDark
            ? "bg-white text-zinc-900 shadow-sm border border-zinc-200"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <Sun
          className={`w-3.5 h-3.5 shrink-0 transition-colors ${
            !isDark ? "text-amber-500" : "text-zinc-400"
          }`}
        />
        {showLabels && <span>Light</span>}
      </button>
    </div>
  );
}

/**
 * Compact Single-Click Icon Toggle Button
 * Ideal for headers and mobile bars
 */
export function AdminThemeIconButton({
  className = "",
}: {
  className?: string;
}) {
  const { isDark, toggleTheme } = useAdminTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`p-2 rounded-xl border transition-all cursor-pointer ${
        isDark
          ? "bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10"
          : "bg-white border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 shadow-xs"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-700 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
