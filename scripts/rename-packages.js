#!/usr/bin/env node

/**
 * Script pour renommer les packages pour publication gratuite sur npm
 * 
 * Ce script permet de changer les noms des packages pour utiliser
 * soit un scope personnel, soit des noms simples sans scope
 */

const fs = require('fs');
const path = require('path');

// Liste des workspaces
const workspaces = [
  'packages/@graphwork/cache',
  'packages/@graphwork/cli',
  'packages/@graphwork/core',
  'packages/@graphwork/knowledge-base',
  'packages/@graphwork/templates',
  'packages/@graphwork/tools',
  'packages/@graphwork/ai-integration',
  'ai-agents'
];

// Demander à l'utilisateur s'il veut utiliser un scope personnel ou des noms simples
console.log('Souhaitez-vous publier les packages avec :');
console.log('1. Un scope personnel (ex: @votreusername/graphwork-cache)');
console.log('2. Des noms simples (ex: graphwork-cache)');
console.log('(Note: Les noms simples peuvent déjà être pris)');

// Pour cet exemple, nous utiliserons des noms simples
const useScope = false;
const scopeName = ''; // Remplacer par votre nom d'utilisateur si vous choisissez l'option 1

// Fonction pour mettre à jour un package.json
function updatePackageJson(workspacePath, newName) {
  const packageJsonPath = path.join(workspacePath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  Fichier package.json non trouvé dans ${workspacePath}`);
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const oldName = packageJson.name;
    
    // Mettre à jour le nom
    packageJson.name = newName;
    
    // Mettre à jour les dépendances si nécessaire
    if (packageJson.dependencies) {
      for (const [depName, depVersion] of Object.entries(packageJson.dependencies)) {
        if (depName.startsWith('@graphwork/')) {
          const newDepName = useScope 
            ? `@${scopeName}/${depName.replace('@graphwork/', 'graphwork-')}`
            : `graphwork-${depName.replace('@graphwork/', '')}`;
          
          delete packageJson.dependencies[depName];
          packageJson.dependencies[newDepName] = depVersion;
        }
      }
    }
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`✅ Mis à jour ${oldName} → ${newName}`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour de ${packageJsonPath}:`, error.message);
    return false;
  }
}

// Renommer tous les packages
console.log('\n🔄 Renommage des packages...\n');

for (const workspace of workspaces) {
  const packageName = path.basename(workspace);
  const newName = useScope 
    ? `@${scopeName}/graphwork-${packageName}`
    : `graphwork-${packageName}`;
  
  updatePackageJson(workspace, newName);
}

console.log('\n✅ Renommage terminé!');
console.log('\nN\'oubliez pas de :');
console.log('1. Reconstruire les packages : npm run build');
console.log('2. Publier : npm run publish:packages');