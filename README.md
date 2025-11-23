# GraphWork Framework

Un framework réutilisable pour structurer tous tes projets logiciels, pensé pour
travailler main dans la main avec des IA et des MCP (Model Context Protocol).

## Comment l’utiliser

1. Pour un nouveau projet, copie le dossier `work/` dans la racine du projet :
   - soit en clonant ce repo comme base,
   - soit en faisant un simple `cp -r graphwork-framework/work <ton-nouveau-projet>/`.
2. Remplis les fichiers étape par étape : vision, stories, specs, architecture, données, qualité.
3. Utilise ensuite ces docs avec tes MCP / IA (Cursor, etc.) comme source unique de vérité.

## Structure principale

- `work/01-vision/` : vision produit, user stories, evil stories.
- `work/02-specs/` : spécifications fonctionnelles et non fonctionnelles.
- `work/03-architecture/` : architecture logique, technique et diagrammes.
- `work/04-delivery/` : roadmap, backlog, plan d’implémentation.
- `work/05-quality/` : clean code, règles de qualité, tests.
- `work/06-data/` : modèle de données, tables, relations, diagrammes de base de données.
- `work/logs/` : décisions importantes et questions ouvertes.
- `work/prompts/` : prompts standard pour tes MCP / IA.

Tu peux renommer `GraphWork Framework` plus tard si tu préfères un autre nom.
