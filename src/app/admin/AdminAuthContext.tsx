"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Link from "next/link";
import {
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Building2,
} from "lucide-react";
import {
  useAdminTheme,
  AdminThemeIconButton,
} from "./AdminThemeContext";

interface AdminAuthContextType {
  passcode: string;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  authError: string;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

const SESSION_STORAGE_KEY = "bnb_admin_passcode";
const LOCAL_STORAGE_KEY = "bnb_admin_passcode_persist";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState("");

  const [inputCode, setInputCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  // Validate passcode against server
  const verifyPasscode = useCallback(
    async (codeToTest: string): Promise<boolean> => {
      try {
        const res = await fetch("/api/admin/leads?limit=1", {
          headers: {
            "x-admin-passcode": codeToTest,
          },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setPasscode(codeToTest);
          setIsAuthenticated(true);
          setAuthError("");
          if (typeof window !== "undefined") {
            sessionStorage.setItem(SESSION_STORAGE_KEY, codeToTest);
            localStorage.setItem(LOCAL_STORAGE_KEY, codeToTest);
          }
          return true;
        } else {
          setAuthError(data.error || "Incorrect passcode. Access denied.");
          setIsAuthenticated(false);
          if (typeof window !== "undefined") {
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
          return false;
        }
      } catch (err) {
        console.error("Passcode verification error:", err);
        setAuthError("Failed to reach server. Please check your network.");
        return false;
      }
    },
    []
  );

  // Restore stored session on mount
  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const stored =
          typeof window !== "undefined"
            ? (sessionStorage.getItem(SESSION_STORAGE_KEY) ||
               localStorage.getItem(LOCAL_STORAGE_KEY))
            : null;

        if (stored) {
          const res = await fetch("/api/admin/leads?limit=1", {
            headers: { "x-admin-passcode": stored },
          });
          const data = await res.json();
          if (active) {
            if (res.ok && data.success) {
              setPasscode(stored);
              setIsAuthenticated(true);
              // Ensure both storages are synced
              sessionStorage.setItem(SESSION_STORAGE_KEY, stored);
              localStorage.setItem(LOCAL_STORAGE_KEY, stored);
            } else {
              sessionStorage.removeItem(SESSION_STORAGE_KEY);
              localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
          }
        }
      } catch {
        if (active) {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      } finally {
        if (active) {
          setIsCheckingAuth(false);
        }
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const login = async (code: string) => {
    setIsSubmitting(true);
    const success = await verifyPasscode(code);
    setIsSubmitting(false);
    return success;
  };

  const logout = () => {
    setPasscode("");
    setIsAuthenticated(false);
    setInputCode("");
    setAuthError("");
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setAuthError("Please enter your admin passcode.");
      return;
    }
    await login(inputCode.trim());
  };

  const { isDark } = useAdminTheme();

  // Loading state while checking sessionStorage
  if (isCheckingAuth) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-200 ${
          isDark ? "bg-[#0e0f12] text-white" : "bg-[#f8f9fa] text-zinc-900"
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#a01115] to-[#780d10] p-0.5 animate-pulse shadow-xl shadow-[#a01115]/30">
          <div
            className={`w-full h-full rounded-2xl flex items-center justify-center ${
              isDark ? "bg-[#121316]" : "bg-white"
            }`}
          >
            <Building2 className="w-6 h-6 text-[#a01115]" />
          </div>
        </div>
        <p
          className={`mt-4 text-xs font-medium tracking-wider uppercase ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Verifying Admin Session...
        </p>
      </div>
    );
  }

  // Passcode Gate Modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden font-sans selection:bg-[#a01115] selection:text-white transition-colors duration-200 ${
          isDark ? "bg-[#0e0f12]" : "bg-[#f8f9fa]"
        }`}
      >
        {/* Top-Right Theme Switcher */}
        <div className="absolute top-6 right-6 z-20">
          <AdminThemeIconButton />
        </div>

        {/* Ambient brand glow */}
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none ${
            isDark ? "bg-[#a01115]/15" : "bg-[#a01115]/10"
          }`}
        />

        <div className="w-full max-w-md relative z-10">
          <div
            className={`border rounded-3xl p-8 sm:p-10 backdrop-blur-2xl transition-all ${
              isDark
                ? "bg-[#14161a] border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
                : "bg-white border-zinc-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            }`}
          >
            {/* Logo & Header */}
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#a01115]/10 border border-[#a01115]/30 text-[#a01115] shadow-lg shadow-[#a01115]/20 mb-1">
                <Lock className="w-7 h-7" />
              </div>
              <h1
                className={`text-2xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}
              >
                Brick &amp; Beams Admin
              </h1>
              <p
                className={`text-xs ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                Enter your admin passcode to log in.
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            {/* Passcode Form */}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  className={`block text-xs font-semibold uppercase tracking-wider ${
                    isDark ? "text-zinc-300" : "text-zinc-700"
                  }`}
                >
                  Passcode
                </label>
                <div
                  className={`relative rounded-xl border focus-within:border-[#a01115] focus-within:ring-2 focus-within:ring-[#a01115]/20 transition-all ${
                    isDark
                      ? "bg-zinc-900 border-white/10"
                      : "bg-zinc-50 border-zinc-300"
                  }`}
                >
                  <input
                    type={showPasscode ? "text" : "password"}
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value);
                      if (authError) setAuthError("");
                    }}
                    placeholder="Enter admin passcode"
                    autoFocus
                    required
                    className={`w-full bg-transparent px-4 py-3 text-sm outline-none pr-11 ${
                      isDark
                        ? "text-white placeholder-zinc-500"
                        : "text-zinc-900 placeholder-zinc-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode((prev) => !prev)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                      isDark
                        ? "text-zinc-400 hover:text-white"
                        : "text-zinc-400 hover:text-zinc-700"
                    }`}
                    aria-label="Toggle passcode visibility"
                  >
                    {showPasscode ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#a01115] hover:bg-[#850e11] active:scale-[0.99] text-white text-sm font-semibold shadow-lg shadow-[#a01115]/30 hover:shadow-xl hover:shadow-[#a01115]/40 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Checking...</span>
                ) : (
                  <>
                    <span>Log In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Hint & Return */}
            <div
              className={`mt-8 pt-6 border-t flex items-center justify-between text-xs ${
                isDark
                  ? "border-white/5 text-zinc-500"
                  : "border-zinc-200 text-zinc-500"
              }`}
            >
              <span
                className={`inline-flex items-center gap-1.5 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Admin Login
              </span>
              <Link
                href="/"
                className={`transition-colors underline-offset-4 hover:underline ${
                  isDark
                    ? "text-zinc-400 hover:text-white"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Go to Website &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider
      value={{
        passcode,
        isAuthenticated,
        isCheckingAuth,
        authError,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
