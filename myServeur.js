const http = require("http");
const fs = require("fs");
const uuid = require("uuid");

const serveur = http.createServer((requete, reponse) => {
    console.log(uuid.v4());
    //Définition de l'entête
    reponse.setHeader("content-type", "text/html");

    let fichier = "";
    if (requete.url === "/accueil") {
        fichier = "./IHM/accueil.html";
    } else {
        fichier = "./IHM/erreur.html";
    }
    fs.readFile(fichier, (erreur, donne) => {
        if (erreur) {
            console.log(erreur);
            reponse.end();
        } else {
            reponse.end(donne);
        }
    });
});

serveur.listen(3001, "localhost", () => {
    console.log("Serveur ready");
});