#!/usr/bin/env node

/**
 * Script de publication automatique pour les packages GraphWork
 * 
 * Ce script gère automatiquement l'incrémentation des versions et la publication
 * de tous les packages du monorepo sur npm
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Liste des workspaces à publier
const workspaces = [
  'packages/@graphwork/cache',
  'packages/@graphwork/cli',
  'packages/@graphwork/core',
  'packages/@graphwork/knowledge-base',
  'packages/@graphwork/templates',
  'packages/@graphwork/tools',
  'packages/@graphwork/ai-integration'
];

// Types d'incrémentation de version
const VERSION_TYPES = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major'
};

// Fonction utilitaire pour exécuter des commandes avec gestion d'erreurs
function execCommand(command, options = {}) {
  try {
    return execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    throw new Error(`Échec de la commande '${command}': ${error.message}`);
  }
}

// Fonction pour obtenir la version actuelle d'un package sur npm
function getPublishedVersion(packageName) {
  try {
    const result = execSync(`npm view ${packageName} version`, {
      stdio: 'pipe',
      encoding: 'utf8'
    });
    return result.trim();
  } catch (error) {
    // Si le package n'existe pas encore, retourner null
    return null;
  }
}

// Fonction pour incrémenter une version selon semver
function incrementVersion(currentVersion, type) {
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  switch (type) {
    case VERSION_TYPES.MAJOR:
      return `${major + 1}.0.0`;
    case VERSION_TYPES.MINOR:
      return `${major}.${minor + 1}.0`;
    case VERSION_TYPES.PATCH:
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

// Fonction pour mettre à jour le package.json avec une nouvelle version
function updatePackageVersion(packagePath, newVersion) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const oldVersion = packageJson.version;
  packageJson.version = newVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log(`   🔄 Mise à jour de la version ${oldVersion} → ${newVersion}`);
}

// Fonction pour valider la configuration du package
function validatePackage(packagePath, packageJson) {
  const issues = [];

  // Vérifier si la propriété "files" est définie
  if (!packageJson.files) {
    issues.push('Aucune liste de fichiers définie - les fichiers de test pourraient être inclus');
  }

  // Vérifier la présence de README.md
  const readmePath = path.join(packagePath, 'README.md');
  if (!fs.existsSync(readmePath)) {
    issues.push('README.md manquant');
  }

  // Vérifier la présence de LICENSE
  const licensePath = path.join(packagePath, 'LICENSE');
  if (!fs.existsSync(licensePath)) {
    issues.push('LICENSE manquante');
  }

  return issues;
}

// Fonction pour extraire le tag de version préliminaire
function getPrereleaseTag(version) {
  const match = version.match(/-([a-z]+)(?:\.(\d+))?/);
  if (match) {
    return match[1]; // Retourne 'alpha', 'beta', 'rc', etc.
  }
  return 'prerelease';
}

// Fonction principale de publication automatique
async function autoPublish() {
  console.log('🚀 Démarrage du script de publication automatique GraphWork');

  // Vérifier si l'utilisateur est connecté à npm
  console.log('\n🔍 Vérification de l\'authentification npm...');
  try {
    execCommand('npm whoami', { stdio: 'pipe' });
    console.log('✅ Authentifié à npm');
  } catch (error) {
    console.error('❌ Vous devez vous connecter à npm avant de publier:');
    console.error('   npm adduser');
    process.exit(1);
  }

  // Demander le type d'incrémentation de version
  console.log('\n📝 Sélection du type d\'incrémentation de version:');
  console.log('   1. Patch (0.0.1 → 0.0.2) - Corrections de bugs');
  console.log('   2. Minor (0.1.0 → 0.2.0) - Nouvelles fonctionnalités rétrocompatibles');
  console.log('   3. Major (1.0.0 → 2.0.0) - Changements non rétrocompatibles');

  // Pour cet exemple, nous utiliserons toujours patch
  // Dans une version interactive, on demanderait à l'utilisateur
  const versionType = VERSION_TYPES.PATCH;
  console.log(`\n✅ Type d'incrémentation sélectionné: ${versionType}`);

  // Exécuter les tests avant publication
  console.log('\n🧪 Exécution des tests...');
  try {
    execCommand('npm test');
    console.log('✅ Tous les tests ont passé avec succès');
  } catch (error) {
    console.error('❌ Les tests ont échoué. Publication annulée.');
    console.error('Veuillez corriger les erreurs de test avant de publier.');
    process.exit(1);
  }

  // Construire tous les packages
  console.log('\n🏗️  Construction des packages...');
  try {
    execCommand('npm run build');
    console.log('✅ Construction terminée');
  } catch (error) {
    console.error('❌ Erreur lors de la construction des packages');
    process.exit(1);
  }

  // Vérifier et mettre à jour les versions
  console.log('\n🔄 Vérification et mise à jour des versions...');
  const versionUpdates = [];

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
    const currentVersion = packageJson.version;

    console.log(`\n📦 ${packageName}@${currentVersion}`);

    // Obtenir la version publiée sur npm
    const publishedVersion = getPublishedVersion(packageName);

    if (publishedVersion) {
      console.log(`   🌐 Version publiée sur npm: ${publishedVersion}`);

      // Comparer les versions
      if (currentVersion <= publishedVersion) {
        // La version locale n'est pas supérieure à la version publiée
        const newVersion = incrementVersion(publishedVersion, versionType);
        updatePackageVersion(packagePath, newVersion);
        versionUpdates.push({
          workspace,
          packageName,
          oldVersion: currentVersion,
          newVersion
        });
      } else {
        console.log(`   ✅ Version locale déjà supérieure (${currentVersion} > ${publishedVersion})`);
        versionUpdates.push({
          workspace,
          packageName,
          oldVersion: currentVersion,
          newVersion: currentVersion
        });
      }
    } else {
      console.log('   🆕 Nouveau package (pas encore publié sur npm)');
      versionUpdates.push({
        workspace,
        packageName,
        oldVersion: currentVersion,
        newVersion: currentVersion
      });
    }
  }

  // Résumé des mises à jour de version
  if (versionUpdates.length > 0) {
    console.log('\n📋 Résumé des mises à jour de version:');
    versionUpdates.forEach(update => {
      if (update.oldVersion !== update.newVersion) {
        console.log(`   🔄 ${update.packageName}: ${update.oldVersion} → ${update.newVersion}`);
      } else {
        console.log(`   ✅ ${update.packageName}: ${update.newVersion} (inchangé)`);
      }
    });
  }

  // Vérifier le contenu des packages avant publication
  console.log('\n🔍 Validation finale des packages...');
  const validationReport = [];

  for (const workspace of workspaces) {
    const packagePath = path.join(__dirname, '..', workspace);
    const packageJsonPath = path.join(packagePath, 'package.json');

    // Vérifier si le package.json existe
    if (!fs.existsSync(packageJsonPath)) {
      continue;
    }

    // Lire le package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Valider la configuration du package
    const issues = validatePackage(packagePath, packageJson);
    validationReport.push({
      workspace,
      packageName: packageJson.name,
      version: packageJson.version,
      issues
    });
  }

  // Afficher le rapport de validation
  console.log('\n📋 Rapport de validation des packages:');
  validationReport
    .filter(report => report.packageName)
    .forEach(report => {
      const status = report.issues.length === 0 ? '✅' : '⚠️';
      console.log(`   ${status} ${report.packageName}@${report.version}`);
      if (report.issues.length > 0) {
        report.issues.forEach(issue => console.log(`      - ${issue}`));
      }
    });

  // Confirmation avant publication
  console.log('\n❓ Souhaitez-vous continuer avec la publication ? (Ctrl+C pour annuler)');
  console.log('⏳ Publication automatique dans 10 secondes...');

  // Attendre 10 secondes avant de publier
  setTimeout(() => {
    // Publier chaque package
    console.log('\n🚀 Début de la publication des packages...');
    let publishedCount = 0;
    let errorCount = 0;

    for (const report of validationReport) {
      // Ignorer les packages sans nom
      if (!report.packageName) continue;

      const { workspace, packageName, version } = report;
      console.log(`\n📦 Traitement de ${packageName}@${version}`);

      try {
        // Vérifier si c'est une version préliminaire
        let tagOption = '';
        if (version.includes('-')) {
          // C'est une version préliminaire (alpha, beta, rc, etc.)
          const tag = getPrereleaseTag(version);
          tagOption = ` --tag ${tag}`;
          console.log(`   🏷️  Version préliminaire détectée, publication avec le tag: ${tag}`);
        }

        // Publier avec accès public pour éviter les frais
        execCommand(`npm publish --workspace=${workspace} --access public${tagOption}`);

        console.log(`✅ Publié ${packageName}@${version}`);
        publishedCount++;
      } catch (error) {
        // Si l'erreur est liée au tag, réessayer sans tag
        if (error.message && error.message.includes('You must specify a tag using --tag when publishing a prerelease version')) {
          console.log('   ⚠️  Tentative de publication sans tag pour version préliminaire...');
          try {
            execCommand(`npm publish --workspace=${workspace} --access public`);
            console.log(`✅ Publié ${packageName}@${version} (sans tag)`);
            publishedCount++;
          } catch (retryError) {
            console.error(`❌ Échec de publication de ${packageName}:`, retryError.message);
            errorCount++;
          }
        } else {
          console.error(`❌ Échec de publication de ${packageName}:`, error.message);
          errorCount++;
        }
      }
    }

    // Résumé de la publication
    console.log('\n📊 Résumé de la publication:');
    console.log(`   ✅ Packages publiés: ${publishedCount}`);
    console.log(`   ❌ Erreurs: ${errorCount}`);
    console.log(`   📦 Total traité: ${publishedCount + errorCount}`);

    if (errorCount === 0) {
      console.log('\n🎉 Publication terminée avec succès!');
      console.log('🔗 Vérifiez vos packages sur https://www.npmjs.com/settings/~packages');
    } else {
      console.log('\n⚠️  Publication terminée avec des erreurs.');
      console.log('Veuillez vérifier les erreurs ci-dessus et corriger les problèmes avant de réessayer.');
    }
  }, 10000);
}

// Exécuter le script
autoPublish().catch(error => {
  console.error('❌ Erreur fatale:', error.message);
  process.exit(1);
});