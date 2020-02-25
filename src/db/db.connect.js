/**
 * fichier de connection à la base de données
 */

 //appel du module db config, qu'on a créé, possible grace au module.export qu'on a fait.
 const config = require('./db.config');

 //Appel du connecteur pour Mongodb, mangoose fait le lien entre mangodb et node.
 const mongoose = require('mongoose')

 // a definir plus tard
 mongoose.Promise = global.Promise;

 // Connexion a la base de mongoDB
 const connectDb = ()=> {
     return mongoose.connect(config.url,{
        useNewUrlParser:true, //param obligatoire pour mongo, pour compatibilité jeej
        useUnifiedTopology:true})
 }

module.exports = connectDb;