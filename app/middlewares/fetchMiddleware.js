
async function fetchRegionsfromAPI(){
    try {
      const reponse = await fetch('https://geo.api.gouv.fr/regions', {
          method: 'GET',
          //on précise qu'on veut du json dans l'en-tête de la requête
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    }})
      if (reponse.ok){
        const regionsData= await reponse.json();
  
        return regionsData;
      }else{
        console.error(`Erreur HTTP : ${reponse.status} - ${reponse.statusText}`);
      }
    } catch (error) {
      console.error(`Une erreur s'est produite : ${error.message}`);
    }
  };
  
   
  
module.exports={fetchRegionsfromAPI};