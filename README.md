# King Parrain

Site web de parrainage permettant aux utilisateurs de trouver des parrains et des filleuls pour différentes marques.

## Fonctionnalités

- Inscription et connexion des utilisateurs (classique et Google)
- Système de parrainage avec deux types d'utilisateurs (parrain/filleul)
- Recherche de marques et de parrainages
- Interface moderne et responsive
- Sécurité renforcée avec JWT et bcrypt

## Technologies utilisées

### Frontend
- HTML5
- CSS3 avec variables CSS et Flexbox/Grid
- JavaScript vanilla moderne
- Google Identity Services pour l'authentification

### Backend
- Node.js
- Express.js
- MySQL
- JWT pour l'authentification
- bcrypt pour le hachage des mots de passe

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/kingparrain.git
cd kingparrain
```

2. Installez les dépendances :
```bash
cd backend
npm install
```

3. Configurez les variables d'environnement :
- Copiez `.env.example` vers `.env`
- Modifiez les variables dans `.env` avec vos propres valeurs

4. Initialisez la base de données :
- Créez une base de données MySQL
- Importez le fichier `database.sql`

5. Démarrez le serveur :
```bash
npm start
```

## Structure du projet

```
kingparrain/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
├── backend/
│   ├── routes/
│   ├── models/
│   └── controllers/
└── docs/
```

## Configuration

### Variables d'environnement

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=kingparrain
JWT_SECRET=votre_secret_jwt
PORT=3000
```

### Base de données

Le schéma de la base de données est disponible dans le fichier `database.sql`.

## Déploiement

Le projet est configuré pour être déployé sur OVH. Consultez le guide de déploiement dans la documentation pour plus de détails.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT 