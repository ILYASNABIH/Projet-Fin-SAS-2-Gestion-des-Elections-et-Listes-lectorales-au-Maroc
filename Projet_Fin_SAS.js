const prompt = require('prompt-sync') ();
let p;
let c;
const candidats = [{
cin : "AB123456",
nom : "Boushaba",
prenom : "Soufiane",
partiPolitique : "Indépendant",
age: 40,
electeurs: []
}, {
cin: "CD987654",
nom: "Akhenoch",
prenom: "Aziz",
partiPolitique: "Independant",
age: 65,
electeurs: []
}];
do {
    console.log("-----------------MENU---------------");
    console.log("Tapez 1 pour ajouter un nouveau candidat ");
    console.log("Tapez 2 pour afficher ");
    console.log("Tapez 3 pour voter");
    console.log("Tapez 4 pour modifier");
    console.log("Tapez 5 pour éliminer un candidat");
    console.log("Tapez 6 pour rechercher sur un candidat");
    console.log("Tapez 7 pour afficher les statistiques")
    console.log("Tapez 0 pour quitter le programme")
    p = Number(prompt("choisir : "))
    switch(p) {
        case 1:
            break;
        case 2:
            console.clear()
            console.table(candidats)
            c = prompt("continue...")
            break;

    }
} while (p!==0)