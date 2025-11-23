/**
 * Template de configuration d'application
 * 
 * Ce template montre la structure de base d'un fichier de configuration
 * pour une application backend Node.js avec variables d'environnement.
 */

// Chargement des variables d'environnement
require('dotenv').config();

// Configuration de l'application
const config = {
  // Configuration du serveur
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    environment: process.env.NODE_ENV || 'development'
  },

  // Configuration de la base de données
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'myapp',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: process.env.DB_LOGGING === 'true' || false
  },

  // Configuration de l'authentification
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key',
    jwtExpiration: process.env.JWT_EXPIRATION || '1d', // Format: '1d', '24h', '30m'
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 12
  },

  // Configuration des services externes
  services: {
    email: {
      provider: process.env.EMAIL_PROVIDER || 'smtp',
      apiKey: process.env.EMAIL_API_KEY,
      from: process.env.EMAIL_FROM || 'noreply@myapp.com'
    },
    storage: {
      provider: process.env.STORAGE_PROVIDER || 'local',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1',
      bucket: process.env.AWS_S3_BUCKET
    }
  },

  // Configuration de la sécurité
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: process.env.CORS_CREDENTIALS === 'true' || true
    },
    rateLimiting: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX) || 100 // Limite par IP
    }
  },

  // Configuration pour les logs
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined', // 'combined', 'dev', 'short', 'tiny'
    silent: process.env.LOG_SILENT === 'true' || false
  }
};

// Validation de la configuration
const validateConfig = (config) => {
  const required = ['database.name', 'auth.jwtSecret'];
  const missing = [];

  required.forEach(key => {
    const value = key.split('.').reduce((obj, k) => obj?.[k], config);
    if (!value) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    throw new Error(`Configuration manquante: ${missing.join(', ')}`);
  }

  return true;
};

// Valider la configuration au démarrage
try {
  validateConfig(config);
} catch (error) {
  console.error('Erreur de configuration:', error.message);
  process.exit(1);
}

module.exports = config;