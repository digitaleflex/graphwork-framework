# Système de Templates

Le système de templates du GraphWork Framework 2.0 fournit des modèles réutilisables et adaptables pour la génération de code assistée par IA.

## Organisation des Templates

### 1. Templates Spécifiques à la Technologie (`technology-specific/`)

#### Backend (`backend/`)
Templates pour les différentes technologies backend:

##### Node.js (`nodejs/`)
- `controller_template.js`: Template pour les contrôleurs Express
- `service_template.js`: Template pour les services métier
- `model_template.js`: Template pour les modèles de données
- `middleware_template.js`: Template pour les middlewares
- `router_template.js`: Template pour les routeurs

##### Python (`python/`)
- `django_view_template.py`: Template pour les vues Django
- `fastapi_endpoint_template.py`: Template pour les endpoints FastAPI
- `pydantic_model_template.py`: Template pour les modèles Pydantic
- `service_layer_template.py`: Template pour la couche service
- `data_access_template.py`: Template pour l'accès aux données

##### Java (`java/`)
- `spring_controller_template.java`: Template pour les contrôleurs Spring
- `spring_service_template.java`: Template pour les services Spring
- `jpa_entity_template.java`: Template pour les entités JPA
- `dto_template.java`: Template pour les objets de transfert de données
- `repository_template.java`: Template pour les repositories

##### Go (`go/`)
- `handler_template.go`: Template pour les gestionnaires HTTP
- `service_template.go`: Template pour les services Go
- `model_template.go`: Template pour les modèles de données Go
- `repository_template.go`: Template pour les repositories Go
- `router_template.go`: Template pour les routeurs Go

#### Frontend (`frontend/`)
Templates pour les différentes technologies frontend:

##### React (`react/`)
- `component_template.jsx`: Template pour les composants React
- `hook_template.js`: Template pour les hooks React
- `context_template.js`: Template pour les contextes React
- `hoc_template.js`: Template pour les composants d'ordre supérieur
- `form_template.jsx`: Template pour les formulaires React

##### Vue (`vue/`)
- `component_template.vue`: Template pour les composants Vue
- `composable_template.js`: Template pour les composables Vue
- `store_module_template.js`: Template pour les modules Vuex
- `route_template.js`: Template pour les routes Vue
- `layout_template.vue`: Template pour les layouts Vue

##### Angular (`angular/`)
- `component_template.ts`: Template pour les composants Angular
- `service_template.ts`: Template pour les services Angular
- `module_template.ts`: Template pour les modules Angular
- `component_template.html`: Template HTML pour composants
- `directive_template.ts`: Template pour les directives Angular

##### Svelte (`svelte/`)
- `component_template.svelte`: Template pour les composants Svelte
- `store_template.js`: Template pour les stores Svelte
- `action_template.js`: Template pour les actions Svelte
- `route_template.js`: Template pour les routes Svelte
- `animation_template.js`: Template pour les animations Svelte

#### Base de Données (`database/`)
Templates pour les différentes technologies de base de données:

##### PostgreSQL (`postgresql/`)
- `table_schema_template.sql`: Template pour les schémas de table
- `function_template.sql`: Template pour les fonctions PostgreSQL
- `trigger_template.sql`: Template pour les triggers PostgreSQL
- `index_template.sql`: Template pour les index PostgreSQL
- `view_template.sql`: Template pour les vues PostgreSQL

##### MySQL (`mysql/`)
- `table_schema_template.sql`: Template pour les schémas de table MySQL
- `procedure_template.sql`: Template pour les procédures MySQL
- `function_template.sql`: Template pour les fonctions MySQL
- `trigger_template.sql`: Template pour les triggers MySQL
- `view_template.sql`: Template pour les vues MySQL

#### Infrastructure (`infrastructure/`)
Templates pour les technologies d'infrastructure:

##### Docker (`docker/`)
- `Dockerfile_template`: Template pour les Dockerfiles
- `docker-compose_template.yml`: Template pour docker-compose
- `multi-stage_template.Dockerfile`: Template pour Docker multi-stage
- `init_script_template.sh`: Template pour les scripts d'initialisation
- `health_check_template.sh`: Template pour les checks de santé

### 2. Templates Spécifiques au Domaine (`domain-specific/`)

#### E-commerce (`e-commerce/`)
- `product_model_template.js`: Template pour le modèle produit
- `order_management_template.js`: Template pour la gestion des commandes
- `payment_integration_template.js`: Template pour l'intégration de paiement
- `inventory_template.js`: Template pour la gestion des stocks
- `customer_template.js`: Template pour la gestion client

#### Réseau Social (`social-network/`)
- `user_profile_template.js`: Template pour les profils utilisateurs
- `feed_algorithm_template.js`: Template pour l'algorithme de fil d'actualité
- `notification_template.js`: Template pour la gestion des notifications
- `content_moderation_template.js`: Template pour la modération de contenu
- `privacy_template.js`: Template pour la gestion de la vie privée

#### Finance (`financial/`)
- `transaction_template.js`: Template pour la gestion des transactions
- `risk_assessment_template.js`: Template pour l'évaluation des risques
- `compliance_template.js`: Template pour la conformité financière
- `reporting_template.js`: Template pour les rapports financiers
- `audit_template.js`: Template pour les logs d'audit financier

#### Santé (`healthcare/`)
- `patient_record_template.js`: Template pour les dossiers patients
- `medical_workflow_template.js`: Template pour les workflows médicaux
- `consent_management_template.js`: Template pour la gestion des consentements
- `interoperability_template.js`: Template pour l'interopérabilité
- `security_template.js`: Template pour la sécurité des données médicales

### 3. Templates Spécifiques au Patron (`pattern-specific/`)

#### MVC (`mvc/`)
- `model_template.js`: Template pour le modèle MVC
- `view_template.js`: Template pour la vue MVC
- `controller_template.js`: Template pour le contrôleur MVC
- `binding_template.js`: Template pour les liaisons de données
- `validation_template.js`: Template pour la validation MVC

#### Microservices (`microservices/`)
- `service_template.js`: Template pour un microservice
- `api_gateway_template.js`: Template pour l'API Gateway
- `service_discovery_template.js`: Template pour la découverte de service
- `circuit_breaker_template.js`: Template pour le Circuit Breaker
- `message_broker_template.js`: Template pour les brokers de messages

## Caractéristiques des Templates

Chaque template inclut:
- Des commentaires explicatifs
- Des placeholders pour la personnalisation
- Des exemples d'utilisation
- Des vérifications de sécurité et de qualité
- Des configurations de tests
- Des points d'extension pour la personnalisation