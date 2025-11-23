# Framework MCP – GraphWork

## 1. Idée générale : ton « framework MCP projet »

Tu as :

- Un **modèle de dossier `work/`** (vision, stories, specs, archi, qualité, data, compliance…).  
- Tu veux un **ensemble de MCP** qui :
  - lisent/écrivent dedans,
  - suivent toujours la même méthode,
  - créent aussi des **graphes** (Mermaid, Graphviz…) pour visualiser :  
    — l’architecture,  
    — les flux utilisateurs,  
    — les risques (evil stories),  
    — les dépendances de code.

Donc :  
➡️ On définit un **cadre unique (framework)** et on le décline en **rôles spécialisés**.

---

## 2. Gabarit de framework pour un MCP (template générique)

Tu peux utiliser ce squelette pour définir tous tes MCP, juste en changeant le rôle et les entrées/sorties.

```text
[IDENTITÉ]
Nom du MCP : <NOM_MCP>
Rôle : <résumé en une phrase>

[CONTEXTE STANDARD]
Tous les projets suivent la même structure de dossier `work/` (GraphWork Framework).

[ENTRÉES ATTENDUES]
- Ce que l’utilisateur te donne explicitement (texte, fichiers, extraits).
- Ce que tu peux aller lire dans le repo (fichiers `work/..` pertinents pour ton rôle).

[SORTIES ATTENDUES]
- Contenu à écrire/mettre à jour dans certains fichiers de `work/`.
- Sections structurées (titres, listes) prêtes à être copiées.

[PROCESSUS]
1) Vérifier si les fichiers dont tu as besoin existent.
2) Si des infos manquent : commencer par poser des QUESTIONS à l’utilisateur.
3) Quand tout est assez clair :
   - analyser,
   - proposer une structure,
   - produire le contenu final (texte + éventuellement diagrammes).

[CONTRAINTES GÉNÉRALES]
- Toujours structurer en sections numérotées.
- Toujours distinguer obligatoire vs optionnel.
- Toujours penser : lisibilité, simplicité, sécurité, testabilité.
```

Ce gabarit, tu le clones pour chaque MCP spécialisé.

---

## 3. MCP 1 – Vision du projet (`VisionMCP`)

**Objectif :** remplir / maintenir `work/01-vision/product_brief.md`.

- Clarifier la vision du projet, les objectifs, les contraintes et le hors-périmètre.  
- Produire aussi, si besoin, `executive_summary.md`, `uniqueness_proposition.md`, `glossary.md`, `synthesis.md`.

Le contenu suit la structure : Vision, Public cible, Problème, Objectifs, Contraintes, Hors périmètre, Questions.

---

## 4. MCP 2 – User stories + Evil stories (`StoryRiskMCP`)

**Objectif :** produire `user_stories.md` + `evil_stories.md` dans `work/01-vision/`.

- User stories :
  - Format : « En tant que <rôle>, je veux <action> afin de <valeur>. »
  - Avec priorité + critères d’acceptation.
- Evil stories :
  - Scénarios d’abus / risques (attaquant, utilisateur négligent, etc.).
  - Avec niveau de risque + idée de mitigation.

---

## 5. MCP 3 – Specs + Architecture + Graphes (`SpecArchiGraphMCP`)

Celui‑là est clé pour ton envie de **graphes** et d’analyse « parfaite ».

**Objectif :** transformer vision + stories + risques en :

- spé fonctionnelles (`work/02-specs/functional_spec.md`),
- spé non fonctionnelles (`work/02-specs/non_functional_spec.md`),
- architecture (`work/03-architecture/*.md`),
- diagrammes Mermaid.

[PROCESSUS]
1) Lire vision + stories + risques.  
2) Construire une vue « features » + vue « modules ».  
3) Déduire les graphes :
   - 1 graphe d’architecture globale (C4 simplifié),
   - 1 graphe de user flow principal,
   - 1 graphe liant certains risques à des composants.
4) Produire du texte + graphes Mermaid bien formattés, en indiquant dans quels fichiers de `work/` les mettre.

[CONTRAINTES]
- Préférer des architectures simples (pas de microservices par défaut).  
- Les graphes doivent être minimalistes mais lisibles.  
- Indiquer clairement dans quelle section/fichier chaque bloc doit aller.

---

## 6. MCP 4 – Plan d’implémentation (`PlanMCP`)

**Objectif :** construire la roadmap + backlog dans `work/04-delivery/` :

- `roadmap.md` : phases (MVP, v1, v2…).
- `tasks_backlog.md` : tâches techniques détaillées.

Ce MCP prend en entrée les specs/archi et découpe en phases + tâches actionnables.

---

## 7. MCP 5 – Dev assistant (`DevMCP`) et MCP 6 – Code review (`ReviewMCP`)

### DevMCP (pour implémenter une tâche)

**Objectif :** aider à implémenter une tâche précise du backlog.

- Entrées : tâche choisie, user stories concernées, extraits de code.  
- Sorties : plan d’implémentation, patchs de code, idées de tests, points d’attention.

### ReviewMCP (revue clean code + qualité)

**Objectif :** faire une revue stricte mais constructive.

- Entrées : diff ou fichiers modifiés.  
- Sorties : résumé, points positifs, problèmes (critique/important/mineur), refactorings proposés, tests à ajouter.

---

## 8. MCP 7 – Analyse + Graphes Code (`CodeGraphMCP`)

Pour aller plus loin sur l’**analyse du code + graphes auto**.

- Analyse la structure réelle du code (arborescence, modules).  
- Produit des graphes Mermaid :
  - graphe de modules / dépendances,
  - graphe de flux pour un use case important,
  - éventuellement graphe d’appels simplifié.
- Fait le lien entre code réel et architecture prévue dans `work/03-architecture`.

---

## 9. Comment tu utilises le framework en pratique

À chaque nouveau projet :

1. **Dossier `work/` standard**  
   Tu crées la structure `work/...` comme on l’a définie (en copiant depuis GraphWork).

2. **Pipeline MCP** :
   a. Appeler `VisionMCP` → remplit `product_brief.md` (et docs associés).  
   b. Appeler `StoryRiskMCP` → remplit `user_stories.md` + `evil_stories.md`.  
   c. Appeler `SpecArchiGraphMCP` → specs + architecture + graphes.  
   d. Appeler `PlanMCP` → roadmap + backlog.  
   e. Sur chaque tâche :  
      ▪ `DevMCP` pour implémenter.  
      ▪ `ReviewMCP` pour review.  
      ▪ éventuellement un MCP Tests/Security (ou réutiliser `ReviewMCP` + `CodeGraphMCP`) pour la qualité.  
   f. Régulièrement :  
      ▪ `CodeGraphMCP` pour regénérer des graphes d’architecture réelle.

3. **Toujours la même organisation** ≈ ton « framework projet » :
   - Même structure de docs,  
   - Même rôles MCP,  
   - Même style de sortie.

---

## 10. Prochaine étape

À partir de ce framework, tu peux :

- raffiner un MCP (par exemple `SpecArchiGraphMCP`) pour définir EXACTEMENT les sections, fichiers et types de graphes qu’il doit produire ;
- construire un fichier de config MCP (Cursor, etc.) qui utilise ce document comme référence de rôle/scope pour chaque agent.
