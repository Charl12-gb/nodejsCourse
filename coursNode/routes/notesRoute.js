const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
            res.status(500).render('error', { erreur });
        } else {
            connection.query('SELECT * FROM notes', [], (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);
                    res.status(500).render('error', { erreur });
                } else {
                    res.status(200).render('index', { resultat });
                }
            });
        }
    });
});

router.post('/notes', (req, res) => {
    let id = req.body.id === "" ? null : req.body.id;
    let title = req.body.title;
    let description = req.body.description;

    let reqSql = id === null ? 'INSERT INTO notes(id, title, description) VALUES(?, ?, ?)' : 'UPDATE notes SET title = ?, description = ? WHERE id = ?';
    let donnees = id === null ? [null, title, description] : [title, description, id];

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
            res.status(500).render('error', { erreur });
        } else {
            connection.query(reqSql, donnees, (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);
                    res.status(500).render('error', { erreur });
                } else {
                    res.status(300).redirect("/");
                }
            });
        }
    });
});

router.delete('/notes/:id', (req, res) => {
    let id = req.params.id;

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
            res.status(500).render('error', { erreur });
        } else {
            connection.query("DELETE FROM notes where id = ?", [id], (erreur, resultat) => {
                if (erreur) {
                    console.log(erreur);
                    res.status(500).render('error', { erreur });
                } else {
                    res.status(200).json({ routeRacine: "/" });
                }
            });
        }
    });
});
module.exports = router;