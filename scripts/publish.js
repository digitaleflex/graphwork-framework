#!/usr/bin/env node

/**
 * Script de publication pour les packages GraphWork
 * 
 * Ce script publie tous les packages du monorepo sur npm
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Liste des workspaces à publier (mis à jour pour les nouveaux noms)
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

// Publier chaque package
for (const workspace of workspaces) {
  const packagePath = path.join(__dirname, '..', workspace);
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  Package non trouvé: ${workspace}`);
    continue;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    console.log(`\n📦 Publication de ${packageJson.name}@${packageJson.version}`);
    
    // Déterminer le tag à utiliser
    let tagOption = '';
    if (packageJson.version.includes('-')) {
      // C'est une version préliminaire (alpha, beta, rc, etc.)
      const tag = packageJson.version.match(/-([a-z]+)/) ? packageJson.version.match(/-([a-z]+)/)[1] : 'prerelease';
      tagOption = ` --tag ${tag}`;
    }
    
    // Publier le package
    execSync(`npm publish --workspace=${workspace}${tagOption}`, { stdio: 'inherit' });
    console.log(`✅ Publié ${packageJson.name}`);
  } catch (error) {
    // Si l'erreur est liée au scope, afficher un message d'aide
    if (error.message.includes('402 Payment Required') || error.message.includes('private packages')) {
      console.error(`\n❌ Erreur liée au scope. Essayez de :`);
      console.error(`   1. Modifier le package.json pour utiliser un nom sans scope`);
      console.error(`   2. Ou créer un compte npm payant pour utiliser l'organisation @graphwork`);
      console.error(`   3. Ou utiliser votre propre scope personnel`);
    }
    console.error(`❌ Erreur lors de la publication de ${workspace}:`, error.message);
  }
}

console.log('\n🎉 Publication terminée!');