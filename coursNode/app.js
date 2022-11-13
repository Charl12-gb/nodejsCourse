const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const notesoutes = require('./routes/notesRoute');


const optionBd = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'notes_bd'
};

const app = express();

//Extration des données du formulaire
app.use(express.urlencoded({ extended: false }));

//Définition de la connexion
app.use(myConnection(mysql, optionBd, 'pool'));

// Définition du moteur d'affichage ejs
app.set("view engine", "ejs");
app.set("views", "IHM");

//Définition de route  pour notes
app.use(notesoutes);

app.get('/about', (req, res) => {
    res.status(200).render("about");
});

app.use((req, res) => {
    res.status(404).render("erreur");
});

app.listen(3001, () => {
    console.log('En attente de requete');
});