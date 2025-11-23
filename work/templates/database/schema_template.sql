/**
 * Template de modèle de base de données
 * 
 * Ce template montre la structure de base d'un modèle
 * pour une base de données relationnelle (ex: PostgreSQL, MySQL).
 * 
 * Adapté pour un système d'ORM comme Sequelize ou Mongoose
 */

/*
 * Table: nom_table
 * Description: Description de ce que représente cette table
 */
CREATE TABLE nom_table (
  -- Clé primaire
  id SERIAL PRIMARY KEY,
  
  -- Champs obligatoires
  nom VARCHAR(255) NOT NULL COMMENT 'Nom de l\'entité',
  description TEXT COMMENT 'Description détaillée de l\'entité',
  
  -- Champs temporels
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Date de dernière mise à jour',
  
  -- Champs optionnels
  statut ENUM('actif', 'inactif', 'supprimé') DEFAULT 'actif' COMMENT 'Statut de l\'entité',
  metadata JSON COMMENT 'Données supplémentaires au format JSON',
  
  -- Contraintes
  CONSTRAINT chk_nom_table_nom CHECK (LENGTH(nom) > 0)
);

-- Index pour les recherches fréquentes
CREATE INDEX idx_nom_table_nom ON nom_table(nom);
CREATE INDEX idx_nom_table_statut ON nom_table(statut);

-- Exemple de clé étrangère vers une autre table
-- ALTER TABLE nom_table ADD CONSTRAINT fk_nom_table_autre_table 
--   FOREIGN KEY (autre_table_id) REFERENCES autre_table(id);

/*
 * Exemple de vue pour des requêtes complexes
 */
CREATE VIEW vue_nom_table AS
SELECT 
  id,
  nom,
  description,
  statut,
  created_at,
  updated_at,
  -- Calculs ou jointures si nécessaires
  CONCAT(nom, ' - ', description) AS nom_complet
FROM nom_table
WHERE statut = 'actif';

/*
 * Exemple de procédure stockée pour une opération fréquente
 */
DELIMITER //
CREATE PROCEDURE GetNomTableActifs()
BEGIN
  SELECT * FROM nom_table WHERE statut = 'actif';
END //
DELIMITER ;