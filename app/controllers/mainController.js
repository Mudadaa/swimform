const lacsData =require('../lacs.json');
//nb: dues à des problèmes de MIMES (text/html) le fetch ne fonctionnait pas et 
//la ressource càd la promesse était blockée. En mettant le fichier app.js dans le dossier public => success
// car app.use(express.static('public')) sert les fichiers CSS et JavaScript !!
const fetchMiddleware = require('../middlewares/fetchMiddleware.js');


const mainController = {
  async homePage(req, res) {
    
      // Récupérer les données des régions depuis l'API
      const regionsData = await fetchMiddleware.fetchRegionsfromAPI();
      const regionsNames = regionsData.map(region => region.nom);
      console.log(regionsNames);
    //  const lacsData= await fetchMiddleware.fetchLacsfromJSON();
       const lacs=lacsData.map(lac=>lac.nom);
       console.log(lacs);
      // Rendre la page "accueil" avec les noms des régions
      res.render('accueil', { regionsNames },{lacs});}
    } ;
  


module.exports = mainController;


