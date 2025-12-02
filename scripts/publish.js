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