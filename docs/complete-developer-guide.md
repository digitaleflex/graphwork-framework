# Guide Complet du Développeur GraphWork Framework

## Table des matières

1. [Introduction pour les développeurs](#introduction-pour-les-développeurs)
2. [Environnement de développement](#environnement-de-développement)
3. [Architecture technique](#architecture-technique)
4. [Structure du monorepo](#structure-du-monorepo)
5. [Développement des packages](#développement-des-packages)
6. [Tests et qualité](#tests-et-qualité)
7. [Documentation et exemples](#documentation-et-exemples)
8. [Intégration continue](#intégration-continue)
9. [Publication des packages](#publication-des-packages)
10. [Bonnes pratiques](#bonnes-pratiques)
11. [Dépannage](#dépannage)
12. [Références des packages](#références-des-packages)

## Introduction pour les développeurs

Ce guide est destiné aux développeurs souhaitant contribuer au développement du GraphWork Framework ou créer leurs propres extensions. Il couvre tous les aspects techniques nécessaires pour comprendre, modifier et étendre le framework.

### Objectifs du framework

- **Assister le développement par l'IA** : Intégration transparente avec les modèles d'IA
- **Garantir la qualité** : Standards de codage stricts et validation automatique
- **Assurer la sécurité** : Protection des données et validation de sécurité intégrée
- **Optimiser les performances** : Système de cache et gestion des ressources
- **Faciliter la collaboration** : Structure standardisée et documentation complète

## Environnement de développement

### Prérequis système

- **Node.js** : Version 16.x ou supérieure
- **npm** : Version 7.x ou supérieure
- **Git** : Pour le versioning
- **TypeScript** : Version 4.8 ou supérieure
- **IDE** : VS Code recommandé avec extensions TypeScript/ESLint

### Configuration initiale

```bash
# Cloner le dépôt
git clone https://github.com/graphmind/graphwork-framework.git
cd graphwork-framework

# Installer les dépendances
npm install

# Configurer l'environnement de développement
npm run setup-dev
```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Configuration IA
OPENAI_API_KEY=votre_clé_api_openai
ANTHROPIC_API_KEY=votre_clé_api_anthropic
GOOGLE_GEMINI_API_KEY=votre_clé_api_gemini

# Configuration de développement
NODE_ENV=development
DEBUG=graphwork:*

# Configuration de test
TEST_DATABASE_URL=postgresql://user:pass@localhost:5432/graphwork_test
```

## Architecture technique

### Structure en couches

```
┌─────────────────────────────────────────────────────────────┐
│                    User Experience Layer                    │
│  Progressive Assistance • Real-time Feedback • Customization│
├─────────────────────────────────────────────────────────────┤
│                 Explainability Layer                        │
│  Traceability • Transparency • Accountability Framework    │
├─────────────────────────────────────────────────────────────┤
│                Privacy & Security Layer                     │
│  Data Protection • Security Validation • Compliance        │
├─────────────────────────────────────────────────────────────┤
│              Performance & Scalability Layer                │
│  Caching System • Resource Management • Bottleneck Analysis│
├─────────────────────────────────────────────────────────────┤
│                 Core Framework Layer                        │
│  Knowledge Base • AI Integration • Tools                   │
├─────────────────────────────────────────────────────────────┤
│              CI/CD & Learning Layer                         │
│  Integration • Adoption • Governance                       │
└─────────────────────────────────────────────────────────────┘
```

### Patterns d'architecture utilisés

- **Monorepo** : Gestion centralisée des packages
- **Modularité** : Séparation des responsabilités
- **Injection de dépendances** : Flexibilité et testabilité
- **Observateur** : Système d'événements et notifications
- **Stratégie** : Algorithmes interchangeables

## Structure du monorepo

### Organisation des dossiers

```
graphwork-framework/
├── packages/
│   ├── graphwork-cache/        # Système de cache
│   ├── graphwork-cli/          # Interface en ligne de commande
│   ├── graphwork-core/         # Moteur principal
│   ├── graphwork-knowledge-base/ # Base de connaissances
│   ├── graphwork-templates/    # Templates de génération
│   ├── graphwork-tools/        # Outils de développement
│   ├── graphwork-ai-integration/ # Intégration IA
│   └── graphwork-ai-agents/    # Agents IA spécialisés
├── adapters/                   # Adaptateurs pour IDE/plugins
├── docs/                       # Documentation
├── examples/                   # Exemples d'utilisation
├── scripts/                    # Scripts de développement
├── tests/                      # Tests globaux
├── work/                       # Structure de projet standard
└── config/                     # Configuration globale
```

### Configuration du monorepo

Le fichier `package.json` racine définit les workspaces :

```json
{
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "setup-dev": "npm install && npm run build --workspaces",
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "publish:packages": "node scripts/publish.js"
  }
}
```

## Développement des packages

### Création d'un nouveau package

1. **Créer la structure du package** :
   ```bash
   mkdir packages/graphwork-nom-du-package
   cd packages/graphwork-nom-du-package
   ```

2. **Initialiser le package.json** :
   ```json
   {
     "name": "graphwork-nom-du-package",
     "version": "2.0.0",
     "description": "Description du package",
     "main": "dist/index.js",
     "files": [
       "dist/",
       "README.md",
       "LICENSE"
     ],
     "scripts": {
       "build": "tsc",
       "dev": "tsc --watch",
       "test": "jest",
       "test:watch": "jest --watch",
       "test:coverage": "jest --coverage",
       "prepublishOnly": "npm run build"
     },
     "dependencies": {
       "typescript": "^4.8.0"
     },
     "keywords": ["graphwork", "nom-du-package"],
     "author": "GraphMind Organization",
     "license": "MIT"
   }
   ```

3. **Configurer TypeScript** (`tsconfig.json`) :
   ```json
   {
     "extends": "../../tsconfig.json",
     "compilerOptions": {
       "outDir": "dist",
       "rootDir": "src"
     },
     "include": ["src/**/*"]
   }
   ```

4. **Configurer Jest** (`jest.config.js`) :
   ```javascript
   module.exports = {
     preset: 'ts-jest',
     testEnvironment: 'node',
     roots: ['<rootDir>/src', '<rootDir>/__tests__'],
     testMatch: ['**/__tests__/**/*.test.ts'],
     collectCoverageFrom: ['src/**/*.ts']
   };
   ```

5. **Créer un fichier .npmignore** :
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

### Développement avec TypeScript

#### Typage fort

```typescript
// Bon exemple : Typage explicite
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

class UserService {
  async getUserById(id: string): Promise<User | null> {
    // Implémentation
  }
}
```

#### Gestion des erreurs

```typescript
// Bon exemple : Gestion d'erreurs avec typage
class GraphWorkError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, any>
  ) {
    super(message);
    this.name = 'GraphWorkError';
  }
}

// Utilisation
try {
  const result = await someOperation();
} catch (error) {
  if (error instanceof GraphWorkError) {
    // Gestion spécifique
  }
  throw error;
}
```

### Dépendances entre packages

Les dépendances entre packages du monorepo sont gérées automatiquement :

```json
{
  "dependencies": {
    "graphwork-core": "^2.0.0",
    "graphwork-knowledge-base": "^2.0.0"
  }
}
```

## Tests et qualité

### Structure des tests

```
packages/graphwork-cache/
├── __tests__/
│   ├── CacheManager.test.ts
│   ├── LRUCache.test.ts
│   └── MemoryCache.test.ts
├── src/
│   ├── CacheManager.ts
│   ├── LRUCache.ts
│   ├── MemoryCache.ts
│   └── types.ts
└── jest.config.js
```

### Tests unitaires avec Jest

```typescript
// Exemple de test unitaire
import { LRUCache } from '../src/LRUCache';

describe('LRUCache', () => {
  let cache: LRUCache<string>;

  beforeEach(() => {
    cache = new LRUCache<string>({ maxSize: 3 });
  });

  test('should store and retrieve values', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  test('should evict least recently used item', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');
    
    // Accéder à key1 pour le rendre récent
    cache.get('key1');
    
    // Ajouter un nouvel item
    cache.set('key4', 'value4');
    
    // key2 devrait être évicté (le moins récent)
    expect(cache.get('key2')).toBeUndefined();
    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key3')).toBe('value3');
    expect(cache.get('key4')).toBe('value4');
  });
});
```

### Tests d'intégration

```typescript
// Exemple de test d'intégration
import { CacheManager } from '../src/CacheManager';
import { LRUCache } from '../src/LRUCache';

describe('CacheManager Integration', () => {
  let cacheManager: CacheManager;

  beforeEach(() => {
    cacheManager = new CacheManager({ maxSize: 100 });
  });

  test('should manage multiple cache instances', () => {
    const userCache = cacheManager.createLRUCache<User>('users');
    const productCache = cacheManager.createMemoryCache<Product>('products');

    // Vérifier que les caches sont créés
    expect(cacheManager.getCache('users')).toBe(userCache);
    expect(cacheManager.getCache('products')).toBe(productCache);

    // Vérifier les statistiques
    const stats = cacheManager.getAllStats();
    expect(Object.keys(stats)).toHaveLength(2);
  });
});
```

### Couverture de test

Exigence de couverture : **85% minimum**

```bash
# Exécuter les tests avec couverture
npm run test:coverage

# Générer un rapport détaillé
npm run test:coverage -- --coverageReporters=html
```

### Linting et formatage

```json
// .eslintrc.json
{
  "extends": ["@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error"
  }
}
```

```bash
# Linting
npm run lint

# Correction automatique
npm run lint -- --fix
```

## Documentation et exemples

### Documentation du code

Utilisez JSDoc/TypeDoc pour documenter le code :

```typescript
/**
 * Gestionnaire de cache centralisé pour le GraphWork Framework
 * 
 * @example
 * ```typescript
 * const cacheManager = new CacheManager({ maxSize: 1000 });
 * const userCache = cacheManager.createLRUCache<User>('users');
 * userCache.set('user1', { id: 'user1', name: 'John Doe' });
 * ```
 */
export class CacheManager {
  /**
   * Crée un nouveau cache LRU
   * 
   * @param name - Nom du cache
   * @param config - Configuration du cache
   * @returns Instance de LRUCache
   * 
   * @example
   * ```typescript
   * const userCache = cacheManager.createLRUCache<User>('users', {
   *   maxSize: 100,
   *   ttl: 3600000 // 1 heure
   * });
   * ```
   */
  createLRUCache<T = any>(name: string, config: CacheConfig = {}): LRUCache<T> {
    // Implémentation
  }
}
```

### Exemples d'utilisation

Créez des exemples dans le dossier `examples/` :

```
examples/
├── cache-usage/
│   ├── basic-usage.ts
│   ├── advanced-configuration.ts
│   └── performance-benchmark.ts
├── cli-examples/
│   ├── project-initialization.ts
│   └── code-generation.ts
└── ai-integration/
    ├── openai-example.ts
    └── custom-prompt.ts
```

## Intégration continue

### Configuration GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x]
        
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Lint
        run: npm run lint
        
      - name: Test
        run: npm run test:coverage
        
      - name: Security audit
        run: npm audit --audit-level high
        
      - name: Publish coverage
        uses: codecov/codecov-action@v3
```

### Hooks Git

Utilisez Husky pour les hooks Git :

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm test",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## Publication des packages

### Processus de publication

1. **Mise à jour des versions** :
   ```bash
   # Mise à jour sémantique
   npm version major|minor|patch --workspaces
   
   # Ou mise à jour manuelle des package.json
   ```

2. **Build et test** :
   ```bash
   npm run build
   npm test
   ```

3. **Vérification du contenu des packages** :
   ```bash
   # Vérifier ce qui sera publié
   npm pack --dry-run --workspace=packages/graphwork-cache
   ```

4. **Publication** :
   ```bash
   # Publication avec accès public (gratuit)
   npm publish --access public --workspace=packages/graphwork-cache
   
   # Ou utilisation du script centralisé
   npm run publish:packages
   ```

### Script de publication

```javascript
// scripts/publish.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Liste des workspaces à publier
const workspaces = [
  'packages/graphwork-cache',
  'packages/graphwork-cli',
  'packages/graphwork-core',
  'packages/graphwork-knowledge-base',
  'packages/graphwork-templates',
  'packages/graphwork-tools',
  'packages/graphwork-ai-integration',
  'packages/graphwork-ai-agents'
];

// Vérifier si l'utilisateur est connecté à npm
try {
  execSync('npm whoami', { stdio: 'pipe' });
  console.log('✅ Authentifié à npm');
} catch (error) {
  console.error('❌ Vous devez vous connecter à npm avant de publier:');
  console.error('   npm adduser');
  process.exit(1);
}

// Construire tous les packages
console.log('🏗️  Construction des packages...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Construction terminée');
} catch (error) {
  console.error('❌ Erreur lors de la construction des packages');
  process.exit(1);
}

// Vérifier le contenu des packages avant publication
console.log('🔍 Vérification du contenu des packages...');
for (const workspace of workspaces) {
  const packagePath = path.join(__dirname, '..', workspace);
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  // Vérifier si le package.json existe
  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  Package.json non trouvé dans ${workspace}, ignoré`);
    continue;
  }
  
  // Lire le package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Vérifier si la propriété "files" est définie
  if (!packageJson.files) {
    console.warn(`⚠️  Aucune liste de fichiers définie pour ${packageJson.name}`);
    console.warn(`   Les fichiers de test pourraient être inclus dans le package`);
  }
}

// Publier chaque package
for (const workspace of workspaces) {
  const packagePath = path.join(__dirname, '..', workspace);
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  // Vérifier si le package.json existe
  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  Package.json non trouvé dans ${workspace}, ignoré`);
    continue;
  }
  
  // Lire le package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const packageName = packageJson.name;
  const packageVersion = packageJson.version;
  
  console.log(`\n📦 Traitement de ${packageName}@${packageVersion}`);
  
  try {
    // Vérifier si c'est une version préliminaire
    let tagOption = '';
    if (packageVersion.includes('-')) {
      // C'est une version préliminaire (alpha, beta, rc, etc.)
      const tag = packageVersion.match(/-([a-z]+)/) ? packageVersion.match(/-([a-z]+)/)[1] : 'prerelease';
      tagOption = ` --tag ${tag}`;
      console.log(`   🏷️  Version préliminaire détectée, publication avec le tag: ${tag}`);
    }
    
    // Publier avec accès public pour éviter les frais
    execSync(`npm publish --workspace=${workspace} --access public${tagOption}`, {
      stdio: 'inherit'
    });
    
    console.log(`✅ Publié ${packageName}@${packageVersion}`);
  } catch (error) {
    // Si l'erreur est liée au tag, réessayer sans tag
    if (error.message && error.message.includes('You must specify a tag using --tag when publishing a prerelease version')) {
      console.log('   ⚠️  Tentative de publication sans tag pour version préliminaire...');
      try {
        execSync(`npm publish --workspace=${workspace} --access public`, {
          stdio: 'inherit'
        });
        console.log(`✅ Publié ${packageName}@${packageVersion} (sans tag)`);
      } catch (retryError) {
        console.error(`❌ Échec de publication de ${packageName}:`, retryError.message);
      }
    } else {
      console.error(`❌ Échec de publication de ${packageName}:`, error.message);
    }
  }
}

console.log('\n🎉 Publication terminée!');
```

### Gestion des tags

Pour les versions préliminaires :
```bash
# Publier une version release candidate
npm publish --tag rc --workspace=packages/graphwork-cache

# Publier une version beta
npm publish --tag beta --workspace=packages/graphwork-cache
```

## Bonnes pratiques

### Structure du code

1. **Principe de responsabilité unique** :
   ```typescript
   // Bon : Classe avec une seule responsabilité
   class UserValidator {
     validate(user: User): ValidationResult {
       // Validation uniquement
     }
   }
   
   class UserRepository {
     save(user: User): Promise<void> {
       // Persistance uniquement
     }
   }
   ```

2. **Composition plutôt qu'héritage** :
   ```typescript
   // Bon : Composition
   class UserService {
     constructor(
       private readonly validator: UserValidator,
       private readonly repository: UserRepository
     ) {}
   }
   ```

### Gestion des erreurs

```typescript
// Bon : Erreurs personnalisées avec codes
class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly value: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Bon : Propagation explicite des erreurs
async function processUser(input: UserInput): Promise<User> {
  try {
    const validated = this.validator.validate(input);
    return await this.repository.save(validated);
  } catch (error) {
    if (error instanceof ValidationError) {
      // Logique spécifique de gestion
      this.logger.warn('Validation failed', { 
        field: error.field, 
        value: error.value 
      });
    }
    throw error;
  }
}
```

### Performance

1. **Éviter les allocations inutiles** :
   ```typescript
   // Bon : Réutilisation d'objets
   private readonly reusableBuffer = new Uint8Array(1024);
   
   processData(): void {
     // Utiliser reusableBuffer au lieu d'en créer un nouveau
   }
   ```

2. **Lazy loading** :
   ```typescript
   class ExpensiveService {
     private _instance: ExpensiveResource | null = null;
     
     get instance(): ExpensiveResource {
       if (!this._instance) {
         this._instance = new ExpensiveResource();
       }
       return this._instance;
     }
   }
   ```

### Sécurité

1. **Validation des entrées** :
   ```typescript
   // Bon : Validation stricte
   function processUserInput(input: any): User {
     if (!input || typeof input !== 'object') {
       throw new ValidationError('Invalid input format');
     }
     
     if (!input.email || !isValidEmail(input.email)) {
       throw new ValidationError('Invalid email format');
     }
     
     // ... autres validations
   }
   ```

2. **Éviter les injections** :
   ```typescript
   // Bon : Utilisation de requêtes paramétrées
   const query = 'SELECT * FROM users WHERE id = ?';
   const result = await db.query(query, [userId]);
   ```

## Dépannage

### Problèmes courants

#### Erreurs de build TypeScript

```bash
# Nettoyer et reconstruire
rm -rf packages/*/dist
npm run build

# Vérifier les types
npm run build -- --noEmit --watch
```

#### Problèmes de dépendances

```bash
# Nettoyer le cache npm
npm cache clean --force

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

#### Erreurs de test

```bash
# Exécuter un test spécifique
npm test -- --testNamePattern="nom du test"

# Exécuter en mode watch
npm run test:watch

# Déboguer avec plus de logs
DEBUG=* npm test
```

#### Problèmes de publication

```bash
# Vérifier l'authentification
npm whoami

# Se reconnecter
npm login

# Publier avec verbose
npm publish --verbose --workspace=packages/graphwork-cache
```

### Logs et debugging

```typescript
// Bon : Logging structuré
import debug from 'debug';

const logger = debug('graphwork:cache');

class LRUCache<T> {
  set(key: string, value: T): void {
    logger('Setting key %s with value %O', key, value);
    // Implémentation
  }
}
```

### Support et communauté

- **Issues GitHub** : https://github.com/graphmind/graphwork-framework/issues
- **Discussions GitHub** : https://github.com/graphmind/graphwork-framework/discussions
- **Documentation** : https://docs.graphwork-framework.com
- **Slack/ Discord** : Communauté des développeurs

## Références des packages

### Packages principaux

1. **graphwork-core** : Moteur principal du framework
2. **graphwork-cli** : Interface en ligne de commande
3. **graphwork-cache** : Système de cache LRU et mémoire
4. **graphwork-knowledge-base** : Gestion de la base de connaissances
5. **graphwork-templates** : Moteur de templates
6. **graphwork-tools** : Outils de développement
7. **graphwork-ai-integration** : Intégration avec les modèles d'IA
8. **graphwork-ai-agents** : Agents IA spécialisés

### Dépendances externes importantes

- **TypeScript** : Typage statique pour JavaScript
- **Jest** : Framework de test
- **LRU Cache** : Implémentation de cache LRU
- **Handlebars** : Moteur de templating
- **OpenAI** : Client pour l'API OpenAI
- **Axios** : Client HTTP
- **Lodash** : Utilitaires JavaScript
- **Chalk** : Coloration de la console
- **Inquirer** : Interfaces de ligne de commande interactives
- **Ora** : Indicateurs de progression

---

*Ce guide est maintenu par l'équipe GraphWork et mis à jour avec chaque version majeure du framework.*