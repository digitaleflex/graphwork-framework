/**
 * Template de service backend
 * 
 * Ce template montre la structure de base d'un service
 * avec logique métier, validation, et gestion des erreurs.
 * 
 * Respecte les principes de séparation des responsabilités
 */

const { ValidationError } = require('../errors/CustomErrors');
const logger = require('../utils/logger');

/**
 * Obtenir une entité par ID
 * @param {Object} params - Paramètres de la requête
 * @param {string} params.id - ID de l'entité
 * @returns {Promise<Object>} - L'entité trouvée
 */
const getFonctionnalite = async ({ id }) => {
  try {
    // Validation des paramètres d'entrée
    if (!id || typeof id !== 'string') {
      throw new ValidationError('ID invalide fourni');
    }

    // Logique métier
    // Exemple : const entity = await database.findById(id);
    
    // Traitement des données
    // Exemple : return transformEntity(entity);

    // Retourner les données traitées
    return { id, nom: 'Nom de l\'entité', description: 'Description de l\'entité' };
  } catch (error) {
    logger.error('Erreur dans le service getFonctionnalite :', error);
    throw error; // Propager l'erreur pour qu'elle soit gérée au niveau du contrôleur
  }
};

/**
 * Créer une nouvelle entité
 * @param {Object} data - Données pour la création
 * @param {string} data.field1 - Premier champ
 * @param {string} data.field2 - Deuxième champ
 * @returns {Promise<Object>} - L'entité créée
 */
const createFonctionnalite = async ({ field1, field2 }) => {
  try {
    // Validation des données d'entrée
    if (!field1 || !field2) {
      throw new ValidationError('Champs requis manquants');
    }

    // Logique métier pour la création
    // Exemple : const newEntity = await database.create({ field1, field2 });
    
    // Retourner les données de l'entité créée
    return { id: 'generated-id', field1, field2, createdAt: new Date() };
  } catch (error) {
    logger.error('Erreur dans le service createFonctionnalite :', error);
    throw error;
  }
};

// Exporter les fonctions
module.exports = {
  getFonctionnalite,
  createFonctionnalite
};