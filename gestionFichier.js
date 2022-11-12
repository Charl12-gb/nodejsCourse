const fs = require('fs');

// if (fs.existsSync('./mesFichier')) {
//     fs.rmdir('./mesFichier', (erreur) => {
//         if (erreur) {
//             console.log(erreur);
//         } else {
//             console.log('Dossier supprimé');
//         }
//     });
// } else {
//     fs.mkdir('./mesFichier', (erreur) => {
//         if (erreur) {
//             console.log(erreur);
//         } else {
//             console.log('Dossier Créé');
//         }
//     });
// }

// fs.writeFile('./mesFichier/fich1.txt', 'Je suis dévéloppeur', () => {
//     console.log('Fichier créé');
// })

// fs.readFile('./mesFichier/fich1.txt', (erreur, donne) => {
//     if (erreur) {
//         console.log(erreur);
//     } else {
//         console.log(donne.toString());
//     }
// })