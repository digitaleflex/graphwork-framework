#!/usr/bin/env node

/**
 * Script pour renommer les packages
 * Utile lors du clonage initial ou du changement de scope
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

// Vérifier les arguments
const oldScope = process.argv[2];
const newScope = process.argv[3];

if (!oldScope || !newScope) {
  console.error('Usage: node scripts/rename-packages.js @oldcope @newscope');
  console.error('Example: node scripts/rename-packages.js @graphwork @mon-org');
  process.exit(1);
}

console.log(`🔄 Renommage des packages de ${oldScope} vers ${newScope}...`);

for (const workspace of workspaces) {
  const packageJsonPath = path.join(__dirname, '..', workspace, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  package.json non trouvé dans ${workspace}`);
    continue;
  }

  // Lire le package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const oldName = packageJson.name;

  // Remplacer le scope
  if (oldName.startsWith(oldScope)) {
    const newName = oldName.replace(oldScope, newScope);
    packageJson.name = newName;
    console.log(`✅ ${oldName} → ${newName}`);
  }

  // Mettre à jour les dépendances
  if (packageJson.dependencies) {
    for (const [depName, depVersion] of Object.entries(packageJson.dependencies)) {
      if (depName.startsWith(oldScope)) {
        const newDepName = depName.replace(oldScope, newScope);
        delete packageJson.dependencies[depName];
        packageJson.dependencies[newDepName] = depVersion;
      }
    }
  }

  // Mettre à jour les devDependencies
  if (packageJson.devDependencies) {
    for (const [depName, depVersion] of Object.entries(packageJson.devDependencies)) {
      if (depName.startsWith(oldScope)) {
        const newDepName = depName.replace(oldScope, newScope);
        delete packageJson.devDependencies[depName];
        packageJson.devDependencies[newDepName] = depVersion;
      }
    }
  }

  // Écrire le fichier mis à jour
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

console.log('\n✅ Renommage terminé!');
console.log('N\'oubliez pas de mettre à jour les imports dans votre code source.');