import type { ReactNode } from "react";
import { MarketingHeader } from "@/components/MarketingHeader";
import { MarketingFooter } from "@/components/MarketingFooter";

export function MarketingPage({ children }: { children: ReactNode }) {
  return (
    <div className="pro-site">
      <MarketingHeader />
      <main id="main-content">{children}</main>
      <MarketingFooter />
    </div>
  );
}
