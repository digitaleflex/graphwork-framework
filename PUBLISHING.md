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

Les packages sont actuellement en version `2.0.0`. Vous pouvez :

- Publier tels quels en tant que versions stables
- Mettre à jour vers une nouvelle version mineure/majeure

Pour mettre à jour les versions :

```bash
# Pour chaque package, mettez à jour le fichier package.json
# Ou utilisez npm version pour mettre à jour automatiquement
npm version 2.0.1 --workspaces
```

### 4. Publication des packages

#### Option 1 : Publication individuelle

Pour les versions stables :
```bash
# Publier chaque package individuellement avec accès public
npm publish --workspace=packages/graphwork-cache --access public
npm publish --workspace=packages/graphwork/cli --access public
npm publish --workspace=packages/graphwork/core --access public
npm publish --workspace=packages/graphwork/knowledge-base --access public
npm publish --workspace=packages/graphwork/templates --access public
npm publish --workspace=packages/graphwork/tools --access public
npm publish --workspace=packages/graphwork/ai-integration --access public
npm publish --workspace=packages/graphwork/ai-agents --access public
```

#### Option 2 : Publication avec le script existant

```bash
# Utiliser le script de publication existant
npm run publish:packages
```

Note : Le script `publish:packages` exécute `node scripts/publish.js`, qui détecte automatiquement s'il faut utiliser un tag pour les versions préliminaires et publie avec `--access public` pour éviter les frais.

### 5. Vérification post-publication

Après publication, vérifiez que les packages sont disponibles sur npm :

- https://www.npmjs.com/package/graphwork-cache
- https://www.npmjs.com/package/graphwork-cli
- etc.

## Résolution des problèmes courants

### Erreurs de publication

1. **"You do not have permission to publish"**
   - Vérifiez que vous avez les permissions pour le scope
   - Vous pouvez publier sous votre propre scope personnel en changeant le nom des packages

2. **"Package name too similar"**
   - npm peut bloquer la publication si les noms sont trop similaires à des packages existants
   - Utilisez un scope personnel si nécessaire

3. **"You must specify a tag using --tag when publishing a prerelease version"**
   - C'est une erreur courante avec les versions préliminaires (rc, beta, alpha)
   - Le script de publication gère automatiquement cela
   - Ou ajoutez `--tag rc` (ou le tag approprié) à la commande de publication

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

## Gestion des fichiers de test

Les fichiers de test ne doivent pas être inclus dans les packages publiés sur npm. Pour cela :

1. Utilisez la propriété `files` dans `package.json` pour spécifier explicitement les fichiers à inclure
2. Ou utilisez un fichier `.npmignore` pour exclure les fichiers de test
3. Vérifiez le contenu avec `npm pack --dry-run` avant publication

Exemple de configuration dans package.json :
```json
{
  "files": [
    "dist/",
    "README.md",
    "LICENSE"
  ]
}
```

Exemple de fichier `.npmignore` :
```
__tests__/
*.test.ts
*.spec.ts
jest.config.js
tsconfig.json
.gitignore
.github/
docs/
examples/
```