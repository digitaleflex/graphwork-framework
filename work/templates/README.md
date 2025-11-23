# Templates de Code

Ce dossier contient des templates de code réutilisables pour différents types de fichiers et structures.
Ces templates servent de base de connaissance pour les IA lorsqu'elles génèrent du code dans un projet.

## Structure

- `backend/` : templates pour les composants backend (controllers, services, models, etc.)
- `frontend/` : templates pour les composants frontend (components, pages, hooks, etc.)
- `database/` : templates pour les structures de base de données (schemas, migrations, etc.)
- `tests/` : templates pour les tests unitaires et d'intégration
- `api/` : templates pour les endpoints et documentation API
- `config/` : templates pour les fichiers de configuration

## Utilisation

Lorsque vous utilisez des outils d'IA pour générer du code :

1. Fournissez les templates pertinents comme contexte
2. L'IA pourra s'inspirer de ces structures pour générer du code cohérent
3. Les nouveaux fichiers générés devraient suivre les mêmes patterns que les templates

## Principes de création de templates

1. **Simplicité** : Les templates doivent être simples et faciles à comprendre
2. **Extensibilité** : Ils doivent permettre des extensions sans casser la structure
3. **Conformité** : Ils doivent respecter les standards de codage définis dans `work/05-quality/`
4. **Documentation** : Ils doivent inclure des commentaires explicatifs pour guider l'IA