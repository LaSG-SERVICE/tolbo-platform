import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
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
  let configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (configured) {
    const sb = await createClient();
    const { data: { user } } = await sb.auth.getUser();

    if (user) {
      const { data: membership } = await sb
        .from("organization_members")
        .select("organization_id,organizations(name)")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      if (membership?.organizations && !Array.isArray(membership.organizations)) {
        orgName = (membership.organizations as { name?: string }).name ?? orgName;
      }
    }
  }

  return (
    <main className="tolbo-client-page tolbo-dashboard">
      <div className="container">
        <section className="tolbo-dashboard-hero">
          <div className="tolbo-dashboard-hero-bg" />
          <div className="tolbo-dashboard-hero-content">
            <div>
              <div className="tolbo-overline tolbo-overline-light">
                <Building2 className="h-3.5 w-3.5" /> ESPACE ENTREPRISE
              </div>
              <h1>Bonjour, bienvenue dans votre espace TOLBO.</h1>
              <p>
                Pilotez votre dossier depuis un seul espace : profil entreprise,
                évaluations, justificatifs et suivi des demandes.
              </p>
              <div className="tolbo-hero-meta">
                <span><span className="tolbo-status-dot" /> Espace sécurisé</span>
                <span>Organisation · {orgName}</span>
              </div>
            </div>
            <div className="tolbo-dashboard-hero-actions">
              <Link href="/client/evaluations/new" className="tolbo-btn tolbo-btn-light">
                <Plus className="h-4 w-4" /> Nouvelle évaluation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/client/company" className="tolbo-btn tolbo-btn-ghost-light">
                Vérifier mon profil
              </Link>
            </div>
          </div>
        </section>

        <section className="tolbo-dashboard-status">
          <div>
            <div className="tolbo-overline">VUE D’ENSEMBLE</div>
            <h2>Suivi de votre dossier</h2>
            <p>Votre parcours TOLBO est prêt à être complété étape par étape.</p>
          </div>
          <div className="tolbo-progress-block">
            <div className="tolbo-progress-top"><strong>17%</strong><span>complété</span></div>
            <div className="tolbo-progress"><span style={{ width: "17%" }} /></div>
            <span className="tolbo-progress-note">Prochaine priorité : compléter le profil entreprise</span>
          </div>
        </section>

        <section className="tolbo-dashboard-kpis">
          <KpiCard icon={<Building2 />} label="Profil entreprise" value="17%" note="Informations à compléter" tone="blue" />
          <KpiCard icon={<ClipboardCheck />} label="Évaluation" value="1" note="Dossier actuellement suivi" tone="navy" />
          <KpiCard icon={<FileText />} label="Documents" value={configured ? "—" : "0"} note="Justificatifs transmis" tone="slate" />
          <KpiCard icon={<Clock3 />} label="Statut" value="En cours" note="Traitement du dossier" tone="orange" />
        </section>

        <section className="tolbo-dashboard-grid">
          <div className="tolbo-panel tolbo-panel-main">
            <div className="tolbo-panel-head">
              <div>
                <div className="tolbo-overline">PARCOURS TOLBO</div>
                <h2>Les prochaines étapes</h2>
                <p>Avancez dans l’ordre recommandé pour constituer un dossier exploitable.</p>
              </div>
              <span className="tolbo-chip">Score Pass V1</span>
            </div>
            <div className="tolbo-step-list">
              <JourneyStep number="01" title="Compléter le profil entreprise" description="Identité, secteur, localisation et informations de référence." status="Prioritaire" href="/client/company" active />
              <JourneyStep number="02" title="Renseigner l’évaluation" description="Compléter les données nécessaires à votre dossier Score Pass." status="À préparer" href="/client/evaluations" />
              <JourneyStep number="03" title="Déposer les justificatifs" description="Centraliser les documents permettant d’étayer les informations déclarées." status="À préparer" href="/client/documents" />
              <JourneyStep number="04" title="Répondre aux demandes TOLBO" description="Consulter les éventuels compléments demandés par l’équipe TOLBO." status="À suivre" href="/client/requests" />
              <JourneyStep number="05" title="Consulter le Score Pass" description="Retrouver le résultat et les éléments de lecture de votre évaluation." status="À venir" href="/client/score-pass" />
            </div>
          </div>

          <aside className="tolbo-dashboard-side">
            <div className="tolbo-panel tolbo-actions-panel">
              <div className="tolbo-overline">ACTIONS RAPIDES</div>
              <h2>Que souhaitez-vous faire ?</h2>
              <p>Accédez directement aux fonctions les plus utilisées.</p>
              <div className="tolbo-action-list">
                <ActionButton href="/client/company" icon={<Building2 />} label="Compléter mon entreprise" />
                <ActionButton href="/client/documents" icon={<Upload />} label="Ajouter un document" />
                <ActionButton href="/client/requests" icon={<FileCheck2 />} label="Voir les demandes" />
              </div>
            </div>

            <div className="tolbo-panel tolbo-score-card">
              <div className="tolbo-score-icon"><BarChart3 /></div>
              <div className="tolbo-overline">SCORE PASS</div>
              <h2>Préparez votre évaluation</h2>
              <p>Un dossier complet facilite la vérification des données et la lecture de votre évaluation.</p>
              <Link href="/client/score-pass" className="tolbo-text-link">Ouvrir Score Pass <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </aside>
        </section>

        <section className="tolbo-dashboard-bottom">
          <div className="tolbo-info-strip">
            <div className="tolbo-info-icon"><ShieldCheck /></div>
            <div><strong>Vos données restent dans votre espace organisationnel.</strong><p>Les statuts et résultats affichés ici sont alimentés par les modules connectés de TOLBO.</p></div>
          </div>
          <Link href="/client/notifications" className="tolbo-activity-link"><span><CheckCircle2 /> Centre de notifications</span><ArrowRight /></Link>
        </section>
      </div>
    </main>
  );
}

function KpiCard({ icon, label, value, note, tone }: { icon: React.ReactNode; label: string; value: string; note: string; tone: "blue" | "navy" | "slate" | "orange" }) {
  return <div className={`tolbo-kpi tolbo-kpi-${tone}`}><div className="tolbo-kpi-top"><span className="tolbo-kpi-icon">{icon}</span><span className="tolbo-kpi-label">{label}</span></div><strong>{value}</strong><span>{note}</span></div>;
}

function JourneyStep({ number, title, description, status, href, active = false }: { number: string; title: string; description: string; status: string; href: string; active?: boolean }) {
  return <Link href={href} className={`tolbo-step ${active ? "is-active" : ""}`}><span className="tolbo-step-number">{number}</span><span className="tolbo-step-copy"><span className="tolbo-step-title">{title}</span><span className="tolbo-step-description">{description}</span></span><span className={`tolbo-step-status ${active ? "is-priority" : ""}`}>{status}</span><ArrowRight className="tolbo-step-arrow" /></Link>;
}

function ActionButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return <Link href={href} className="tolbo-action"><span>{icon}</span><strong>{label}</strong><ArrowRight /></Link>;
}
