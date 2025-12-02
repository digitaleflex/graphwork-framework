#!/usr/bin/env node

/**
 * Script pour ajouter automatiquement les fichiers LICENSE aux packages
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
  'packages/@graphwork/ai-integration'
];

// Contenu de la licence MIT
const licenseContent = `MIT License

Copyright (c) 2025 GraphMind Organization

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

console.log('📄 Ajout des fichiers LICENSE aux packages...');

// Vérifier si le fichier LICENSE existe à la racine
const rootLicensePath = path.join(__dirname, '..', 'LICENSE');
if (!fs.existsSync(rootLicensePath)) {
  console.log('📝 Création du fichier LICENSE à la racine...');
  fs.writeFileSync(rootLicensePath, licenseContent);
  console.log('✅ Fichier LICENSE créé à la racine');
}

// Copier le fichier LICENSE dans chaque package
for (const workspace of workspaces) {
  const packagePath = path.join(__dirname, '..', workspace);
  const licensePath = path.join(packagePath, 'LICENSE');
  
  if (!fs.existsSync(licensePath)) {
    fs.writeFileSync(licensePath, licenseContent);
    console.log(`✅ LICENSE ajouté à ${workspace}`);
  } else {
    console.log(`ℹ️  LICENSE déjà présent dans ${workspace}`);
  }
  
  // Mettre à jour le package.json pour inclure la licence
  const packageJsonPath = path.join(packagePath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Ajouter la licence si elle n'existe pas
    if (!packageJson.license) {
      packageJson.license = 'MIT';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log(`✅ Licence MIT ajoutée au package.json de ${workspace}`);
    }
  }
}

console.log('\n✅ Tous les fichiers LICENSE ont été ajoutés!');
console.log('\nN\'oubliez pas de :');
console.log('1. Reconstruire les packages : npm run build');
console.log('2. Publier : npm run publish:auto');