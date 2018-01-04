/*** DECLARATION **************************************************************/
var premierPaquet = ["carte_01", "carte_02", "carte_03", "carte_04", "carte_05", "carte_06", "carte_07", "carte_08", "carte_09", "carte_10", "carte_11", "carte_12", "carte_13", "carte_14", "carte_15", "carte_16", "carte_17", "carte_18", "carte_19", "carte_20", "carte_21", "carte_22", "carte_23", "carte_24"];
var secondPaquet = ["carte_25", "carte_26", "carte_27", "carte_28", "carte_29", "carte_30", "carte_31", "carte_32", "carte_33", "carte_34", "carte_35", "carte_36", "carte_37", "carte_38", "carte_39","carte_40", "carte_41", "carte_42", "carte_43", "carte_44", "carte_45", "carte_46", "carte_47", "carte_48",];
var points = 0;
var tours = 0;
var listeCarteJouee = [];
var listeNumeroCarte = new Array(2);
var listeIndiceCarte = new Array(2);
var listeDejasJouee = [];
var index = "";
var passage = 0;
var listeImages = [];
var carte1;
var carte2;

/*** AFFECTATION **************************************************************/
if ("toutesLesDates", "tousLesJoueurs", "tousLesScores" , "tousLesTours" in localStorage) {
    var tableauDesDates = localStorage.getItem("toutesLesDates");
    var tableauDesJoueurs = localStorage.getItem("tousLesJoueurs");
    var tableauDesScores = localStorage.getItem("tousLesScores");
    var tableauDesTours = localStorage.getItem("tousLesTours");
}else {
    var tableauDesDates = "";
    var tableauDesJoueurs = "";
    var tableauDesScores = "";
    var tableauDesTours = "";
}




/*** FONCTIONS ****************************************************************/
function remiseAZero() {
    points = 0;
    tours = 0;
    listeCarteJouee = [];
    listeNumeroCarte = new Array(2);
    listeIndiceCarte = new Array(2);
    listeDejasJouee = [];
    index = "";
    passage = 0;
    listeImages = [];
    var carte1;
    var carte2;
    document.getElementById("nbPoints").innerHTML = points;
    document.getElementById("nbTours").innerHTML = tours;
}
function retourner(id) {
    document.getElementById(id).style.top = "0%";
}
function reRetourner(id) {
    document.getElementById(id).style.top = "-102%";
}
function afficherInfos(id) {
    pseudo = document.getElementById("nouvellePartie");
    regles = document.getElementById("listeRegles");
    parties = document.getElementById("tableDesScores");
    onglet1 = document.getElementById("onglet1");
    onglet2 = document.getElementById("onglet2");
    onglet3 = document.getElementById("onglet3");
    switch(id) {
        case "nouvellePartie":
            pseudo.style.display = "block";
            parties.style.display = "none";
            regles.style.display = "none";
            onglet1.style.backgroundColor = "#AA0000";
            onglet2.style.backgroundColor = "#FF0000";
            onglet3.style.backgroundColor = "#FF0000";
        break;
        
        case "listeRegles":
            regles.style.display = "block";
            parties.style.display = "none";
            pseudo.style.display = "none";
            onglet1.style.backgroundColor = "#FF0000";
            onglet2.style.backgroundColor = "#AA0000";
            onglet3.style.backgroundColor = "#FF0000";
        break;
        
        case "tableDesScores":
            parties.style.display = "table";
            regles.style.display = "none";
            pseudo.style.display = "none";
            onglet1.style.backgroundColor = "#FF0000";
            onglet2.style.backgroundColor = "#FF0000";
            onglet3.style.backgroundColor = "#AA0000";
        break;
    }
}
function closeMasque(id) {
    document.getElementById(id).style.display = "none";
}
function openMasque() {
    document.getElementById("masque").style.display = "block";
}
function attribuerPseudo() {
    localStorage.setItem("pseudo", document.getElementById("identifiant").value);
    document.getElementById("pseudo").innerHTML = localStorage.getItem("pseudo");
    document.getElementById("identifiant").value = "";
    closeMasque("masque");
    chargerPseudo();
}
function chargerPseudo(){
    pseudo = localStorage.getItem("pseudo");
    document.getElementById("pseudo").innerHTML = pseudo;
    document.getElementById("messageFin_pseudo").innerHTML = pseudo;
}
function dejasPrise(id) {
    document.getElementById(id).parentElement.style.backgroundColor = "transparent";
    document.getElementById(id).parentElement.style.cursor = "auto";
    //document.getElementById(id).parentElement.style.borderColor = "transparent"//Si tu ne veut pas de bordure, décommente le.
}
function plasser(selecteur, indice) {
    switch(selecteur) {
        case 1:
            listeDejasJouee.push(listeCarteJouee[indice]);
            listeImages.splice(listeImages.indexOf(listeCarteJouee[indice]), 1);
            reRetourner(listeCarteJouee[indice]);
        break;
        
        case 2:
            for (var k = 0; k < 2; k++) {
                listeDejasJouee.push(listeCarteJouee[k]);
                listeImages.splice(listeImages.indexOf(listeCarteJouee[k]), 1);
                reRetourner(listeCarteJouee[k]);
            }
        break;
    }
}
function dateActuelle() {
    var date = new Date();
    var annee = date.getFullYear();
    var mois = date.getMonth() + 1;
    var jour = date.getDate();
    var heure = date.getHours();
    var minutes = date.getMinutes();
    return jour+"/"+mois+"/"+annee+" à "+heure+":"+minutes;
}
function enregistrerScores(pseudo, points, date, tours) {
    tableauDesDates = date + "," + tableauDesDates ;
    tableauDesJoueurs = pseudo + "," + tableauDesJoueurs;
    tableauDesScores = points + "," + tableauDesScores;
    tableauDesTours = tours + "," + tableauDesTours;
    localStorage.setItem("toutesLesDates", tableauDesDates);
    localStorage.setItem("tousLesJoueurs", tableauDesJoueurs);
    localStorage.setItem("tousLesScores", tableauDesScores);
    localStorage.setItem("tousLesTours", tableauDesTours);
}
function chargeTableau() {
    var tbody = document.getElementById("corpsTableau");
    tbody.innerHTML = "";
    tDate = tableauDesDates.split(",");
    tJoueurs = tableauDesJoueurs.split(",");
    tScores = tableauDesScores.split(",");
    tTours = tableauDesTours.split(",");
    taille = tDate.length;
    for (var i = 0; i < taille - 1; i++) {
        var ligne = document.createElement("tr");
        var tdId = document.createElement("td");
        var tdDate = document.createElement("td");
        var tdJoueurs = document.createElement("td");
        var tdScores = document.createElement("td");
        var tdTours = document.createElement("td");
        var IdTexte = document.createTextNode(i+1);
        var DateTexte = document.createTextNode(tDate[i]);
        var JoueursTexte = document.createTextNode(tJoueurs[i]);
        var ScoresTexte = document.createTextNode(tScores[i]);
        var ToursTexte = document.createTextNode(tTours[i]);
        tdId.appendChild(IdTexte);
        tdDate.appendChild(DateTexte);
        tdJoueurs.appendChild(JoueursTexte);
        tdScores.appendChild(ScoresTexte);
        tdTours.appendChild(ToursTexte);
        ligne.appendChild(tdId);
        ligne.appendChild(tdJoueurs);
        ligne.appendChild(tdScores);
        ligne.appendChild(tdTours);
        ligne.appendChild(tdDate);
        tbody.appendChild(ligne);
    }
}
function indexAleatoire(max) {
    tableauIndex = new Array();
    while (tableauIndex.length < max) {
        index = Math.floor(Math.random() * max);
        if (!tableauIndex.includes(index)) {
            tableauIndex.push(index)
        }
    }
    return tableauIndex
}
function melangeTableau() {
    var tab1 = premierPaquet;
    var tab2 = secondPaquet;
    var tab = new Array();
    var resultat = new Array();
    var nbCouples = 14;
    taille = premierPaquet.length;
    tabIndex1 = indexAleatoire(taille);
    for (var i=0; i<nbCouples; i++) {
        tab.push(tab1[tabIndex1[i]]);
        tab.push(tab2[tabIndex1[i]]);
    }
    tabIndex2 = indexAleatoire(tab.length);
    for (var k=0; k<tab.length; k++) {
        resultat.push(tab[tabIndex2[k]]);
    }
    return resultat
}
function chargeImagesCartes() {
    remiseAZero();
    var ul = document.getElementById("plateauDeCarte");
    ul.innerHTML = "";
    listeImages = melangeTableau();
    taille = listeImages.length;
    for (var i = 0; i < taille; i++) {
        var li = document.createElement("li");
        li.setAttribute("onclick", "resultat(" + "'" + listeImages[i] + "'" + ")")
        var img = document.createElement("img");
        img.id = listeImages[i];
        img.src = "images/" + listeImages[i] + ".jpg";
        li.appendChild(img);
        ul.appendChild(li);
    }
}
function finPartie() {
    document.getElementById("messageFin_nbPoints").innerHTML = points;
    document.getElementById("messageFin_nbTours").innerHTML = tours;
    document.getElementById("messageFin").style.top = "15%";
    var pseudo = document.getElementById("pseudo").innerHTML;
    var date = dateActuelle();
    enregistrerScores(pseudo, points, date, tours);
}
function attributionDesPoints() {
    if (listeCarteJouee.length == 2) {
        for (var i = 0; i < 2; i++ ){
            listeNumeroCarte[i] = parseInt(listeCarteJouee[i][6]+listeCarteJouee[i][7]);
            if (listeNumeroCarte[i] < 25){
                listeIndiceCarte[i] = premierPaquet.indexOf(listeCarteJouee[i]);
            }else {
                listeIndiceCarte[i] = secondPaquet.indexOf(listeCarteJouee[i]);
            }
        }
        if ((listeIndiceCarte[0] == listeIndiceCarte[1]) && ((listeIndiceCarte[0] != 14)) && ((listeIndiceCarte[0] != 2)))  {
            points = points + 10;
            dejasPrise(listeCarteJouee[0]);
            dejasPrise(listeCarteJouee[1]);
            plasser(2, -1);
        }else {
            if ((listeIndiceCarte[0] == listeIndiceCarte[1]) && (listeIndiceCarte[0] == 14)) {
                points = 0;
                dejasPrise(listeCarteJouee[0]);
                dejasPrise(listeCarteJouee[1]);
                plasser(2, -1);
            }else {
                if ((listeIndiceCarte[0] == listeIndiceCarte[1]) && (listeIndiceCarte[0] == 2)) {
                    dejasPrise(listeCarteJouee[0]);
                    dejasPrise(listeCarteJouee[1]);
                    plasser(2, -1);
                }else {
                    if ((listeIndiceCarte[0] == 14) && (listeIndiceCarte[1] == 2) || (listeIndiceCarte[0] == 2) && (listeIndiceCarte[1] == 14)) {
                        points = points - 2;
                        dejasPrise(listeCarteJouee[0]);
                        dejasPrise(listeCarteJouee[1]);
                        plasser(2, -1);
                    }else {
                        if (listeIndiceCarte[0] == 14) {
                            points = points - 5;
                            dejasPrise(listeCarteJouee[0]);
                            plasser(1, 0);
                            reRetourner(listeCarteJouee[1]);
                        }else {
                            if (listeIndiceCarte[1] == 14) {
                                points = points - 5;
                                dejasPrise(listeCarteJouee[1]);
                                plasser(1, 1);
                                reRetourner(listeCarteJouee[0]);
                            }else {
                                if (listeIndiceCarte[0] == 2) {
                                    dejasPrise(listeCarteJouee[0]);
                                    plasser(1, 0);
                                    reRetourner(listeCarteJouee[1]);
                                }else {
                                    if (listeIndiceCarte[1] == 2) {
                                        dejasPrise(listeCarteJouee[1]);
                                        plasser(1, 1);
                                        reRetourner(listeCarteJouee[0]);
                                    }else {
                                        points = points -2;
                                        reRetourner(listeCarteJouee[0]);
                                        reRetourner(listeCarteJouee[1]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        tours = tours + 1;
        document.getElementById("nbTours").innerHTML = tours;
        document.getElementById("nbPoints").innerHTML = points;
        listeCarteJouee = [];
    }
    if ((listeDejasJouee.length == 28) && (passage == 0)) {
        passage = 1;
        finPartie();
        chargeTableau();
    }
}
function resultat(id) {
    if (!listeDejasJouee.includes(id) && (!listeCarteJouee.includes(id))) {
        listeCarteJouee.push(id);
        retourner(id);
    }
    setTimeout(attributionDesPoints, 3000);
    if ((listeDejasJouee.length == 26) && (!listeDejasJouee.includes("carte_15")) && (!listeDejasJouee.includes("carte_39"))) {
        retourner("carte_15");
        retourner("carte_39");
        points = points + 100;
        document.getElementById("nbPoints").innerHTML = points;
        setTimeout('reRetourner("carte_15")', 2000);
        setTimeout('reRetourner("carte_39")', 2000);
        setTimeout('dejasPrise("carte_15")', 2000);
        setTimeout('dejasPrise("carte_39")', 2000);
        listeDejasJouee.push("carte_15");
        listeDejasJouee.push("carte_39");
    }
    if (listeDejasJouee.length == 27) {
        for (var i=0; i<listeImages.length; i++) {
            if (!listeDejasJouee.includes(listeImages[i])){
                retourner(listeImages[i]);
                listeDejasJouee.push(listeImages[i]);
            }
        }
    }
}
function masqueAfficheEmoji(){
    etat = document.getElementById("tousMesEmoji");
    if(etat.style.display == "none") {
        etat.style.display = "block";
    }else {
        etat.style.display = "none";
    }
}
function ajoutEmojie(caractere) {
    document.getElementById("identifiant").value = document.getElementById("identifiant").value + caractere;
}



function aide(){
    var taille = listeImages.length;
    carte1 = listeImages[Math.floor(Math.random()*taille)];
    carte2;
    if (premierPaquet.includes(carte1)) {
        carte2 = secondPaquet[premierPaquet.indexOf(carte1)];
    }else {
        carte2 = premierPaquet[secondPaquet.indexOf(carte1)];
    }
    document.getElementById(carte1).parentElement.style.borderColor = "#00FF00";
    document.getElementById(carte2).parentElement.style.borderColor = "#00FF00";
    console.log(document.getElementById(carte1).parentElement);
    console.log(document.getElementById(carte2).parentElement);
    points = points - 8;
    document.getElementById("nbPoints").innerHTML = points;
    setTimeout('document.getElementById(carte1).parentElement.style.borderColor = "#404040";document.getElementById(carte2).parentElement.style.borderColor = "#404040";', 3000);
}