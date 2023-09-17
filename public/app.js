const app = {
    //init est une fonction asynchrone car elle reprend les fonctions asynchrones
    //et leur donne un ordre d'exécution avec les données 
    init: async function () {
        //les données qui vont être récupérés de l'API sont mis dans la const regionsData
        // le this fait référence à la fonction fetchRegions
      const regionsData = await this.fetchRegions();
      //on récupère les noms des régions
      const regionNames = regionsData.map(region => region.nom);
      // on donne en paramètre les noms des régions à la fonction createRegionOptions
      this.createRegionOptions(regionNames);
      console.log(regionNames);
        this.takelakes();
    },
  
    fetchRegions: async function () {
      try {
        //on récupère les données des régions de l'API
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

    takelakes: function(){
        
           const response=  fetch('./lacs.json');
           if (response.ok){
                const dataLake = response.json();
        } else  {
            throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
            
        }
    },
  
    createRegionOptions: function (regionNames) {
      const regionsSelect = document.getElementById('regions');
  
      for (let i = 0; i < regionNames.length; i++) {
        const option = document.createElement('option');
        option.textContent = regionNames[i];
        regionsSelect.appendChild(option);
      }
    },





  };




  document.addEventListener('DOMContentLoaded', function() {
    app.init();
  });