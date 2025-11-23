# MCP utilisés avec GraphWork

Ce document liste les MCP que tu peux utiliser avec le framework GraphWork et leur rôle.

## VisionMCP
- **Rôle :** clarifier et maintenir la vision du projet.  
- **Lit / écrit :** `work/01-vision/product_brief.md`, `executive_summary.md`, `uniqueness_proposition.md`, `glossary.md`, `synthesis.md`.  
- **Principales sorties :** vision, objectifs, contraintes, hors périmètre, questions ouvertes.

## StoryRiskMCP
- **Rôle :** produire les user stories et evil stories.  
- **Lit :** `work/01-vision/product_brief.md`.  
- **Écrit :** `work/01-vision/user_stories.md`, `work/01-vision/evil_stories.md`.  
- **Principales sorties :** stories avec critères d’acceptation, risques + mitigations.

## SpecArchiGraphMCP
- **Rôle :** transformer vision + stories + risques en specs, architecture et graphes.  
- **Lit :** `work/01-vision/*.md`, `work/02-specs/*.md` (si déjà existants).  
- **Écrit :** `work/02-specs/functional_spec.md`, `work/02-specs/non_functional_spec.md`, `work/03-architecture/*.md`.  
- **Graphes :**
  - architecture globale,  
  - user flow principal,  
  - liens risques ↔ composants.

## PlanMCP
- **Rôle :** créer la roadmap et le backlog à partir des specs/archi.  
- **Lit :** `work/02-specs/*.md`, `work/03-architecture/*.md`.  
- **Écrit :** `work/04-delivery/roadmap.md`, `work/04-delivery/tasks_backlog.md`, éventuellement `project_plan.md`.

## DevMCP
- **Rôle :** assister pour implémenter une tâche précise du backlog.  
- **Lit :** code source + `work/04-delivery/tasks_backlog.md` + stories concernées.  
- **Écrit :** propositions de patchs de code, exemples de tests (hors `work/`, dans le code du projet).

## ReviewMCP
- **Rôle :** faire la revue de code (clean code, qualité, sécurité de base).  
- **Lit :** diffs ou fichiers modifiés.  
- **Écrit :** commentaires de review, suggestions de refactorings, idées de tests.

## CodeGraphMCP
- **Rôle :** analyser le code pour produire des graphes de structure et de flux.  
- **Lit :** arborescence du projet, fichiers clés (entrypoints, routes, services…).  
- **Écrit :** graphes Mermaid (dépendances, flux) que tu peux coller dans `work/03-architecture/diagrams.md` ou équivalent.

## (Optionnel) ComplianceMCP / SecurityMCP
- **Rôle :** se concentrer sur la conformité, la sécurité renforcée et la résilience.  
- **Lit :** `work/07-compliance/*.md`, `work/05-quality/*.md`, specs et archi.  
- **Écrit :** recommandations dans `data_governance.md`, `legal_aspects.md`, `disaster_recovery.md`, `devsecops.md`.

Tu peux utiliser ce fichier comme référence quand tu configures tes MCP dans Cursor ou un autre outil : pour chaque MCP, tu copies son rôle et les fichiers `work/` qu’il doit considérer en priorité.
