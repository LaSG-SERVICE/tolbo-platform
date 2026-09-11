import Image from "next/image";
import Link from "next/link";

type Props = { href?: string; compact?: boolean; light?: boolean };

export function TolboLogo({ href = "/", compact = false, light = false }: Props) {
  const image = (
    <span className={`tolbo-logo-stage ${compact ? "is-compact" : ""} ${light ? "is-light" : ""}`}>
      <span className="tolbo-logo-orbit orbit-one" />
      <span className="tolbo-logo-orbit orbit-two" />
      <span className="tolbo-logo-shine" />
      <Image
        src="/branding/tolbo-logo-cropped.png"
        alt="TOLBO — La confiance devient un actif."
        width={720}
        height={252}
        priority
        className="tolbo-logo-image"
      />
    </span>
  );
  return href ? <Link href={href} aria-label="TOLBO — accueil">{image}</Link> : image;
}
