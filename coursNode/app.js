const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

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

app.get('/', (req, res) => {

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query('SELECT * FROM notes', [], (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);
                } else {
                    res.status(200).render('index', { resultat });
                }
            });
        }
    });
});

app.post('/notes', (req, res) => {
    let id = req.body.id === "" ? null : req.body.id;
    let title = req.body.title;
    let description = req.body.description;

    let reqSql = id === null ? 'INSERT INTO notes(id, title, description) VALUES(?, ?, ?)' : 'UPDATE notes SET title = ?, description = ? WHERE id = ?';
    let donnees = id === null ? [null, title, description] : [title, description, id];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query(reqSql, donnees, (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);
                } else {
                    res.status(300).redirect("/");
                }
            });
        }
    });
});

app.delete('/notes/:id', (req, res) => {
    let id = req.params.id;

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query("DELETE FROM notes where id = ?", [id], (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);
                } else {
                    res.status(200).json({ routeRacine: "/" });
                }
            });
        }
    });
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