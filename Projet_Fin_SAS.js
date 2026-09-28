const prompt = require('prompt-sync') ();
let p;
let c;
let a;
let n;
let f;
const candidats = [{
CIN : "AB123456",
Nom : "Boushaba",
Prénom : "Soufiane",
PartiPolitique : "Independant",
Age: 40,
Electeurs: ["KL123456", "YI918273", "G784593"]}, {
CIN: "CD987654",
Nom: "Akhenoch",
Prénom: "Aziz",
PartiPolitique: "Independant",
Age: 65,
Electeurs: ["N987654", "J123456" , "H123678", "M974310"]
}];
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
    if (!Array.isArray(infos) || infos.length === 0){
        return console.log(infos);
    }
    const colonnes = keys(infos[0]);
    const largeurs = {};

    pourchacun(colonnes, col => {
        let max = col.length;
        pourchacun(infos, item =>{
            let val = item[col];
            if (Array.isArray(val)) {
                val = val.length;
            }
            let texteval = "";
            if (val !== null && val !== undefined) {
                texteval = String(val);
            }

                let longueur = texteval.length;
                if (longueur > max) {
                    max = longueur;
                }
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
                if (Array.isArray(val)) {
                    val = val.length;
                }
                let valeurfinale = "";
                if (val !== null && val !== undefined){
                    valeurfinale = val;
                }
                return aligner(valeurfinale, largeurs[col]);
            });
        console.log(`[${index}] | ` + join(valeurs, " | "));
        console.log("-".repeat(entetealignes.length));
    });
}
function ajouter(cin, nom, prenom, partipolitique, age,) {
            console.clear();
            cin = prompt("Tapez le CIN de candidat : ");
            nom = prompt("Tapez le nom de candidat : ");
            prenom = prompt("Tapez le prénom de candidat : ");
            partipolitique = prompt("Tapez la parti politique de candidat : ");
            age = Number(prompt("Tapez l'age de candidat : "));
            candidats.push({CIN : cin, Nom : nom, Prénom: prenom, PartiPolitique: partipolitique, Age: age, Electeurs : [] })
            console.log("le candidat a ete ajoute avec succes");
            c = prompt("continue...");
            console.clear();
            a = prompt("Voulez-vous ajouter autre condidat? ")
            console.log("Tapez sur 1 pour ajouter d'autre candidat.")
            console.log("Tapez sur n'importe quelle pour revenir au menu.")
            
            if (a === "1"){
                n = Number(prompt("Tapez le nombre des candidats a ajouter : "))
                for (let i = 0 ; i <= n ; i++ ){
                    cin = prompt("Tapez le CIN de candidat : ");
                    nom = prompt("Tapez le nom de candidat : ");
                    prenom = prompt("Tapez le prénom de candidat : ");
                    partipolitique = prompt("Tapez la parti politique de candidat : ");
                    age = Number(prompt("Tapez l'age de candidat : "));
                    candidats.push({CIN : cin, Nom : nom, Prénom: prenom, PartiPolitique: partipolitique, Age: age, Electeurs: []});
                    console.log("le candidat a ete ajoute avec succes");
                }
            }
}
function Tri (tableaudobjet){ 
    for (let i = 0; i < tableaudobjet.length - 1; i++){ 
    for (let j = 0; j < tableaudobjet.length - 1 - i; j++) {
        let votes1;
        if (tableaudobjet[j].Electeurs !== undefined && tableaudobjet[j].Electeurs !== null){
            votes1 = tableaudobjet[j].Electeurs.length;
        } else {
            votes1 = 0;
        }

        let votes2;
        if (tableaudobjet[j + 1].Electeurs !== undefined && tableaudobjet[j + 1].Electeurs !== null) {
            votes2 = tableaudobjet[j + 1].Electeurs.length;
        } else {
            votes2 = 0;
        }
            if (votes1 < votes2) {
            let temp = tableaudobjet[j];
            tableaudobjet[j] = tableaudobjet[j + 1];
            tableaudobjet[j + 1] = temp;
            }
        }
    }
}
function filtre(table) {
    console.clear();
    const recherche = prompt("Entrez le parti politique recherché : ");
    const resultat = [];
    for (let i = 0; i < table.length; i++) {
        if (table[i].PartiPolitique === recherche) {
            resultat.push(table[i]);
        }
    }
    if (resultat.length === 0) {
        console.log("Aucun candidat trouve pour ce parti politique.");
    } else {console.log(`\n--- candidats du parti : ${recherche} ---`);
    tableau(resultat);
    }
}
function voter(table) {
    console.clear();
    const cinvoteur = prompt("Tapez votre CIN pour voter : ");
    let dejavoter = false;
    for (let i = 0; i < table.length; i++){
        if(table[i].Electeurs) {
            for (let j = 0; j < table[i].Electeurs.length; j++) {
                if (table[i].Electeurs[j] === cinvoteur) {
                    dejavoter = true;
                    break;
                }
            }
        }
        if (dejavoter) break;
    }
    if (dejavoter) {
        console.log("Vous avez déjà voté et vous n'avez pas le droit de modifier votre vote ni de voter à nouveau.");
        return;
    }
    console.log("\n--- liste des candidats ---");
    tableau(table);
    const cincandidat = prompt("Tapez le CIN du candidat auquel vous voulez donner votre vote : ");
    let trouve = false;
    for (let i = 0; i < table.length; i++) {
        if (table[i].CIN === cincandidat) {
            trouve = true;
            if(!table[i].Electeurs){
            table[i].Electeurs = [];
            }
        table[i].Electeurs.push(cinvoteur);
        console.log("Vote est enregistre avec succes");
        break;
        }
    }
    if (!trouve) {
        console.log("aucun candidat trouve avec ce CIN.");
    }
}
function modifier (table) {
    console.clear();
    const cin = prompt("Tapez le CIN du candidat a modifier : ");
    let found = false;
    for (let i = 0; i < table.length; i++ ){
        if (table[i].CIN === cin) {
            found = true;
            console.log( "Candidat trouve : " ,table[i].Prénom ," ", table[i].Nom);
            console.log("Que souhaitez-vous modifier ? ")
            console.log("Tapez 1 pour changer le Nom");
            console.log("Tapez 2 pour changer le Prénom");
            console.log("Tapez 3 pour changer la Parti Politique");
            console.log("Tapez 4 pour changer l'Age");
            let choix = Number(prompt("Tapez votre choix : "));
            switch (choix) {
                case 1:
                    table[i].Nom = prompt("Tapez le nouveau Nom : ");
                    console.log("\n Les information du candidat sont ete ajoute avec succes");
                    break;
                case 2:
                    table[i].Prénom = prompt("Tapez le nouveau Prenom : ");
                    console.log("\n Les information du candidat sont ete ajoute avec succes");
                    break;
                case 3:
                    table[i].PartiPolitique = prompt("Tapez la nouvelle Partie Politique : ");
                    console.log("\n Les information du candidat sont ete ajoute avec succes");
                    break;
                case 4:
                    table[i].Age = prompt("Tapez la nouvelle Age : ");
                    console.log("\n Les information du candidat sont ete ajoute avec succes");
                     break;

                default:
                    console.log("choix invalide.");
            }
        }
    }
    if (!found) {
        console.log("Aucun candidat trouve avec ce CIN.");
    }
}
function eliminer(table) {
    console.clear();
    const cin = prompt("Tapez le CIN de candidat a eliminer : ");
    let found = false;
    
    for (let i = 0; i <table.length - 1; i++) {
        if (table[i].CIN === cin) {
            let temp = table[i];
            table [i] = table[i + 1];
            table[i + 1] = temp;
        }
        if (table[table.length - 1].CIN === cin) {
            table.length = table.length - 1;
            found = true
            console.log("Candidat supprime avec succes.");
            
        }
        
    }
    if (found === false) {
        console.log("Aucun candidat trouve avec ce CIN")
    }
}
function rechercher (table) {
    console.clear();
    const nom = prompt("Tapez le nom du candidat a rechercher : ");
    let found = false;
    for (let i = 0; i < table.length; i++) {
        if (table[i].Nom === nom) {
            console.clear();
            found = true;
            console.log("---candidat trouve---")
            console.log("CIN : " + table[i].CIN);
            console.log("Nom : " + table[i].Nom);
            console.log("Prénom : " + table[i].Prénom);
            console.log("Parti Politique : " + table[i].PartiPolitique);
            console.log("Âge : " + table[i].Age);
            console.log("Nombre de votes : " + table[i].Electeurs.length);
            break;
        }
    }
    if (found === false) {
        console.log("Aucun candidat trouve avec ce Nom.");
    }
}
do {
    console.log("-------------------MENU------------------");
    console.log("Tapez 1 pour ajouter un nouveau candidat ");
    console.log("Tapez 2 pour afficher ");
    console.log("Tapez 3 pour voter");
    console.log("Tapez 4 pour modifier");
    console.log("Tapez 5 pour éliminer un candidat");
    console.log("Tapez 6 pour rechercher sur un candidat");
    console.log("Tapez 7 pour afficher les statistiques")
    console.log("Tapez sur 0 ou entre pour quitter le programme")
    p = Number(prompt("choisir : "))
    switch(p) {
        case 1:
            ajouter (candidats)
            c = prompt("continue...")
            break;
        case 2:
            console.clear()
            Tri (candidats)
            tableau (candidats);
            console.log("Tapez sur n'importe quel bouton pour revenir au menu : ")
            console.log("Tapez 1 pour filtrer par PartiPolitique : ")
            c =  Number(prompt("continue... "));
            if(c == 1) {
                filtre(candidats)
                f = prompt("continue ...")
            };
            break;
        case 3:
            voter(candidats);
            c = prompt("continue... ");
            break;
        case 4:
            modifier(candidats)
            c = prompt("continue... "); 
            break;
        case 5:
            eliminer(candidats);
            c = prompt("continue... ");
            break;
        case 6:
            rechercher(candidats);
            c = prompt("continue... ");
            break;
    }
} while (p!==0);