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
      // on fait pareil mais pour les lacs
        const lacsData = await this.takelakes();
        const lacNames = lacsData.map(lac => lac.nom);
        const lacRegion = lacsData.map(lac => lac.region);
        console.log(lacRegion);
        this.createLacOptions(lacNames);
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

    takelakes: async function(){
        //on récupère les données des lacs du JSON
        //lien internet https://www.campingsluxe.fr/blog/top-20-plus-beaux-lacs-de-france
           const response= await fetch('./lacs.json', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            });
           if (response.ok){
                const lacsData = await response.json();
                console.log(lacsData);
                return lacsData;
                
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
      }},

      createLacOptions: function (lacNames) {
        const lacsSelect = document.getElementById('lacs');
    
        for (let i = 0; i < lacNames.length; i++) {
          const option = document.createElement('option');
          const lacOptions=option.textContent ;
          lacOptions= lacNames[i].filter(this.regionNames=> this.regionNames=== this.lacRegion);
         lacsSelect.appendChild(lacOptions);
        }
    },





  };




  document.addEventListener('DOMContentLoaded', function() {
    app.init();
  });