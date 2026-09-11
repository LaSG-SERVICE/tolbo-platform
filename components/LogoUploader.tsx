"use client";
import {useState} from "react";
import {createClient} from "@/lib/supabase/client";
export function LogoUploader({organizationId,onDone}:{organizationId:string;onDone?: (url:string)=>void}){
 const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
 async function upload(file?:File){if(!file)return; if(file.size>2*1024*1024){setMessage("Logo trop volumineux (2 Mo maximum).");return;} if(!["image/png","image/jpeg","image/webp","image/svg+xml"].includes(file.type)){setMessage("Format accepté : PNG, JPEG, WEBP ou SVG.");return;} setBusy(true);setMessage("");const sb=createClient();const ext=file.name.split(".").pop()?.toLowerCase()||"png";const path=`${organizationId}/logo.${ext}`;const {error}=await sb.storage.from("organization-logos").upload(path,file,{upsert:true,contentType:file.type});if(error){setMessage(error.message);setBusy(false);return;}const {data}=sb.storage.from("organization-logos").getPublicUrl(path);await sb.from("organizations").update({logo_url:data.publicUrl}).eq("id",organizationId);onDone?.(data.publicUrl);setMessage("Logo enregistré.");setBusy(false)}
 return <div className="grid gap-2"><label className="label">Logo de votre entreprise</label><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={e=>upload(e.target.files?.[0])} disabled={busy}/><span className="small muted">PNG, JPEG, WEBP ou SVG — 2 Mo maximum.</span>{message&&<span className="small">{message}</span>}</div>
}
