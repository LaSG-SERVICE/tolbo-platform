import { TolboLogo } from "@/components/TolboLogo";

type BrandProps = { compact?: boolean };

export function Brand({ compact = false }: BrandProps) {
  return <TolboLogo compact={compact} href={undefined} />;
}
