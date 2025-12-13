#!/usr/bin/env node

/**
 * Script pour corriger les noms de packages pour publication sur npm
 * Remplace le scope @graphwork par le scope utilisateur
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Liste des workspaces
const workspaces = [
  'packages/@graphwork/cache',
  'packages/@graphwork/cli',
  'packages/@graphwork/core',
  'packages/@graphwork/knowledge-base',
  'packages/@graphwork/templates',
  'packages/@graphwork/tools',
  'packages/@graphwork/ai-integration'
];

// Demander le nom d'utilisateur npm
const username = process.argv[2];

if (!username) {
  console.error('Veuillez fournir votre nom d\'utilisateur npm en argument:');
  console.error('node scripts/fix-package-names.js votreusername');
  process.exit(1);
}

console.log(`🔄 Mise à jour des packages pour utiliser le scope @${username}...`);

for (const workspace of workspaces) {
  const packageJsonPath = path.join(__dirname, '..', workspace, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  package.json non trouvé dans ${workspace}`);
    continue;
  }

  // Lire le package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const oldName = packageJson.name;

  // Remplacer @graphwork par le scope utilisateur
  const newName = oldName.replace('@graphwork/', `@${username}/graphwork-`);
  packageJson.name = newName;

  // Mettre à jour les dépendances si nécessaire
  if (packageJson.dependencies) {
    for (const [depName, depVersion] of Object.entries(packageJson.dependencies)) {
      if (depName.startsWith('@graphwork/')) {
        const newDepName = depName.replace('@graphwork/', `@${username}/graphwork-`);
        delete packageJson.dependencies[depName];
        packageJson.dependencies[newDepName] = depVersion;
      }
    }
  }

  // Écrire le fichier mis à jour
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`✅ ${oldName} → ${newName}`);
}

console.log('\n✅ Mise à jour des noms de packages terminée!');
console.log('\nN\'oubliez pas de :');
console.log('1. Reconstruire les packages : npm run build');
console.log('2. Publier : npm run publish:auto');