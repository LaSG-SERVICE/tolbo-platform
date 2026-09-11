import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  Plus,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function ClientDashboard() {
  let orgName = "Votre entreprise";
  let status = "IN_PROGRESS";
  let configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (configured) {
    const sb = await createClient();

    const {
      data: { user },
    } = await sb.auth.getUser();

    if (user) {
      const { data: membership } = await sb
        .from("organization_members")
        .select("organization_id,organizations(name)")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      if (
        membership?.organizations &&
        !Array.isArray(membership.organizations)
      ) {
        orgName = (membership.organizations as { name?: string }).name ?? orgName;
      }
    }
  }

  const statusLabel =
    status === "IN_PROGRESS" ? "Évaluation en cours" : status;

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="container py-8 md:py-10">

        {/* ============================================================
            HERO
        ============================================================ */}
        <section className="relative overflow-hidden rounded-3xl bg-[var(--navy)] px-6 py-8 text-white shadow-[0_20px_50px_rgba(8,27,51,0.14)] md:px-9 md:py-10">
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
                <Building2 className="h-3.5 w-3.5" />
                ESPACE ENTREPRISE
              </div>

              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Tableau de bord
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 md:text-base">
                Bienvenue dans votre espace entreprise. Suivez vos dossiers,
                transmettez vos informations et préparez votre évaluation
                Score Pass.
              </p>
            </div>

            <Link
              href="/client/evaluations/new"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[var(--navy)] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              <Plus className="h-4 w-4" />
              Nouvelle évaluation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ============================================================
            KPI
        ============================================================ */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <KpiCard
            icon={<Building2 className="h-5 w-5" />}
            label="Entreprise"
            value={orgName}
            description="Organisation associée à votre compte"
          />

          <KpiCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="Dossiers en cours"
            value={configured ? "—" : "0"}
            description="Évaluations actuellement suivies"
          />

          <KpiCard
            icon={<FileText className="h-5 w-5" />}
            label="Documents"
            value={configured ? "—" : "0"}
            description="Documents transmis à votre espace"
          />

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div className="icon-box">
                <Clock3 className="h-5 w-5" />
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                En cours
              </span>
            </div>

            <div className="mt-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Statut
              </div>

              <div className="mt-2 text-base font-semibold text-[var(--ink)]">
                {statusLabel}
              </div>
            </div>
          </div>

        </section>

        {/* ============================================================
            MAIN CONTENT
        ============================================================ */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

          {/* PARCOURS */}
          <div className="card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-5 md:px-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
                    Parcours
                  </div>

                  <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">
                    Votre parcours TOLBO
                  </h2>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Les principales étapes de constitution et de traitement
                    de votre dossier.
                  </p>
                </div>

                <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500 sm:block">
                  Score Pass V1
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-200">

              <JourneyStep
                number="01"
                title="Profil entreprise"
                description="Vérifier et compléter les informations générales."
                status="À préparer"
                href="/client/company"
              />

              <JourneyStep
                number="02"
                title="Données d’évaluation"
                description="Renseigner les variables nécessaires au dossier."
                status="À préparer"
                href="/client/evaluations"
              />

              <JourneyStep
                number="03"
                title="Documents justificatifs"
                description="Transmettre les éléments permettant d’étayer les informations."
                status="À préparer"
                href="/client/documents"
              />

              <JourneyStep
                number="04"
                title="Demandes de complément"
                description="Répondre aux éventuelles demandes formulées par TOLBO."
                status="À suivre"
                href="/client/requests"
              />

              <JourneyStep
                number="05"
                title="Vérification TOLBO"
                description="Contrôle des données, preuves et éléments du dossier."
                status="À venir"
                href="/client/score-pass"
              />

            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-6">

            <div className="card p-6 md:p-7">
              <div className="icon-box mb-5">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
                Actions prioritaires
              </div>

              <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">
                Prochaines actions
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Préparez les éléments nécessaires à la poursuite de votre
                dossier.
              </p>

              <div className="mt-6 space-y-3">
                <ActionButton
                  href="/client/company"
                  icon={<Building2 className="h-4 w-4" />}
                  label="Compléter le profil entreprise"
                />

                <ActionButton
                  href="/client/documents"
                  icon={<Upload className="h-4 w-4" />}
                  label="Ajouter un document"
                />

                <ActionButton
                  href="/client/requests"
                  icon={<FileCheck2 className="h-4 w-4" />}
                  label="Consulter les demandes TOLBO"
                />
              </div>
            </div>

            {/* INFO SCORE PASS */}
            <div className="premium-card p-6 md:p-7">
              <div className="icon-box mb-5">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <h2 className="text-base font-semibold text-[var(--ink)]">
                Préparer votre Score Pass
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Le Score Pass s&apos;appuie sur les données et preuves
                disponibles à la date de l&apos;évaluation. Une information
                manquante n&apos;est pas automatiquement considérée comme
                une valeur nulle.
              </p>

              <Link
                href="/client/score-pass"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
              >
                Consulter le module Score Pass
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* ============================================================
            DOCUMENTS / EVALUATION
        ============================================================ */}
        <section className="mt-6 grid gap-5 md:grid-cols-2">

          <DashboardFeature
            icon={<BarChart3 className="h-5 w-5" />}
            eyebrow="Évaluation"
            title="Suivre vos évaluations"
            description="Accédez à vos dossiers, consultez leur progression et poursuivez la saisie des informations nécessaires."
            href="/client/evaluations"
            action="Voir mes évaluations"
          />

          <DashboardFeature
            icon={<FileText className="h-5 w-5" />}
            eyebrow="Documents"
            title="Gérer vos justificatifs"
            description="Centralisez les documents transmis dans votre espace et préparez les éléments nécessaires à vos dossiers."
            href="/client/documents"
            action="Voir les documents"
          />

        </section>

        {/* ============================================================
            FOOTER NOTICE
        ============================================================ */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />

            <div>
              <div className="text-sm font-semibold text-[var(--ink)]">
                Votre espace entreprise
              </div>

              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Les informations affichées dans ce tableau de bord sont
                destinées au suivi de votre parcours TOLBO. Les données
                officielles, statuts et résultats seront alimentés par les
                données Supabase lorsque les modules correspondants seront
                connectés.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

/* ================================================================
   KPI CARD
================================================================ */

function KpiCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="card p-5">
      <div className="icon-box">
        {icon}
      </div>

      <div className="mt-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          {label}
        </div>

        <div className="mt-2 truncate text-xl font-bold text-[var(--ink)]">
          {value}
        </div>

        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   JOURNEY STEP
================================================================ */

function JourneyStep({
  number,
  title,
  description,
  status,
  href,
}: {
  number: string;
  title: string;
  description: string;
  status: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-5 transition hover:bg-slate-50 md:px-7"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-600 transition group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700">
        {number}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <h3 className="text-sm font-semibold text-[var(--ink)]">
            {title}
          </h3>

          <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
            {status}
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
          {description}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
    </Link>
  );
}

/* ================================================================
   ACTION BUTTON
================================================================ */

function ActionButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-blue-200 hover:bg-blue-50/50"
    >
      <span className="text-blue-700">
        {icon}
      </span>

      <span className="flex-1">
        {label}
      </span>

      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
    </Link>
  );
}

/* ================================================================
   DASHBOARD FEATURE
================================================================ */

function DashboardFeature({
  icon,
  eyebrow,
  title,
  description,
  href,
  action,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="card p-6 md:p-7">
      <div className="flex items-start gap-4">
        <div className="icon-box shrink-0">
          {icon}
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
            {eyebrow}
          </div>

          <h2 className="mt-1 text-lg font-semibold text-[var(--ink)]">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {description}
          </p>

          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
          >
            {action}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}