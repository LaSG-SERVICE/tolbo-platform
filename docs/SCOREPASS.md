# Intégration Score Pass

Le référentiel source est conservé dans `data/Parametrage_du_moteur_Score_Pass_V1.xlsx` et son snapshot structuré dans `data/scorepass-v1.json`.

## Calculs actuellement codés
- pondération D1–D6 V1 ;
- renormalisation des dimensions non applicables ;
- arrondi final du Score Pass ;
- IQP séparé ;
- blocage par hard gate.

## Calculs non inventés
Les 24 formules d'indicateurs et les seuils de normalisation détaillés sont explicitement à formaliser/calibrer dans le référentiel. Ils doivent être approuvés avant production. Le moteur ne crée pas de seuil arbitraire.

## Référentiel SQL
`supabase/migrations/002_scorepass_reference.sql` charge les feuilles principales du classeur dans des tables de référence afin de rendre la configuration consultable depuis PostgreSQL.
