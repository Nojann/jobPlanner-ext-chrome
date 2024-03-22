# Description

L'extension chrome Jobr permet d'enregistrer des offres d'emploi dans le dashboard Jobr.

# Installation

1. Cloner le repo.
```
git clone https://github.com/Nojann/jobPlanner-ext-chrome.git
```

2. Dans Chrome, aller dans le menu de gestion des extensions.
```
chrome://extensions/
```

3. Activer le mode développeur.
4. Charger l'extension non empactée (sélectionner le dossier du repo).

# Lier l'extension à une url spécifique
Dans le fichier _background.js_, modifier les différents urls du fichier. 
Dans le fichier _manifest.json_, ajouter l'url à _host_permissions_.
