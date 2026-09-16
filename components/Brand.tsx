"use client";
import Link from "next/link";
export function Brand({compact=false, logoUrl, organizationName}: {compact?:boolean; logoUrl?:string|null; organizationName?:string|null}) {
  return <Link href="/client" className={`tolbo-brand ${compact?'tolbo-brand-compact':''}`} aria-label="TOLBO — Espace entreprise">
    <span className="tolbo-brand-mark">{logoUrl ? <img src={logoUrl} alt="Logo de l’entreprise" /> : <span>T</span>}</span>
    <span className="tolbo-brand-copy"><strong>{organizationName || "Votre entreprise"}</strong><small>{organizationName ? "Espace entreprise" : "Enterprise Workspace"}</small></span>
  </Link>
}
