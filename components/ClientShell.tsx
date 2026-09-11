"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  FileText,
  MessageSquare,
  Users,
  LogOut,
  Settings,
  Bell,
  BarChart3,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  UserRound,
} from "lucide-react";

import { Brand } from "@/components/Brand";
import { createClient } from "@/lib/supabase/client";

const mainItems = [
  ["/client", "Tableau de bord", LayoutDashboard],
  ["/client/company", "Mon entreprise", Building2],
  ["/client/evaluations", "Évaluations", ClipboardList],
  ["/client/documents", "Documents", FileText],
  ["/client/requests", "Demandes TOLBO", MessageSquare],
  ["/client/members", "Membres", Users],
  ["/client/notifications", "Notifications", Bell],
] as const;

const secondaryItems = [
  ["/client/score-pass", "Score Pass", BarChart3],
  ["/client/settings", "Paramètres", Settings],
] as const;

type ClientShellProps = {
  children: ReactNode;
};

export function ClientShell({ children }: ClientShellProps) {
  const path = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function out() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await createClient().auth.signOut();
      router.push("/");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* =========================================================
          MOBILE HEADER
      ========================================================= */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:hidden">
        <Brand compact />

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          aria-label={
            mobileOpen ? "Fermer le menu" : "Ouvrir le menu"
          }
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Fermer la navigation"
            onClick={closeMobile}
            className="absolute inset-0 bg-slate-950/30"
          />

          <aside className="absolute bottom-0 left-0 top-16 w-[290px] overflow-y-auto border-r border-slate-200 bg-white p-4 shadow-2xl">
            <ClientNavigation
              path={path}
              onNavigate={closeMobile}
            />

            <div className="mt-6 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={out}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={18} />

                {loggingOut
                  ? "Déconnexion..."
                  : "Déconnexion"}
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* =======================================================
            DESKTOP SIDEBAR
        ======================================================= */}
        <aside className="sidebar sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
          {/* Brand */}
          <div className="flex h-[76px] items-center border-b border-slate-200 px-5">
            <Brand compact />
          </div>

          {/* Client identity */}
          <div className="px-4 pt-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[var(--blue)] shadow-sm">
                  <UserRound size={18} />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-xs font-bold uppercase tracking-[0.08em] text-slate-700">
                    Espace entreprise
                  </div>

                  <div className="mt-0.5 text-xs text-slate-500">
                    Portail sécurisé TOLBO
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Mon espace
            </div>

            <ClientNavigation
              path={path}
              onlyMain
            />

            <div className="mb-3 mt-7 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Suivi & compte
            </div>

            <ClientNavigation
              path={path}
              onlySecondary
            />
          </div>

          {/* Bottom area */}
          <div className="border-t border-slate-200 p-4">
            <div className="mb-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <div className="text-xs font-semibold text-blue-900">
                    Environnement contrôlé
                  </div>

                  <p className="mt-1 text-[11px] leading-4 text-blue-700">
                    Vos données et documents sont gérés dans
                    un espace dédié à votre entreprise.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={out}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={18} />

              {loggingOut
                ? "Déconnexion..."
                : "Déconnexion"}
            </button>
          </div>
        </aside>

        {/* =======================================================
            MAIN
        ======================================================= */}
        <main className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-30 hidden h-[76px] border-b border-slate-200 bg-white/90 backdrop-blur md:block">
            <div className="flex h-full items-center justify-between px-8">
              {/* Page context */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Espace entreprise
                </div>

                <div className="mt-0.5 text-sm font-semibold text-slate-800">
                  Gestion de votre dossier TOLBO
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 lg:flex"
                >
                  <ExternalLink size={16} />
                  Voir le site
                </Link>

                <Link
                  href="/client/notifications"
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                  aria-label="Notifications"
                >
                  <Bell size={18} />

                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                </Link>

                <div className="h-7 w-px bg-slate-200" />

                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--navy)] text-xs font-bold text-white">
                    E
                  </div>

                  <div className="hidden lg:block">
                    <div className="text-sm font-semibold text-slate-800">
                      Espace entreprise
                    </div>

                    <div className="text-xs text-slate-500">
                      Compte client
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ===============================================================
   NAVIGATION COMPONENT
================================================================ */

function ClientNavigation({
  path,
  onlyMain = false,
  onlySecondary = false,
  onNavigate,
}: {
  path: string;
  onlyMain?: boolean;
  onlySecondary?: boolean;
  onNavigate?: () => void;
}) {
  const groups = onlyMain
    ? [mainItems]
    : onlySecondary
      ? [secondaryItems]
      : [mainItems, secondaryItems];

  return (
    <div className="grid gap-1">
      {groups.flatMap((group) =>
        group.map(([href, label, Icon]) => {
          const active =
            path === href ||
            (href !== "/client" &&
              path.startsWith(`${href}/`));

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={[
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5",
                "text-sm font-medium transition-all duration-200",
                active
                  ? "bg-[var(--navy)] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              ].join(" ")}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-blue-400" />
              )}

              <span
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition",
                  active
                    ? "bg-white/10 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800",
                ].join(" ")}
              >
                <Icon
                  size={17}
                  strokeWidth={1.9}
                />
              </span>

              <span className="min-w-0 flex-1 truncate">
                {label}
              </span>

              <ChevronRight
                size={15}
                className={[
                  "shrink-0 transition-all",
                  active
                    ? "translate-x-0 text-white/70"
                    : "-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                ].join(" ")}
              />
            </Link>
          );
        }),
      )}
    </div>
  );
}