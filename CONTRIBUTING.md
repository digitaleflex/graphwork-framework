# Guide du Contributeur

Merci de votre intérêt pour contribuer au GraphWork Framework 2.0 ! Ce document vous guidera à travers le processus de contribution.

## Table des Matières

- [Conditions Préalables](#conditions-préalables)
- [Installation du Développement](#installation-du-développement)
- [Processus de Contribution](#processus-de-contribution)
- [Conventions de Codage](#conventions-de-codage)
- [Tests](#tests)
- [Documentation](#documentation)
- [Code de Conduite](#code-de-conducte)

## Conditions Préalables

- Node.js v16.0.0 ou supérieur
- npm v7.0.0 ou supérieur
- Git v2.0.0 ou supérieur
- TypeScript v4.5.0 ou supérieur

## Installation du Développement

```bash
# Clonez le dépôt
git clone https://github.com/graphmind/graphwork-framework.git
cd graphwork-framework

# Installez les dépendances
npm install

# Installez les outils de développement
npm run setup-dev

# Vérifiez que tout fonctionne
npm test
```

## Processus de Contribution

### 1. Trouver une tâche

Consultez les [issues](https://github.com/graphmind/graphwork-framework/issues) pour trouver des tâches disponibles, particulièrement celles marquées `good first issue` pour les nouveaux contributeurs.

### 2. Créer une branche

```bash
git checkout -b feature/nom-de-votre-fonction
# ou
git checkout -b fix/nom-du-bug
```

### 3. Développer

- Suivez les conventions de codage
- Écrivez des tests pour votre code
- Documentez votre code
- Assurez-vous que tous les tests passent

### 4. Soumettre un PR

```bash
# Commitez vos changements
git add .
git commit -m "feat: Description de la fonctionnalité"

# Poussez votre branche
git push origin feature/nom-de-votre-fonction

# Créez un Pull Request sur GitHub
```

## Conventions de Codage

### TypeScript

- Utilisez les types TypeScript de manière extensive
- Faites des interfaces claires et descriptives
- Utilisez l'inférence de type quand c'est clair
- Évitez les types `any` sauf si nécessaire

### Documentation

- Documentez toutes les fonctions publiques avec JSDoc
- Expliquez les paramètres, les valeurs de retour et les exceptions
- Fournissez des exemples d'utilisation

### Git

- Utilisez des messages de commit clairs et descriptifs
- Suivez le format conventional commits: `type(scope): description`
- Exemples: `feat(cli): add new generate command`, `fix(core): resolve memory leak in context manager`

## Tests

### Types de Tests

- Tests unitaires: testent les fonctions individuelles
- Tests d'intégration: testent l'interaction entre composants
- Tests E2E: testent les flux complets

### Écriture des Tests

```typescript
describe('NomComposant', () => {
  it('devrait faire X quand Y', async () => {
    // Arrange
    const input = { /* données de test */ };
    
    // Act
    const result = await fonctionATester(input);
    
    // Assert
    expect(result).toBeDefined();
    expect(result).toHaveProperty('propriété', 'valeur attendue');
  });
});
```

## Documentation

- Mettez à jour la documentation quand vous ajoutez de nouvelles fonctionnalités
- Ajoutez des guides d'utilisation pour les nouvelles commandes
- Mettez à jour les exemples si nécessaire

## Code de Conduite

En contribuant, vous acceptez de respecter notre code de conduite. Soyez respectueux, inclusif et constructif dans toutes vos interactions.

---

Merci d'améliorer le GraphWork Framework 2.0 !