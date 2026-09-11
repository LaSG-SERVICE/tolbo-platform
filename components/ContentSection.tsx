import type { ReactNode } from "react";
export function ContentSection({children,className=""}:{children:ReactNode;className?:string}){return <section className={`pro-section ${className}`}><div className="pro-container">{children}</div></section>}
