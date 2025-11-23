# GraphWork Framework CLI

Interface en ligne de commande pour le GraphWork Framework 2.0

## Commandes disponibles

### `gw init`
Initialise un nouveau projet avec la structure GraphWork

```
gw init [options] [project-name]
```

Options:
- `--template <type>`: Type de template à utiliser (backend, frontend, fullstack, etc.)
- `--tech <technologies>`: Technologies à inclure (react,nodejs,postgresql,etc.)
- `--domain <domaine>`: Domaine d'application (ecommerce,social,finance,etc.)
- `--pattern <pattern>`: Patron architectural à utiliser (mvc,microservices,event-driven,etc.)

### `gw generate`
Génère des composants en utilisant les templates et l'IA

```
gw generate [type] [options]
```

Types disponibles:
- `controller`: Contrôleur backend
- `service`: Service backend
- `component`: Composant frontend
- `model`: Modèle de données
- `api`: Endpoint API
- `test`: Tests unitaires/intégration

Options:
- `--name <nom>`: Nom du composant à générer
- `--context <fichier>`: Fichier de contexte à utiliser
- `--template <chemin>`: Template personnalisé à utiliser

### `gw validate`
Valide la qualité, la sécurité et la conformité du code

```
gw validate [options]
```

Options:
- `--quality`: Vérifie les standards de qualité
- `--security`: Vérifie les aspects de sécurité
- `--compliance`: Vérifie la conformité aux standards
- `--all`: Effectue toutes les vérifications

### `gw analyze`
Analyse le projet pour identifier les opportunités d'amélioration

```
gw analyze [options]
```

Options:
- `--architecture`: Analyse architecturale
- `--dependencies`: Analyse des dépendances
- `--performance`: Analyse des performances
- `--security`: Analyse de sécurité

### `gw publish`
Publie les templates ou composants dans le registre

```
gw publish [type] [chemin]
```

Types:
- `template`: Publier un template
- `component`: Publier un composant
- `plugin`: Publier un plugin