/**
 *  Modélisation de la table mytable 
 * sur le bdd mongobd
 */

 const  mongoose = require('mongoose');

 // Schéa de construction de la table mytable
 const mytableSchema = new mongoose.Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    presence:{type:Boolean, required:true, default:true}, //required, champ requis, default, vlaeur si champ non rempli
    email:{type:Boolean, required:true,}
 });

 //création de la table dans la bdd

 const mytable = mongoose.model("mytable",mytableSchema);

 //export du module

 module.exports = mytable;
 
