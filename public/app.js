
//nb: dues à des problèmes de MIMES (text/html) le fetch ne fonctionnait pas et 
//la ressource càd la promesse était blockée. En mettant le fichier app.js dans le dossier public => success
// car app.use(express.static('public')) sert les fichiers CSS et JavaScript !!


const app = {
  // on met en place ces tableaux vident en propriété pour une accessibilité générale 
  regionNames: [],// Garde les noms des régions
  lacsData: [], // Garde les données des lacs

//init regroupe les fonctions qui vont être appelées au chargement de la page
//le .this permet de faire référence aux fonctions ou aux constantes obtenu dans l'objet app
// et de les réutiliser 
  init: function () {
   
    this.fetchRegions()
    // la méthode fetch est une promesse donc asynchrone d'où le .then
      .then((regionsData) => {
        // Stockage des noms des régions
        this.regionNames = regionsData.map((region) => region.nom);
        // Création des options pour la liste déroulante des régions
        this.createRegionOptions(this.regionNames);
        // Affichage des noms des régions dans la console
        console.log(this.regionNames);

        // Appel à la fonction pour récupérer les données des lacs localement
        return this.takelakes();
      })
      .then((lacsData) => {
        // Stockage des données des lacs
        this.lacsData = lacsData;
        // Récupération des noms des lacs
        const lacNames = lacsData.map((lac) => lac.nom);
        // Création des options pour la liste déroulante des lacs
        this.createLacOptions(lacNames);
        // Affichage des données des lacs dans la console
        console.log(this.lacsData);
        // Ajout d'un gestionnaire d'événements après le chargement des données des lacs
        this.addRegionSelectEventListener();
      })
      .catch((error) => {
        console.error(error);
      });
  },

  // Fonction pour récupérer les données des régions depuis une API externe
  fetchRegions: async function () {
    try {
      const response = await fetch('https://geo.api.gouv.fr/regions', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Une erreur s'est produite lors de la récupération des données de l'API : ${error.message}`);
    }
  },

  // Fonction pour récupérer les données des lacs localement
  takelakes: async function () {
    try {
      const response = await fetch('./lacs.json', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const lacsData = await response.json();
        console.log(lacsData);
        return lacsData;
      } else {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Une erreur s'est produite lors de la récupération des données des lacs : ${error.message}`);
    }
  },

  // Fonction pour créer des options pour la liste déroulante des régions
  createRegionOptions: function (regionNames) {
    const regionsSelect = document.getElementById('regions');

    for (let i = 0; i < regionNames.length; i++) {
      const option = document.createElement('option');
      option.textContent = regionNames[i];
      regionsSelect.appendChild(option);
    }
  },

  // Fonction pour créer des options pour la liste déroulante des lacs
  createLacOptions: function (lacNames) {
    const lacsSelect = document.getElementById('lacs');

    for (let i = 0; i < lacNames.length; i++) {
      const option = document.createElement('option');
      option.textContent = lacNames[i];
      lacsSelect.appendChild(option);
    }
  },
 // Fonction pour ajouter un gestionnaire d'événements à la liste déroulante des régions
addRegionSelectEventListener: function () {
  const regionsSelect = document.getElementById('regions');
  const lacsSelect = document.getElementById('lacs');

  regionsSelect.addEventListener('change', () => {
    const selectedRegion = regionsSelect.value;
    const filteredLacs = this.lacsData.filter((lac) => lac.region === selectedRegion);
    const lacNames = filteredLacs.map((lac) => lac.nom);

    // Efface les options actuelles dans la liste déroulante des lacs

    // La boucle while suivante est utilisée pour retirer toutes les options actuelles
    // dans la liste déroulante des lacs. Nous commençons par la première option (indice 0)
    // et continuons à la supprimer jusqu'à ce qu'il n'y ait plus d'options à supprimer.
    // Cela permet de nettoyer la liste déroulante des lacs avant d'ajouter les nouvelles options.
    while (lacsSelect.options.length > 0) {
      lacsSelect.remove(0); // Supprime l'option à l'indice 0
    }

    // Ajoute les options des lacs filtrés à la liste déroulante des lacs
    this.createLacOptions(lacNames);
  });
},

};

document.addEventListener('DOMContentLoaded', function () {
  app.init();
 });




