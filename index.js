//on importe les dépendances
const express=require('express');
//on crée l'app express
const app=express();

//on renvoit la route vers le fichier index.html 
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/accueil.html');
}   );
//on sert toutes les ressources présents dans le dossier public
app.use(express.static('public'));

//on lance le serveur sur le port 5000
app.listen(5000,()=>{
    console.log('Server is running at port 5000');
}   );