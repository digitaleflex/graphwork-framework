# 03 – Architecture

Ici tu décris **comment le système est structuré techniquement**.

## Fichiers recommandés

- `architecture_overview.md` : description haut niveau des couches/modules.
- `boundaries.md` : frontières entre front/back, API, services externes.
- `components.md` (optionnel) : composants internes importants.

## Diagrammes possibles

### 1. Architecture logique (type C4 – Container)

```mermaid
graph TD
  User[Utilisateur] --> WebApp[Web App]
  WebApp --> API[API Backend]
  API --> DB[(Base de données)]
  API --> External[Service externe]
```

### 2. Séquence pour un cas d’usage clé

```mermaid
sequenceDiagram
  participant U as User
  participant W as WebApp
  participant A as API
  participant D as DB

  U->>W: Action principale
  W->>A: Appel API
  A->>D: Lecture/écriture
  D-->>A: Résultat
  A-->>W: Réponse
  W-->>U: Affichage
```
