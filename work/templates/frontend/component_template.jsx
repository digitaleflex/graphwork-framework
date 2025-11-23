/**
 * Template de composant React fonctionnel
 * 
 * Ce template montre la structure de base d'un composant React
 * avec gestion des états, effets, et propriétés typées.
 * 
 * Utilise les hooks React et respecte les bonnes pratiques
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ComponentNom.css'; // Feuille de style du composant

/**
 * Description du composant
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {string} props.titre - Titre du composant
 * @param {Array} props.elements - Liste d'éléments à afficher
 * @param {Function} props.onAction - Fonction appelée lors d'une action
 * @returns {JSX.Element} - Composant React rendu
 */
const NomComposant = ({ titre = 'Titre par défaut', elements = [], onAction = () => {} }) => {
  // États locaux du composant
  const [donnees, setDonnees] = useState(elements);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  // Effet secondaire (chargement initial, etc.)
  useEffect(() => {
    // Logique d'initialisation
    chargerDonnees();
  }, []);

  // Effet secondaire avec dépendances
  useEffect(() => {
    // Logique de mise à jour quand les props changent
    if (elements.length !== donnees.length) {
      setDonnees(elements);
    }
  }, [elements]);

  /**
   * Fonction pour charger les données
   */
  const chargerDonnees = async () => {
    try {
      setChargement(true);
      setErreur(null);
      // Exemple de chargement de données
      // const result = await api.get('/donnees');
      // setDonnees(result.data);
    } catch (error) {
      setErreur(error.message || 'Erreur lors du chargement des données');
    } finally {
      setChargement(false);
    }
  };

  /**
   * Gestionnaire d'événements pour une action
   */
  const gererAction = () => {
    onAction();
  };

  // Rendu du composant
  return (
    <div className="nom-composant">
      <h2>{titre}</h2>
      
      {erreur && (
        <div className="erreur">
          {erreur}
        </div>
      )}
      
      {chargement ? (
        <div className="chargement">
          Chargement...
        </div>
      ) : (
        <div className="contenu">
          {donnees.map((element, index) => (
            <div key={element.id || index} className="element">
              {/* Contenu de l'élément */}
              {element.nom || element.title || `Élément ${index + 1}`}
            </div>
          ))}
        </div>
      )}
      
      <button onClick={gererAction} className="bouton-action">
        Effectuer une action
      </button>
    </div>
  );
};

// Définition des types des props
NomComposant.propTypes = {
  titre: PropTypes.string,
  elements: PropTypes.array,
  onAction: PropTypes.func
};

// Valeurs par défaut pour les props
NomComposant.defaultProps = {
  titre: 'Titre par défaut',
  elements: [],
  onAction: () => {}
};

export default NomComposant;