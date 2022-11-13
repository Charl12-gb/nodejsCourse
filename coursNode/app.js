const express = require('express');
const { status } = require('express/lib/response');
const app = express();

// Définition du moteur d'affichage ejs
app.set("view engine", "ejs");
app.set("views", "IHM");

app.get('/', (req, res) => {
    const dateVisite = Date().toString();
    const notes = [
        { title: "Title 1", desc: "1- Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "Title 2", desc: "2- Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "Title 3", desc: "3- Lorem ipsum dolor sit amet consectetur adipisicing elit." }
    ];
    res.status(200).render("index", { dateVisite, notes });
});

app.get('/about', (req, res) => {
    res.status(200).render("about");
});

app.use((req, res) => {
    res.status(404).render("erreur");
});

app.listen(3001, () => {
    console.log('En attente de requete');
});