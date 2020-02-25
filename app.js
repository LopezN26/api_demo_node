/**
 * Application NodeJS API + MongoDB
 */

 // Utilisation de express pour créer une application
 const express = require("express");
 const app = express();

 // Décalration acces a la bdd
 const connection = require ('./src/db/db.connect')
 //utilisation d'un parser de requete http
 const parser = require('body-parser');

  //utilisation d'un parser de requete http
  const crud = require('./src/api/api.crud');

 //déclarer le port de travail
 const port = 5000;

 //Déclaration du port d'écoute de l'api
 app.listen(port, ()=>{
     console.log(`NodeJS API listening on port ${port}`);
     //placeholder code connexion db
     connection()
     .then(()=>{console.log('Connect to MongoDB!')}) //si ca marche
     .catch( (error)=>{
         console.log(`Oooooops, something went wrong ... ${error}`)
     });

 });

 //utilisation d'un middleware pour parser les requetes http
 app.use(parser.urlencoded({extended:true}));
 app.use(parser.json());

 //Déclaration des routes de l'API
 // Code de gestion des appels vers l'API

 app.get('/', (req,res)=>{ //methode GET de express, param1 données recu en appel, param2 données renvoyé par méthode GET, 
datas = {                  // et pas besoin de return du coup, c GET qui le fait
        "name":"Simple NodeJS API"
    }
    res.json(datas);
 })

 //gestion des routes pour les requetes CRUD
 // GET : lecture de donnés de la table
 app.get('/api/mytable', crud.getAll);

 app.get('/api/mytable/:id', crud.getById);

 //création d'un enregistrement
app.post('/api/mytable/create', crud.create)

//update de la bdd
app.delete('/api/mytable/delete/:id', crud.delete)

