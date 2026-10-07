"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
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
          }
          return true;
        } else {
          setAuthError(data.error || "Incorrect passcode. Access denied.");
          setIsAuthenticated(false);
          if (typeof window !== "undefined") {
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
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
            ? sessionStorage.getItem(SESSION_STORAGE_KEY)
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
            } else {
              sessionStorage.removeItem(SESSION_STORAGE_KEY);
            }
          }
        }
      } catch {
        if (active) {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
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

  // Loading state while checking sessionStorage
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0e0f12] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#a01115] to-[#780d10] p-0.5 animate-pulse shadow-xl shadow-[#a01115]/30">
          <div className="w-full h-full bg-[#121316] rounded-2xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-[#a01115]" />
          </div>
        </div>
        <p className="mt-4 text-xs font-medium tracking-wider uppercase text-zinc-400">
          Verifying Admin Session...
        </p>
      </div>
    );
  }

  // Passcode Gate Modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e0f12] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden font-sans selection:bg-[#a01115] selection:text-white">
        {/* Ambient brand glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#a01115]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-[#14161a] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            {/* Logo & Header */}
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#a01115]/10 border border-[#a01115]/30 text-[#a01115] shadow-lg shadow-[#a01115]/20 mb-1">
                <Lock className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white font-serif">
                Brick &amp; Beams Admin
              </h1>
              <p className="text-xs text-zinc-400">
                Enter your administrative passcode to access lead management and business analytics.
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
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Passcode
                </label>
                <div className="relative rounded-xl bg-zinc-900 border border-white/10 focus-within:border-[#a01115] focus-within:ring-2 focus-within:ring-[#a01115]/20 transition-all">
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
                    className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
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
                  <span>Verifying...</span>
                ) : (
                  <>
                    <span>Unlock Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Hint & Return */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Protected Session
              </span>
              <Link
                href="/"
                className="text-zinc-400 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                Return to Website &rarr;
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
