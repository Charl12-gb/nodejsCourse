const express = require('express');

const app = express();

const morgan = require('morgan');

app.use(express.static('public'));

app.use(morgan('tiny'));

app.get('/accueil', (req, res) => {
    res.status(200).sendFile('./IHM/accueil.html', { root: __dirname });
});

app.get('/', (req, res) => {
    res.status(300).redirect('/accueil');
});

app.use((req, res) => {
    res.status(404).sendFile('./IHM/erreur.html', { root: __dirname });
});

app.listen(3001, () => {
    console.log('En attente de requete');
});
console.log('Erreur lors de la création');