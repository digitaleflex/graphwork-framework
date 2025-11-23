# GraphWork Framework - Guide Universel de Développement Assisté par IA

Framework de structuration de projets logiciels, conçu pour travailler
main dans la main avec des IA et des MCP (Model Context Protocol).
Ce guide sert de base de connaissance solide pour permettre à des outils de développement assisté par IA de générer du code de qualité dans n'importe quel projet.

- **Repo GitHub :** https://github.com/2vivien/graphwork-framework

## Vision

GraphWork vise à offrir une ossature simple mais robuste pour n'importe quel projet :

- un dossier `work/` toujours organisé de la même façon,
- des documents clairs (vision, stories, specs, archi, qualité, data, compliance),
- une base de connaissance suffisante pour que des IA puissent générer du code cohérent et de qualité,
- une intégration naturelle avec des agents IA / MCP (Cursor, autres) pour automatiser
  l'analyse, la génération de code, la revue et les graphes.

## Pour qui ?

- Développeurs solo qui veulent travailler "comme en équipe produit".
- Petites équipes qui utilisent des IA / MCP pour accélérer le delivery.
- Tech leads / architectes qui veulent un langage commun pour la vision, l'architecture,
  les données et la qualité.
- Créateurs de produits qui veulent industrialiser leurs workflows IA
  (vision → stories → specs → archi → roadmap → code → review).
- Toute personne souhaitant un guide universel pour le développement assisté par IA.

## Structure principale du dossier `work/` (Base de connaissance pour IA)

- `work/01-vision/` : vision produit, user stories, evil stories, résumé exécutif - *fournit le contexte métier à l'IA*
- `work/02-specs/` : spécifications fonctionnelles et non fonctionnelles - *spécifie le comportement attendu du système*
- `work/03-architecture/` : architecture logique, technique, diagrammes d'architecture - *guide l'IA dans la structure du code*
- `work/04-delivery/` : roadmap, backlog, plan d'implémentation - *aide l'IA à comprendre l'évolution du projet*
- `work/05-quality/` : clean code, standards, tests, DevSecOps, checklists qualité - *indique à l'IA les standards à respecter*
- `work/06-data/` : modèle de données, tables, relations, migrations - *informe l'IA sur la structure des données*
- `work/07-compliance/` : gouvernance des données, aspects légaux, reprise d'activité - *assure la conformité du code généré*
- `work/logs/` : décisions importantes et questions ouvertes - *fournit le contexte historique au développement*
- `work/prompts/` : prompts standard pour orchestrer les IA / MCP - *facilite l'interaction avec les assistants IA*
- `work/templates/` : templates de code et structures réutilisables - *permet à l'IA de générer du code cohérent*

Pour le détail complet, voir `MCP-Framework.md` et `MCP-Agents.md` dans ce dépôt.

## Quickstart - Utilisation comme Guide Universel

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
   - templates : créer des templates de code pour votre stack technologique.
4. **Fournir le dossier `work/` à vos outils IA** comme base de connaissance pour générer du code cohérent et de qualité.

## Intégration avec MCP / IA pour le développement assisté

GraphWork est pensé pour être utilisé avec un ensemble d'agents spécialisés :

- `VisionMCP` : clarifier la vision et remplir `01-vision`.
- `StoryRiskMCP` : générer user stories + evil stories.
- `SpecArchiGraphMCP` : produire specs, archi et graphes Mermaid.
- `PlanMCP` : construire roadmap et backlog.
- `DevMCP` : assister l'implémentation de chaque tâche.
- `ReviewMCP` : revue de code orientée qualité / sécurité.
- `CodeGraphMCP` : analyser le code réel et produire des graphes de structure.
- `TemplateMCP` : générer des templates de code réutilisables.
- (Optionnel) `ComplianceMCP` / `SecurityMCP` : conformité, gouvernance, résilience.

Ces agents sont conçus pour travailler avec la base de connaissance fournie par le dossier `work/`.

## Guide pour une Base de Connaissance Solide

Pour que ce framework serve effectivement de guide universel pour le développement assisté par IA, assurez-vous de compléter les éléments suivants :

1. **Documentation claire** : Chaque fichier doit être suffisamment détaillé pour être compris par une IA
2. **Exemples concrets** : Fournir des exemples de code et d'implémentation
3. **Standards explicites** : Définir clairement les conventions de codage et les standards
4. **Architecture bien documentée** : Documenter l'architecture pour guider les générations de code
5. **Templates de code** : Créer des templates réutilisables pour différentes couches du système

## Licence

Tu peux adapter GraphWork à ton contexte (structure de dossiers, noms, prompts IA).
Ajoute la licence de ton choix si tu publies ce dépôt (MIT, Apache 2.0, etc.).
