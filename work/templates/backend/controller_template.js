/**
 * Template de contrôleur backend
 * 
 * Ce template montre la structure de base d'un contrôleur
 * avec gestion des erreurs, validation des entrées, et logging.
 * 
 * Adapté pour une architecture REST API avec Node.js/Express
 */

const { validationResult } = require('express-validator');
const logger = require('../utils/logger');
const { handleErrors } = require('../utils/errorHandler');

// Importer les services nécessaires
const { nomDuService } = require('../services/ServiceNom');

/**
 * Description de la fonctionnalité
 * @route GET /endpoint
 * @access Public/Private
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
const getFonctionnalite = async (req, res) => {
  try {
    // Validation des paramètres d'entrée
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Récupération des paramètres
    const { id } = req.params;
    const { query1, query2 } = req.query;

    // Appel du service
    const result = await nomDuService.getFonctionnalite({ id, query1, query2 });

    // Réponse avec succès
    res.status(200).json({
      success: true,
      data: result,
      message: 'Description du succès'
    });
  } catch (error) {
    // Gestion des erreurs
    logger.error('Erreur dans getFonctionnalite :', error);
    return handleErrors(res, error);
  }
};

/**
 * Description de la création
 * @route POST /endpoint
 * @access Private
 * @param {Object} req - Requête HTTP avec body validé
 * @param {Object} res - Réponse HTTP
 */
const createFonctionnalite = async (req, res) => {
  try {
    // Validation des paramètres d'entrée
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Récupération des données du body
    const { field1, field2 } = req.body;

    // Appel du service
    const result = await nomDuService.createFonctionnalite({ field1, field2 });

    // Réponse avec succès
    res.status(201).json({
      success: true,
      data: result,
      message: 'Entité créée avec succès'
    });
  } catch (error) {
    // Gestion des erreurs
    logger.error('Erreur dans createFonctionnalite :', error);
    return handleErrors(res, error);
  }
};

// Exporter les fonctions
module.exports = {
  getFonctionnalite,
  createFonctionnalite
};