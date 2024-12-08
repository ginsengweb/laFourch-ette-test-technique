# La Fourche - Test Technique Fullstack

## Sujet

Le but de ce test technique est de tester ta capacité à t'adapter rapidement lors de l'intégration d'un outil externe disposant d'une documentation exhaustive, ta capacité à construire un state dans une application React et a appliquer quelques modifications en back pour adapter une API.

Tu vas donc devoir créer une page de recherche de produits en utilisant Algolia ✅, ainsi qu'un panier ecommerce ✅.

### Contexte

Ce repo contient une application Next.js préconfiguré, disposant de Typescript mais acceptant le JS, avec Algolia InstantSearch préconfiguré dans la page "/".

Développer en Typescript n'est pas obligatoire dans le front, mais constitue un plus (aucun type n'est défini dans le projet par défaut).

Côté back, développer en Typescript est obligatoire (le framework utilisé est NestJS).

**Ce sujet a été écrit pour être fait en 2h, si tu finis avant, tant mieux pour toi, mais c'est comme un marathon, le plus important c'est d'arriver au bout. Et comme dans un marathon, il y a une durée limite : si tu arrives à 4h de travail, arrêtes et rends la copie. Cela ne veut pas dire que le test est raté, il y a forcément quelque chose à tirer de ce travail.**

### Setup

#### Option 1 : Docker

Tu peux utiliser Docker et Docker Compose pour run ce projet ✅.

Dans ce cas, utilise le script `cli/npm` pour exécuter NPM dans les conteneurs comme tel :

```bash
# cli/npm ${PROJECT} ${NPM_COMMAND}

cli/npm front install
cli/npm back install
```

Puis lance le projet :

```bash
docker compose up
```

Le back et le front démarrent respectivement sur les ports 4000 et 3000.

Le network est configuré en mode `host` pour simplifier les appels, les urls suivantes fonctionnent en local et dans les conteneurs :

- Front : http://localhost:3000
- Back : http://localhost:4000

#### Option 2 : Node local

Tu sais probablement te débrouiller avec NPM et NodeJS pour lancer le back et le front, dispos respectivement dans les dossiers `back` et `front`.

Les ports sont également 3000 pour le front et 4000 pour le back.

### Page de recherche

La page de recherche doit être construite avec Algolia InstantSearch ✅, elle doit être la page principale du site (accessible sur /) ✅.

La recherche est constituée d'un input de texte pour la recherche ✅, ainsi que des résultats de la recherche ✅. Les résultats de la recherche doivent se mettre à jour automatiquement au fur et à mesure que l'on tape dans l'input ✅. **Pour ceux qui ne connaissent pas Algolia InstantSearch, pas de panique, tout ceci est natif dans l'outil.**

La recherche peut ne pas disposer de pagination, afficher les 20 résultats les plus pertinants sera considéré comme un exercice réussi ✅.
S'il te reste du temps, ajouter une pagination constitue un plus.

Les produits doivent être présentés sous forme de Cards disposant au minimum des éléments suivants :

- une image ❌ (le champs existe dans la base de données Algolia, j'ai oublié de l'intégrer)
- un nom ✅
- un prix ✅
- un bouton "Ajouter au panier" ou "Supprimer du panier" ✅

Les Cards doivent être présentées dans une grille, avec 4 éléments par ligne en Desktop, et 2 éléments par ligne en mobile ❌.

Le style de la Card est libre et ne représente pas un critère déterminant dans l'évaluation du test, veille juste à faire quelque chose de lisible.

### Panier

L'application laisse la possibilité d'ajouter des produits à un panier ecommerce. ✅

Le state du panier doit être accessible globalement dans l'application, l'utilisation de librairies de gestion du state est autorisée mais pas obligatoire : fait ce qu'il te plait. ✅

Pour simplifier l'exercice, le panier ne dispose pas d'une gestion de quantités : un produit ne peut être qu'une seule fois dans le panier. ✅

L'utilisateur peut ajouter un produit dans le panier grâce au bouton "Ajouter au panier" disponible sur les Cards produit. SI le produit est déjà dans le panier, le bouton "Ajouter au panier" est remplacé par un bouton "Supprimer du panier" qui a pour action de... supprimer le produit du panier ! ✅

Le panier doit être synchronisé dans le backend grâce à l'API mise à disposition dans le dossier `back`. Ce backend n'est pas totalement implémenté, **il faut donc compléter cette implémentation.** Certains types et controlleurs sont déjà en place, tu peux t'en servir, les modifier, fait ce qu'il te plaît. ✅

Dans tous les cas, utilise le tableau déjà disponible dans le `CartService` en tant que base de donnée, ne cherche pas a mettre en place une autre base, ça te prendrait trop de temps. Cela a pour impact que les paniers sont tous supprimés à chaque redémarrage du serveur. ✅

Le panier sauvegardé dans le back permettra de conserver le panier au rechargement de la page dans le front.

Le panier doit être affiché dans une page à part : "/cart". Le panier doit être composé des éléments suivants : ✅

- Le prix total ✅
- La liste des produits, sous forme de liste, avec les informations suivantes pour chaque produit :
  - Le nom du produit ✅
  - Le prix ✅

Le style du panier est libre, une fois de plus, ce n'est pas un critère d'évaluation, à condition qu'il soit lisible.

### Retour sur le timing de développement de l'application
1. Doc, installation, lancement et découverte de docker +30' 
2. Lecture du cahier des charges et découverte du projet dans sa globalité. Découverte de Next.js et mise en place de l'architecture front et de la base React +50'
3. Recherche du concept et de l'identité globale et mise en place du style et du wording avec Tailwind et chatGpt +1h' 
4. Doc, installation, lancement et découverte d'Algolia' +1h30' 
5. Découverte de Nest.js et du back, fonctions API complétée avec l'aide de chatGPT +2h'
6. Panier fonctionnel pour récupérer et afficher les produits +2h25
7. Enchaînement de multiples bugs de gestion de versions des packages, des config de docker etc. 🥲+3h
8. Relecture du cahier des charges, implémentation des choses qui ont été oubliées dans le lot +3h30
9. Amélioration de certaines parties du code (gestion des erreurs, des appels API, typing, etc.) et début de la documentation +4h
10. Réaliser à +4 l'oubli de l'intégration de l'image et de la demande responsive pour les cartes 😳

## Documentation

### Front

Pour t'aider dans cet exercice, voici des liens de documentations utiles concernant Next.js et Algolia InstantSearch.

Un conseil, reste proche de la documentation, tout ce qui est demandé (hors panier) est natif de Next et Algolia InstantSearch.

- [Next.js](https://nextjs.org/docs/getting-started)
- [Algolia InstantSearch](https://www.algolia.com/products/instantsearch/)
- [Algolia InstantSearch React](https://github.com/algolia/react-instantsearch)

### Back

- [NestJS](https://docs.nestjs.com/)
