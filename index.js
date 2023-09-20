//on importe les dépendances
const express=require('express');

PORT=5000;
//on crée l'app express
const app=express();

//on importe le router
const router=require('./app/router');

//le moteur de rendu
app.set('view engine', 'ejs');

//on sert toutes les ressources présentes dans le dossier public
 app.use(express.static('public'));

//on utilise le router
app.use(router);

//on lance le serveur sur le port 5000
app.listen(PORT,()=>{
    console.log(`Le Server écoute sur le port ${PORT}`);
});