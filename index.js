/**
 * fichier principal Application NodeJS
 */

 //Appel de la bibliothèque HTTP
const server = require("http");

let name = "Olivier";
 // Création su serveur NodeJS
server.createServer(function(req,res){
    res.writeHead(200, {
        'content-Type': 'text/html',

    });
    res.end(`<h1>${name} shot first ...</h1>`)
}).listen(15024);

//Réécriture
// server.createServer( 
//     (req,res)=>{

//     }
// ).listen(8080);