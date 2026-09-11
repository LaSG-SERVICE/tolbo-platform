import type { ReactNode } from "react";
import { ClientShell } from "@/components/ClientShell";

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({
  children,
}: ClientLayoutProps) {
  return (
    <ClientShell>
      {children}
    </ClientShell>
  );
}