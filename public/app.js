const app = {
  regionNames: [],
  lacsData: [], // Store the lakes data

  init: function () {
    this.fetchRegions()
      .then((regionsData) => {
        this.regionNames = regionsData.map((region) => region.nom);
        this.createRegionOptions(this.regionNames);
        console.log(this.regionNames);

        return this.takelakes();
      })
      .then((lacsData) => {
        this.lacsData = lacsData; // Store the lakes data
        const lacNames = lacsData.map((lac) => lac.nom);
        this.createLacOptions(lacNames);
        console.log(this.lacsData);
        this.addRegionSelectEventListener(); // Add event listener after lakes data is loaded
      })
      .catch((error) => {
        console.error(error);
      });
  },

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

  createRegionOptions: function (regionNames) {
    const regionsSelect = document.getElementById('regions');

    for (let i = 0; i < regionNames.length; i++) {
      const option = document.createElement('option');
      option.textContent = regionNames[i];
      regionsSelect.appendChild(option);
    }
  },
  createLacOptions: function (lacNames) {
    const lacsSelect = document.getElementById('lacs');

    for (let i = 0; i < lacNames.length; i++) {
      const option = document.createElement('option');
      option.textContent = lacNames[i];
      lacsSelect.appendChild(option);
    }
  },

  addRegionSelectEventListener: function () {
    const regionsSelect = document.getElementById('regions');
    const lacsSelect = document.getElementById('lacs');

    regionsSelect.addEventListener('change', () => {
      const selectedRegion = regionsSelect.value;
      const filteredLacs = this.lacsData.filter((lac) => lac.region === selectedRegion);
      const lacNames = filteredLacs.map((lac) => lac.nom);

      // Clear the current options in the lakes select element
      while (lacsSelect.options.length > 0) {
        lacsSelect.remove(0);
      }

      // Add the filtered lake options to the lakes select element
      this.createLacOptions(lacNames);
    });
  },
};

document.addEventListener('DOMContentLoaded', function () {
  app.init();
 });




