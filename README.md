# GraphWork Framework

Framework de structuration de projets logiciels, conçu pour travailler
main dans la main avec des IA et des MCP (Model Context Protocol).

- **Repo GitHub :** https://github.com/2vivien/graphwork-framework

## Vision

GraphWork vise à offrir une ossature simple mais robuste pour n’importe quel projet :

- un dossier `work/` toujours organisé de la même façon,
- des documents clairs (vision, stories, specs, archi, qualité, data, compliance),
- une intégration naturelle avec des agents IA / MCP (Cursor, autres) pour automatiser
  l’analyse, la génération de code, la revue et les graphes.

## Pour qui ?

- Développeurs solo qui veulent travailler "comme en équipe produit".
- Petites équipes qui utilisent des IA / MCP pour accélérer le delivery.
- Tech leads / architectes qui veulent un langage commun pour la vision, l’architecture,
  les données et la qualité.
- Créateurs de produits qui veulent industrialiser leurs workflows IA
  (vision → stories → specs → archi → roadmap → code → review).

## Structure principale du dossier `work/`

- `work/01-vision/` : vision produit, user stories, evil stories, résumé exécutif.
- `work/02-specs/` : spécifications fonctionnelles et non fonctionnelles.
- `work/03-architecture/` : architecture logique, technique, diagrammes d’architecture.
- `work/04-delivery/` : roadmap, backlog, plan d’implémentation.
- `work/05-quality/` : clean code, standards, tests, DevSecOps, checklists qualité.
- `work/06-data/` : modèle de données, tables, relations, migrations.
- `work/07-compliance/` : gouvernance des données, aspects légaux, reprise d’activité.
- `work/logs/` : décisions importantes et questions ouvertes.
- `work/prompts/` : prompts standard pour orchestrer les IA / MCP.

Pour le détail complet, voir `MCP-Framework.md` et `MCP-Agents.md` dans ce dépôt.

## Quickstart

1. **Cloner le repo** :
   ```bash
   git clone https://github.com/2vivien/graphwork-framework.git
   ```
2. **Créer un nouveau projet** et y copier le dossier `work/` :
   ```bash
   cd /chemin/vers/ton-nouveau-projet
   cp -r /chemin/vers/graphwork-framework/work ./
   ```
3. **Remplir progressivement `work/`** :
   - 01-vision : idée, objectifs, user stories, evil stories.
   - 02-specs / 03-architecture : specs fonctionnelles et archi + diagrammes.
   - 04-delivery : roadmap et backlog.
   - 05-quality / 06-data / 07-compliance : qualité, données, conformité.
4. **Brancher tes IA / MCP** sur ce dossier `work/` en utilisant
   les prompts définis dans `work/prompts/`.

## Intégration avec MCP / IA

GraphWork est pensé pour être utilisé avec un ensemble d’agents spécialisés :

- `VisionMCP` : clarifier la vision et remplir `01-vision`.
- `StoryRiskMCP` : générer user stories + evil stories.
- `SpecArchiGraphMCP` : produire specs, archi et graphes Mermaid.
- `PlanMCP` : construire roadmap et backlog.
- `DevMCP` : assister l’implémentation de chaque tâche.
- `ReviewMCP` : revue de code orientée qualité / sécurité.
- `CodeGraphMCP` : analyser le code réel et produire des graphes de structure.
- (Optionnel) `ComplianceMCP` / `SecurityMCP` : conformité, gouvernance, résilience.

Ces agents sont décrits en détail dans `MCP-Framework.md` et `MCP-Agents.md`.

## Licence

Tu peux adapter GraphWork à ton contexte (structure de dossiers, noms, prompts IA).
Ajoute la licence de ton choix si tu publies ce dépôt (MIT, Apache 2.0, etc.).
