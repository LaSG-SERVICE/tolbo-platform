import type { ReactNode } from "react";
import { BarChart3, Bell, Building2, FileText, LockKeyhole, MessageSquare, Settings2, Users, ClipboardCheck, CheckCircle2, ArrowUpRight } from "lucide-react";

type Variant = "company"|"evaluations"|"documents"|"requests"|"members"|"notifications"|"score"|"settings";

const icons: Record<Variant, ReactNode> = {
  company: <Building2 size={18} />, evaluations: <ClipboardCheck size={18} />, documents: <FileText size={18} />, requests: <MessageSquare size={18} />, members: <Users size={18} />, notifications: <Bell size={18} />, score: <BarChart3 size={18} />, settings: <Settings2 size={18} />,
};
const titles: Record<Variant,string> = {company:"Profil entreprise",evaluations:"Évaluation",documents:"Documents",requests:"Demandes",members:"Organisation",notifications:"Activité",score:"Score Pass",settings:"Configuration"};

export function EnterpriseIllustration({variant}:{variant:Variant}){
  return <div className={`tolbo-illustration tolbo-illustration-${variant}`} aria-hidden="true">
    <div className="tolbo-illustration-orbit orbit-one"/><div className="tolbo-illustration-orbit orbit-two"/>
    <div className="tolbo-illustration-frame">
      <div className="tolbo-illustration-toolbar"><div className="tolbo-window-dots"><i/><i/><i/></div><span className="tolbo-toolbar-title">TOLBO <em>/</em> ESPACE ENTREPRISE</span><span className="tolbo-toolbar-secure"><LockKeyhole size={9}/> SECURE</span></div>
      <div className="tolbo-illustration-body">
        <div className="tolbo-illustration-sidebar"><b/><i/><i/><i/><i/><i/><span/></div>
        <div className="tolbo-illustration-canvas">
          <div className="tolbo-illustration-title"><span className="tolbo-illustration-icon">{icons[variant]}</span><div><b>{titles[variant]}</b><small>ESPACE ENTREPRISE · TOLBO</small></div><ArrowUpRight className="tolbo-mini-arrow" size={12}/></div>
          <div className="tolbo-illustration-widgets"><span><b>17%</b><small>COMPLÉTUDE</small></span><span><b>01</b><small>DOSSIER</small></span><span><b>ACTIF</b><small>STATUT</small></span></div>
          <div className="tolbo-illustration-detail"><div className="tolbo-illustration-chart"><i/><i/><i/><i/><i/><i/></div><div className="tolbo-illustration-lines"><span/><span/><span/><span/></div><div className="tolbo-illustration-check"><CheckCircle2 size={12}/><small>ESPACE CONTRÔLÉ</small></div></div>
        </div>
      </div>
      <div className="tolbo-illustration-status"><LockKeyhole size={10}/><span>ENVIRONNEMENT SÉCURISÉ</span><b/><small>24/7</small></div>
    </div>
  </div>
}
