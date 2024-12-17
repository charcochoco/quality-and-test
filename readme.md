# Projet de Jeu du Pendu - Documentation

![Statements](coverage/badges/badge-statements.svg)
![Branches](coverage/badges/badge-branches.svg)
![Functions](coverage/badges/badge-functions.svg)
![Lines](coverage/badges/badge-lines.svg)

Bienvenue dans le projet de **jeu du pendu** ! 
Ce projet est une implémentation moderne du classique jeu du pendu. Le but est de deviner un mot en proposant des lettres, tout en évitant d'épuiser toutes vos tentatives. Le projet est développé avec une interface utilisateur dynamique et des tests automatisés pour garantir sa fiabilité.

---

## Fonctionnalités

- Interface utilisateur interactive pour jouer au pendu.
- Gestion des scores entre joueurs.
- Tests automatisés pour vérifier la fiabilité des fonctionnalités principales

---

## Technologies Utilisées

- **Frontend** : HTML, CSS, JavaScript
- **Tests** : Playwright, jest
- **CI/CD** : GitHub Actions

---

## Installation et Lancement

### Prérequis
- [Node.js](https://nodejs.org/) installé sur votre machine.
- [Git](https://git-scm.com/) pour cloner le dépôt.

### Étapes
1. Clonez le dépôt :  
   ```bash
   git clone https://github.com/charcochoco/quality-and-test.git
2. Naviguez dans le répertoire du projet :
    ```bash
    cd quality-and-test
2. Installez les dépendances :
    ```bash
    npm install
### Lancer l'application
- Lancer l'application
   ```bash
   npm start
L'application sera accessible sur [lien](http://localhost:3030).

### Lancer les tests
1. Lancez les tests avec jest :
   ```bash
   npm run test:unit
2. Lancez les tests avec Playwright :
   ```bash
   npm run test:e2E

---

## Structure du Projet

- **`game.js`** : Contient la logique principale du jeu.  
- **`tools.js`** : Fonctions utilitaires utilisées dans le jeu.  
- **`tests/`** : Contient les fichiers de tests pour chaque module.  
- **`index.js`** : Fichier principal du serveur qui configure l'application Express et les routes.  
- **`public/`** : Fichiers statiques tels que HTML, CSS et JavaScript côté client.  
- **`views/`** : Templates EJS utilisés pour rendre l'interface du jeu.  

---

## Améliorations futures

- Ajout de niveaux de difficulté.
- Intégration d’une base de données pour sauvegarder les scores en ligne.
- Design adaptatif pour une meilleure expérience sur mobile.

---

## Contributeurs

- Romain : Développeur principal.

---

## Licence

- Ce projet est sous licence MIT.

---

Merci d'avoir exploré ce projet. N'hésitez pas à contribuer ou à signaler des problèmes dans la section Issues du dépôt !