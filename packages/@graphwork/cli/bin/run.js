#!/usr/bin/env node

const oclif = require('@oclif/core');

// Exécuter la CLI avec oclif
oclif.execute({ dir: __dirname }).then(() => {
  // Sortie réussie
}).catch((error) => {
  // Gestion des erreurs
  console.error(error);
  process.exit(1);
});