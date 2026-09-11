"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Globe2,
  Hash,
  Landmark,
  Loader2,
  MapPin,
  Save,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { LogoUploader } from "@/components/LogoUploader";

type Enterprise = {
  id: string;
  legal_name?: string | null;
  registration_number?: string | null;
  sector?: string | null;
  address?: string | null;
  country?: string | null;
  website?: string | null;
};

type Organization = {
  id: string;
  name?: string | null;
};

export default function Company() {
  const [org, setOrg] = useState<Organization | null>(null);
  const [ent, setEnt] = useState<Enterprise | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadCompany() {
      setLoading(true);
      setError("");

      try {
        const sb = createClient();

        const {
          data: { user },
        } = await sb.auth.getUser();

        if (!user) {
          setError("Votre session n’a pas pu être récupérée.");
          return;
        }

        const { data: membership, error: membershipError } = await sb
          .from("organization_members")
          .select("organization_id")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle();

        if (membershipError) {
          throw membershipError;
        }

        if (!membership) {
          setError("Aucune organisation associée à votre compte.");
          return;
        }

        const { data: organization, error: organizationError } = await sb
          .from("organizations")
          .select("*")
          .eq("id", membership.organization_id)
          .single();

        if (organizationError) {
          throw organizationError;
        }

        const { data: enterprise, error: enterpriseError } = await sb
          .from("enterprises")
          .select("*")
          .eq("organization_id", membership.organization_id)
          .single();

        if (enterpriseError) {
          throw enterpriseError;
        }

        setOrg(organization);
        setEnt(enterprise);
      } catch (err: any) {
        setError(
          err?.message ||
            "Une erreur est survenue lors du chargement des informations."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCompany();
  }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!ent) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const sb = createClient();

      const { error: updateError } = await sb
        .from("enterprises")
        .update({
          legal_name: ent.legal_name,
          registration_number: ent.registration_number,
          sector: ent.sector,
          address: ent.address,
          country: ent.country,
          website: ent.website,
        })
        .eq("id", ent.id);

      if (updateError) {
        throw updateError;
      }

      setSuccess("Les informations de votre entreprise ont été enregistrées.");
    } catch (err: any) {
      setError(
        err?.message ||
          "Impossible d’enregistrer les informations de l’entreprise."
      );
    } finally {
      setSaving(false);
    }
  }

  const completion = useMemo(() => {
    if (!ent) return 0;

    const fields = [
      ent.legal_name,
      ent.registration_number,
      ent.sector,
      ent.address,
      ent.country,
      ent.website,
    ];

    const completed = fields.filter(
      (value) => value !== null && value !== undefined && String(value).trim()
    ).length;

    return Math.round((completed / fields.length) * 100);
  }, [ent]);

  function updateField(field: keyof Enterprise, value: string) {
    if (!ent) return;

    setEnt({
      ...ent,
      [field]: value,
    });

    setSuccess("");
    setError("");
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="section-title">Mon entreprise</div>

        <div className="card flex min-h-[320px] items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="icon-box">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>

            <div>
              <p className="font-semibold text-[var(--ink)]">
                Chargement de votre entreprise
              </p>
              <p className="small muted mt-1">
                Récupération des informations depuis votre espace TOLBO.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ent) {
    return (
      <div className="space-y-6">
        <div>
          <div className="section-title">Mon entreprise</div>
          <p className="muted mt-1">
            Gérez l’identité, les coordonnées et les informations publiques
            de votre organisation.
          </p>
        </div>

        <div className="card border-red-200 bg-red-50 p-6">
          <div className="flex gap-3">
            <div className="mt-0.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600">
                !
              </div>
            </div>

            <div>
              <p className="font-semibold text-red-900">
                Informations indisponibles
              </p>

              <p className="mt-1 text-sm leading-6 text-red-700">
                {error ||
                  "Aucune fiche entreprise n’a été trouvée pour votre organisation."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* ============================================================
          HEADER
      ============================================================ */}

      <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(16,24,40,0.06)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-[var(--blue)]" />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--blue-light)] text-[var(--blue)]">
                <Building2 className="h-7 w-7" />
              </div>

              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="badge badge-blue">
                    <Landmark className="h-3.5 w-3.5" />
                    Profil entreprise
                  </span>

                  {completion === 100 && (
                    <span className="badge badge-green">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Profil complet
                    </span>
                  )}
                </div>

                <h1 className="text-2xl font-bold tracking-[-0.03em] text-[var(--ink)] md:text-3xl">
                  {ent.legal_name || "Mon entreprise"}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                  Gérez les informations utilisées pour identifier votre
                  entreprise et construire votre profil au sein de TOLBO.
                </p>
              </div>
            </div>

            {/* Complétude */}
            <div className="min-w-[230px] rounded-2xl border border-slate-200 bg-[var(--bg-soft)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                  Complétude
                </span>

                <span className="text-lg font-bold text-[var(--ink)]">
                  {completion}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[var(--blue)] transition-all duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>

              <p className="mt-2 text-xs text-[var(--muted)]">
                {completion === 100
                  ? "Toutes les informations principales sont renseignées."
                  : "Complétez votre profil pour disposer d’un dossier plus complet."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          ALERTES
      ============================================================ */}

      {success && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

          <div>
            <p className="font-semibold">Enregistrement réussi</p>
            <p className="mt-0.5 text-emerald-700">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            !
          </div>

          <div>
            <p className="font-semibold">Impossible d’effectuer cette action</p>
            <p className="mt-0.5 text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* ============================================================
          CONTENU PRINCIPAL
      ============================================================ */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ==========================================================
            FORMULAIRE
        ========================================================== */}

        <form onSubmit={save} className="space-y-6">
          {/* IDENTITÉ */}
          <section className="card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-5 md:px-7">
              <div className="flex items-start gap-3">
                <div className="icon-box h-10 w-10 rounded-xl">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-[var(--ink)]">
                    Identité de l’entreprise
                  </h2>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Les informations essentielles permettant d’identifier
                    votre structure.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2 md:p-7">
              <div className="md:col-span-2">
                <label className="label">
                  Raison sociale
                  <span className="ml-1 text-[var(--blue)]">*</span>
                </label>

                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    className="field pl-10"
                    value={ent.legal_name || ""}
                    onChange={(e) =>
                      updateField("legal_name", e.target.value)
                    }
                    placeholder="Nom légal de l’entreprise"
                  />
                </div>
              </div>

              <div>
                <label className="label">Numéro d’identification</label>

                <div className="relative">
                  <Hash className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    className="field pl-10"
                    value={ent.registration_number || ""}
                    onChange={(e) =>
                      updateField("registration_number", e.target.value)
                    }
                    placeholder="Identifiant légal"
                  />
                </div>
              </div>

              <div>
                <label className="label">Secteur d’activité</label>

                <div className="relative">
                  <Landmark className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    className="field pl-10"
                    value={ent.sector || ""}
                    onChange={(e) =>
                      updateField("sector", e.target.value)
                    }
                    placeholder="Ex. Conseil, industrie, commerce..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* LOCALISATION */}
          <section className="card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-5 md:px-7">
              <div className="flex items-start gap-3">
                <div className="icon-box h-10 w-10 rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-[var(--ink)]">
                    Localisation
                  </h2>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Adresse et pays d’implantation de votre entreprise.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:p-7">
              <div>
                <label className="label">Adresse</label>

                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    className="field pl-10"
                    value={ent.address || ""}
                    onChange={(e) =>
                      updateField("address", e.target.value)
                    }
                    placeholder="Adresse du siège ou établissement principal"
                  />
                </div>
              </div>

              <div className="md:w-1/2">
                <label className="label">Pays</label>

                <div className="relative">
                  <Globe2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    className="field pl-10"
                    value={ent.country || ""}
                    onChange={(e) =>
                      updateField("country", e.target.value)
                    }
                    placeholder="Pays"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* PRÉSENCE DIGITALE */}
          <section className="card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-5 md:px-7">
              <div className="flex items-start gap-3">
                <div className="icon-box h-10 w-10 rounded-xl">
                  <Globe2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-[var(--ink)]">
                    Présence digitale
                  </h2>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Ajoutez le site officiel permettant de présenter votre
                    activité.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-7">
              <label className="label">Site web</label>

              <div className="relative">
                <Globe2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  className="field pl-10"
                  type="url"
                  value={ent.website || ""}
                  onChange={(e) =>
                    updateField("website", e.target.value)
                  }
                  placeholder="https://www.exemple.com"
                />
              </div>

              <p className="mt-2 text-xs text-[var(--muted)]">
                Utilisez l’adresse complète de votre site, avec
                <span className="font-medium"> https:// </span>
                lorsque cela est possible.
              </p>
            </div>
          </section>

          {/* ACTION */}
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(16,24,40,0.04)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">
                Mettre à jour votre profil
              </p>

              <p className="mt-1 text-xs text-[var(--muted)]">
                Les modifications seront enregistrées dans votre espace
                entreprise.
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary inline-flex items-center justify-center gap-2"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </form>

        {/* ==========================================================
            COLONNE DROITE
        ========================================================== */}

        <aside className="space-y-6">
          {/* LOGO */}
          <section className="card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="icon-box h-10 w-10 rounded-xl">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-[var(--ink)]">
                    Identité visuelle
                  </h2>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Logo de votre entreprise
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {org && <LogoUploader organizationId={org.id} />}

              <div className="mt-5 rounded-xl border border-slate-200 bg-[var(--bg-soft)] p-4">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue)]" />

                  <p className="text-xs leading-5 text-[var(--muted)]">
                    Le logo de votre entreprise est utilisé uniquement pour
                    votre espace client et vos restitutions autorisées. Il
                    reste distinct de l’identité officielle de TOLBO.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ÉTAT DU PROFIL */}
          <section className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">
                  État du profil
                </p>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Informations principales
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--blue-light)] text-sm font-bold text-[var(--blue)]">
                {completion}%
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <ProfileCheck
                label="Raison sociale"
                complete={Boolean(ent.legal_name?.trim())}
              />

              <ProfileCheck
                label="Identification"
                complete={Boolean(ent.registration_number?.trim())}
              />

              <ProfileCheck
                label="Secteur d’activité"
                complete={Boolean(ent.sector?.trim())}
              />

              <ProfileCheck
                label="Adresse"
                complete={Boolean(ent.address?.trim())}
              />

              <ProfileCheck
                label="Pays"
                complete={Boolean(ent.country?.trim())}
              />

              <ProfileCheck
                label="Site web"
                complete={Boolean(ent.website?.trim())}
              />
            </div>
          </section>

          {/* CONSEIL */}
          <section className="relative overflow-hidden rounded-2xl bg-[var(--navy)] p-6 text-white shadow-[0_14px_35px_rgba(8,27,51,0.16)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/5" />

            <div className="relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <h3 className="font-semibold">
                Un profil précis facilite l’évaluation
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Des informations d’entreprise structurées et à jour permettent
                de constituer un dossier plus complet et plus facilement
                exploitable.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* ================================================================
   SOUS-COMPOSANT — ÉTAT D’UNE INFORMATION
================================================================ */

function ProfileCheck({
  label,
  complete,
}: {
  label: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
      <span className="text-sm text-[var(--ink-2)]">{label}</span>

      {complete ? (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          Renseigné
        </span>
      ) : (
        <span className="text-xs font-medium text-[var(--muted)]">
          À compléter
        </span>
      )}
    </div>
  );
}