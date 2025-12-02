# Guide de publication des packages GraphWork sur npm

## Prérequis

1. **Compte npm** : Vous devez avoir un compte npm (https://www.npmjs.com/signup)
2. **Permissions** : Vous devez avoir les permissions pour publier dans l'organisation `@graphwork` ou utiliser un scope personnel
3. **Node.js** : Node.js 16.x ou supérieur
4. **npm** : npm 7.x ou supérieur

## Étapes de publication

### 1. Authentification

```bash
# Connectez-vous à votre compte npm
npm adduser

# Ou si vous utilisez un compte organisationnel
npm login
```

### 2. Vérification des packages

Avant de publier, vérifiez que tous les packages se construisent correctement :

```bash
# Construire tous les packages
npm run build

# Exécuter les tests (si disponibles)
npm test
```

### 3. Mise à jour des versions (si nécessaire)

Les packages sont actuellement en version `2.0.0-rc.1`. Vous pouvez :

- Publier tels quels en tant que release candidates (nécessite l'option `--tag`)
- Mettre à jour vers une version stable `2.0.0`

Pour mettre à jour les versions :

```bash
# Pour chaque package, mettez à jour le fichier package.json
# Ou utilisez npm version pour mettre à jour automatiquement
npm version 2.0.0 --workspaces
```

### 4. Publication des packages

#### Option 1 : Publication individuelle

Pour les versions release candidates :
```bash
# Publier chaque package individuellement avec le tag approprié
npm publish --workspace=@graphwork/cache --tag rc
npm publish --workspace=@graphwork/cli --tag rc
npm publish --workspace=@graphwork/core --tag rc
npm publish --workspace=@graphwork/knowledge-base --tag rc
npm publish --workspace=@graphwork/templates --tag rc
npm publish --workspace=@graphwork/tools --tag rc
npm publish --workspace=@graphwork/ai-integration --tag rc
npm publish --workspace=@graphwork/ai-agents --tag rc
```

Pour les versions stables :
```bash
# Publier chaque package individuellement
npm publish --workspace=@graphwork/cache
npm publish --workspace=@graphwork/cli
npm publish --workspace=@graphwork/core
npm publish --workspace=@graphwork/knowledge-base
npm publish --workspace=@graphwork/templates
npm publish --workspace=@graphwork/tools
npm publish --workspace=@graphwork/ai-integration
npm publish --workspace=@graphwork/ai-agents
```

#### Option 2 : Publication avec le script existant

```bash
# Utiliser le script de publication existant
npm run publish:packages
```

Note : Le script `publish:packages` exécute `node scripts/publish.js`, qui détecte automatiquement s'il faut utiliser un tag pour les versions préliminaires.

### 5. Vérification post-publication

Après publication, vérifiez que les packages sont disponibles sur npm :

- https://www.npmjs.com/package/@graphwork/cache
- https://www.npmjs.com/package/@graphwork/cli
- etc.

## Résolution des problèmes courants

### Erreurs de publication

1. **"You do not have permission to publish"**
   - Vérifiez que vous avez les permissions pour le scope `@graphwork`
   - Vous pouvez publier sous votre propre scope personnel en changeant le nom des packages

2. **"Package name too similar"**
   - npm peut bloquer la publication si les noms sont trop similaires à des packages existants
   - Utilisez un scope personnel si nécessaire

3. **"You must specify a tag using --tag when publishing a prerelease version"**
   - C'est une erreur courante avec les versions préliminaires (rc, beta, alpha)
   - Ajoutez `--tag rc` (ou le tag approprié) à la commande de publication
   - Ou mettez à jour vers une version stable

4. **Erreurs de build**
   - Assurez-vous que `npm run build` fonctionne sans erreurs
   - Vérifiez que tous les fichiers nécessaires sont inclus dans le package

### Problèmes de version

1. **"Version already exists"**
   - Incrémentez le numéro de version dans chaque `package.json`
   - Utilisez `npm version` pour gérer les mises à jour de version

## Bonnes pratiques

1. **Testez avant de publier**
   - Exécutez toujours les tests avant la publication
   - Utilisez des versions beta/alpha pour les pré-livraisons

2. **Documentation**
   - Assurez-vous que chaque package a un README.md clair
   - Documentez les options de configuration et les API

3. **Sécurité**
   - Vérifiez les dépendances pour les vulnérabilités
   - Utilisez `npm audit` pour identifier les problèmes de sécurité

## Structure des packages

Les packages suivants seront publiés :

1. `@graphwork/cache` - Système de cache LRU et mémoire
2. `@graphwork/cli` - Interface en ligne de commande
3. `@graphwork/core` - Moteur principal du framework
4. `@graphwork/knowledge-base` - Base de connaissances
5. `@graphwork/templates` - Templates pour la génération de code
6. `@graphwork/tools` - Outils de développement
7. `@graphwork/ai-integration` - Intégration avec les modèles d'IA
8. `@graphwork/ai-agents` - Agents IA spécialisés

## Support

Pour obtenir de l'aide supplémentaire :

- Documentation : https://docs.graphwork-framework.com
- Issues GitHub : https://github.com/graphmind/graphwork-framework/issues
- Discussions GitHub : https://github.com/graphmind/graphwork-framework/discussions