// on récupère express 
const express=require('express');

// on importe nos controllers
const mainController=require('./controllers/mainController');



//on crée un router
const router=express.Router();

//page d'accueil
router.get('/', mainController.homePage);

//page des lacs
router.get('/lacs');

//page de santé
router.get('/sante');

//page des equipements
router.get('/equipements');

//on exporte le router
module.exports=router;