# ============================================================
# TOLBO - GENERATEUR DU THEME GRAPHIQUE
# ============================================================
#
# Ce script génère automatiquement les variables CSS
# utilisées par l'application web TOLBO.
#
# Technologie frontend :
#   Next.js + TypeScript + Tailwind CSS
#
# Langage de génération :
#   R
#
# Sortie :
#   app/tolbo-theme.css
#
# ============================================================

# ------------------------------------------------------------
# 1. PARAMETRES GENERAUX
# ------------------------------------------------------------

output_file <- file.path(
  "app",
  "tolbo-theme.css"
)

# ------------------------------------------------------------
# 2. IDENTITE VISUELLE TOLBO
# ------------------------------------------------------------

tolbo <- list(

  # Couleurs principales
  navy        = "#0B1F3A",
  navy_dark   = "#07162A",
  blue        = "#165DFF",
  blue_dark   = "#0D47C7",
  blue_light  = "#EAF1FF",

  # Couleurs complémentaires
  cyan        = "#06B6D4",
  violet      = "#6366F1",

  # Neutres
  white       = "#FFFFFF",
  background  = "#F7F9FC",
  surface     = "#FFFFFF",
  text        = "#172033",
  text_muted  = "#667085",
  border      = "#E4E7EC",

  # Etats
  success     = "#12B76A",
  success_bg  = "#ECFDF3",

  warning     = "#F79009",
  warning_bg  = "#FFFAEB",

  danger      = "#F04438",
  danger_bg   = "#FEF3F2",

  info        = "#2E90FA",
  info_bg     = "#EFF8FF"
)

# ------------------------------------------------------------
# 3. DESIGN TOKENS
# ------------------------------------------------------------

tokens <- list(

  radius_sm = "8px",
  radius_md = "12px",
  radius_lg = "18px",
  radius_xl = "24px",

  shadow_sm = "0 1px 3px rgba(16, 24, 40, 0.08)",
  shadow_md = "0 8px 24px rgba(16, 24, 40, 0.08)",
  shadow_lg = "0 20px 50px rgba(16, 24, 40, 0.12)",

  max_width = "1200px",

  transition = "all 180ms ease"
)

# ------------------------------------------------------------
# 4. GENERATION CSS
# ------------------------------------------------------------

css <- sprintf(
":root {

  /* ========================================================
     TOLBO COLORS
     ======================================================== */

  --tolbo-navy: %s;
  --tolbo-navy-dark: %s;

  --tolbo-blue: %s;
  --tolbo-blue-dark: %s;
  --tolbo-blue-light: %s;

  --tolbo-cyan: %s;
  --tolbo-violet: %s;

  --tolbo-white: %s;
  --tolbo-background: %s;
  --tolbo-surface: %s;

  --tolbo-text: %s;
  --tolbo-text-muted: %s;
  --tolbo-border: %s;

  /* ========================================================
     STATUS
     ======================================================== */

  --tolbo-success: %s;
  --tolbo-success-bg: %s;

  --tolbo-warning: %s;
  --tolbo-warning-bg: %s;

  --tolbo-danger: %s;
  --tolbo-danger-bg: %s;

  --tolbo-info: %s;
  --tolbo-info-bg: %s;

  /* ========================================================
     DESIGN SYSTEM
     ======================================================== */

  --tolbo-radius-sm: %s;
  --tolbo-radius-md: %s;
  --tolbo-radius-lg: %s;
  --tolbo-radius-xl: %s;

  --tolbo-shadow-sm: %s;
  --tolbo-shadow-md: %s;
  --tolbo-shadow-lg: %s;

  --tolbo-max-width: %s;

  --tolbo-transition: %s;
}

/* ==========================================================
   BASE
   ========================================================== */

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--tolbo-background);
  color: var(--tolbo-text);

  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    \"Segoe UI\",
    sans-serif;

  -webkit-font-smoothing: antialiased;
}

/* ==========================================================
   LINKS
   ========================================================== */

a {
  color: inherit;
  text-decoration: none;
}

/* ==========================================================
   CONTAINER
   ========================================================== */

.tolbo-container {
  width: min(
    calc(100%% - 48px),
    var(--tolbo-max-width)
  );

  margin-inline: auto;
}

/* ==========================================================
   BUTTONS
   ========================================================== */

.tolbo-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 8px;

  min-height: 48px;

  padding:
    0 22px;

  border-radius:
    var(--tolbo-radius-md);

  font-weight: 700;

  border: 1px solid transparent;

  cursor: pointer;

  transition:
    var(--tolbo-transition);
}

.tolbo-button-primary {
  color: var(--tolbo-white);
  background: var(--tolbo-blue);

  box-shadow:
    0 8px 18px
    rgba(22, 93, 255, 0.20);
}

.tolbo-button-primary:hover {
  background: var(--tolbo-blue-dark);

  transform:
    translateY(-1px);

  box-shadow:
    0 12px 24px
    rgba(22, 93, 255, 0.25);
}

.tolbo-button-secondary {
  color: var(--tolbo-navy);

  background:
    var(--tolbo-white);

  border-color:
    var(--tolbo-border);
}

.tolbo-button-secondary:hover {
  border-color:
    var(--tolbo-blue);

  color:
    var(--tolbo-blue);
}

/* ==========================================================
   CARD
   ========================================================== */

.tolbo-card {

  background:
    var(--tolbo-surface);

  border:
    1px solid var(--tolbo-border);

  border-radius:
    var(--tolbo-radius-lg);

  box-shadow:
    var(--tolbo-shadow-sm);

  transition:
    var(--tolbo-transition);
}

.tolbo-card:hover {

  transform:
    translateY(-3px);

  box-shadow:
    var(--tolbo-shadow-md);
}

/* ==========================================================
   BADGE
   ========================================================== */

.tolbo-badge {

  display: inline-flex;

  align-items: center;

  gap: 6px;

  padding:
    6px 10px;

  border-radius:
    999px;

  font-size:
    13px;

  font-weight:
    700;

  background:
    var(--tolbo-blue-light);

  color:
    var(--tolbo-blue);
}

/* ==========================================================
   HERO
   ========================================================== */

.tolbo-hero {

  position:
    relative;

  overflow:
    hidden;

  background:
    linear-gradient(
      135deg,
      var(--tolbo-navy) 0%%,
      #102F57 55%%,
      #163E72 100%%
    );

  color:
    var(--tolbo-white);

  border-radius:
    0 0 32px 32px;
}

.tolbo-hero::before {

  content:
    \"\";

  position:
    absolute;

  width:
    500px;

  height:
    500px;

  border-radius:
    50%%;

  background:
    rgba(255,255,255,0.06);

  top:
    -250px;

  right:
    -120px;
}

/* ==========================================================
   SCORE CARD
   ========================================================== */

.tolbo-score-card {

  background:
    rgba(255,255,255,0.10);

  border:
    1px solid rgba(255,255,255,0.18);

  backdrop-filter:
    blur(16px);

  border-radius:
    var(--tolbo-radius-xl);

  box-shadow:
    var(--tolbo-shadow-lg);
}

/* ==========================================================
   RESPONSIVE
   ========================================================== */

@media (max-width: 768px) {

  .tolbo-container {

    width:
      min(
        calc(100%% - 32px),
        var(--tolbo-max-width)
      );
  }

  .tolbo-hero {

    border-radius:
      0 0 24px 24px;
  }

}
",
tolbo$navy,
tolbo$navy_dark,
tolbo$blue,
tolbo$blue_dark,
tolbo$blue_light,
tolbo$cyan,
tolbo$violet,
tolbo$white,
tolbo$background,
tolbo$surface,
tolbo$text,
tolbo$text_muted,
tolbo$border,
tolbo$success,
tolbo$success_bg,
tolbo$warning,
tolbo$warning_bg,
tolbo$danger,
tolbo$danger_bg,
tolbo$info,
tolbo$info_bg,
tokens$radius_sm,
tokens$radius_md,
tokens$radius_lg,
tokens$radius_xl,
tokens$shadow_sm,
tokens$shadow_md,
tokens$shadow_lg,
tokens$max_width,
tokens$transition
)

# ------------------------------------------------------------
# 5. CREATION DU DOSSIER SI NECESSAIRE
# ------------------------------------------------------------

if (!dir.exists("app")) {
  dir.create("app", recursive = TRUE)
}

# ------------------------------------------------------------
# 6. ECRITURE DU FICHIER
# ------------------------------------------------------------

writeLines(
  css,
  con = output_file,
  useBytes = TRUE
)

cat("\n")
cat("============================================\n")
cat(" TOLBO DESIGN SYSTEM\n")
cat("============================================\n")
cat("\n")
cat("Theme CSS genere avec succes.\n")
cat("\n")
cat("Fichier :", output_file, "\n")
cat("\n")
cat("Couleur principale :", tolbo$blue, "\n")
cat("Couleur institutionnelle :", tolbo$navy, "\n")
cat("\n")
cat("============================================\n")