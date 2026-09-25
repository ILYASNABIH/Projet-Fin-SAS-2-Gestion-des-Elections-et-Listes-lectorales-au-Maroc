function keys(object){
    const cles = []
    for (let cle in object) {
        cles.push(cle)
    }
    return cles
}
function pourchacun(table, callback) {
    for (let i = 0; i < table.length; i++) {
        callback(table[i], i, table);
    }
}
function join(table, separateur = ",") {
    let result = "";
    for (let i = 0; i < table.length; i++ ) {
        let valeur = (table[i] !== null && table[i] !== undefined) ? table[i] : ""
        result += valeur;
        if (i < table.length - 1 ) {
            result += separateur;
        }
    }
    return result;
}
function map(table, callback) {
    const result = [];
    for (let i = 0; i < table.length; i++) {
        result.push(callback(table[i], i, table));
    }
    return result;
}
function aligner(texte, largeur) {
    let str = String(texte);
    while (str.length < largeur){
        str+= " ";
    }
    return str;
}
function tableau(infos) {
    if (!Array.isArray(infos) || infos.length === 0)
        {return console.log(infos)};
        const colonnes = keys(infos[0]);
        const largeurs = {};
        pourchacun(colonnes, col => {
            let max = col.length;
            pourchacun(infos, item =>{
                let val = item[col];
                if (Array.isArray(val)) val = join(val, ", ");
                let longueur = String(val ?? "").length;
                if (longueur > max) max = longueur;
            });
            largeurs[col] = max;
        });
        const entete = map(colonnes, col => aligner(col, largeurs[col]));
        const entetealignes = "N.C | " + join(entete, " | ");
        console.log(entetealignes);
        console.log("-".repeat(entetealignes.length));

        pourchacun(infos, (item, index) => {
            const valeurs = map(colonnes, col => {

                let val = item[col];
                if (Array.isArray(val)) val = join (val, ", ");
                return aligner(val ?? "", largeurs[col]);
            });
        console.log(`[${index}] | ` + join(valeurs, " | "));
        console.log("-".repeat(entetealignes.length));
    });
}

const prompt = require('prompt-sync') ();
let p;
let c;
const candidats = [{
CIN : "AB123456",
Nom : "Boushaba",
Prénom : "Soufiane",
PartiPolitique : "Indépendant",
Age: 40,
Electeurs: ["KL123456", "YI918273", "G784593", "M974310"]
}, {
CIN: "CD987654",
Nom: "Akhenoch",
Prénom: "Aziz",
PartiPolitique: "Independant",
Age: 65,
Electeurs: ["N987654", "J123456" , "H123678"]
}];
do {
    console.log("-------------------MENU------------------");
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
            const cin = prompt("Tapez le CIN de candidat : ");
            const nom = prompt("Tapez le nom de candidat : ");
            const prenom = prompt("Tapez le prénom de candidat : ");
            const partipolitique = prompt("Tapez la parti politique de candidat : ");
            const age = Number(prompt("Tapez l'age de candidat : "));
            const electeurs = prompt("Tapez les electeurs de candidat : ");
            candidats.push({CIN : cin, Nom : nom, Prénom: prenom, PartiPolitique: partipolitique, Age: age, Electeurs : electeurs.split(" ") })
            console.log("le candidat a ete ajoute avec succes")
            c = prompt("continue...")
            break;
        case 2:
            console.clear()
            tableau (candidats);
            c = prompt("continue...")
            break;

    }
} while (p!==0)
