/* Fichier JavaScript */

// Variables
ID="";
products=[];
Lense = "";
Qty = 0;

// Requête serveur AJAX

let xhr = new XMLHttpRequest();                         // On crée l'objet XMLHttpRequest()
xhr.open("GET","http://localhost:3000/api/cameras");    // On initialise notre requête avec open()
xhr.responseType = "json";                              // On veut une réponse au format JSON
xhr.send();                                             // On envoie la requête

// Si la requête n'as pas pu aboutir ...
xhr.onerror = function(){
    alert("La requête à échoué");
};

xhr.onload = function(){
    // Si le status HTTP n'est pas 200
    if (xhr.status != 200){
        // On affiche le status et le message correspondant
        alert("Erreur " + xhr.status + " : " + xhr.statusText);
    }
    else{
        // Si le status HTTP est 200, on affiche la réponse
        console.log(xhr.response);              // Récupération des informations dans la console

        for (i =0; i < xhr.response.length; i++){   // Affichage des produits
            if (localStorage.getItem(xhr.response[i]._id+"-Cart-qty") !=null){
                // products = Array.push(xhr.response[i]._id);
                Lense = localStorage.getItem(xhr.response[i]._id+"-Cart-lense");
                Qty = localStorage.getItem(xhr.response[i]._id+"-Cart-qty");
                CAM = new CreateItem (xhr.response[i]._id,xhr.response[i].name,xhr.response[i].imageUrl,xhr.response[i].description,Lense,xhr.response[i].price);
                addElement(CAM._id,CAM.name,CAM.imageUrl,CAM.description,Lense,Qty,CAM.price);
                Total(CAM.price);
            }

        }
        
    }
};

// Fonction de création d'un produit

function CreateItem (ID,name,imageUrl,description,lense,price){
    this._id = ID,
    this.name = name,
    this.imageUrl = imageUrl,
    this.description = description,
    this.lense = lense,
    this.price = price

//  alert(this._id +" \n "+ this.name +" \n "+ this.imageUrl +" \n "+ this.description +" \n "+ this.lense1 + " \n " + this.lense2 +" \n "+ this.price); // DEBUG
}

// Ajout du produit au tableau 

function addElement (id,name,imageUrl,description,lense,qty,price){

    let tr = document.createElement("tr");
    tr.id = id;
    tr.setAttribute("class","Item");

    let td1 = document.createElement("td");
    td1.setAttribute("class","name");

    td1.appendChild(document.createTextNode(name));
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.setAttribute("class","imageUrl");

    let pict = document.createElement("img");
        pict.setAttribute("src",imageUrl);
        pict.setAttribute("width","256");
        pict.setAttribute("height","auto");
        pict.setAttribute("alt","Photo du produit");
    
    td2.appendChild(pict);
    tr.appendChild(td2);
    
    let td3 = document.createElement("td");
    td3.setAttribute("class","description");
    td3.appendChild(document.createTextNode(description));
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.setAttribute("class","lense");
    td4.appendChild(document.createTextNode(lense));

    tr.appendChild(td4);

    let td5 = document.createElement("td");
    td5.setAttribute("class","Qty");
    
    td5.appendChild(document.createTextNode(qty));
    
    tr.appendChild(td5);

    let td6 = document.createElement("td");
    td6.setAttribute("class","price");

    td6.appendChild(document.createTextNode(price));
    tr.appendChild(td6);

    document.getElementById("ProductList").append(tr);
}

// Mise à jour du prix
function Total (price){
    let Total = document.getElementById("Total").innerHTML;
    Total = price * Qty + Number(document.getElementById("Total").innerHTML);
    document.getElementById("Total").innerHTML = Total;
}

// Vider mon panier
let clear = document.getElementById("clean");
clear.addEventListener("click", function(){
    localStorage.clear();
    document.location.href="index.html";
});

// Verification des informations entrées par l'utilisateur, avant validation

// Récupération des éléments
let nom="", prenom="", adresse="", ville="", email="", validation="";
let NF="", PF="", AF="", VF="", EF="";

nom = document.getElementById("nom");
prenom = document.getElementById("prenom");
adresse = document.getElementById("adress");
ville = document.getElementById("city");
email = document.getElementById("email");
validation = document.getElementById("validation");

NF = document.getElementById("ErrorNom");
PF = document.getElementById("ErrorPrenom");
AF = document.getElementById("ErrorAdress");
VF = document.getElementById("ErrorCity");
EF = document.getElementById("ErrorMail");

// Regex de verification nom, prenom, ville, email

npv = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;
mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
adr = /([0-9a-zA-Z,\.]*) ?([0-9]) ?([a-zA-Z]*)/;


// Evenements
nom.addEventListener("input",function(){
    NF.textContent = "";
});

prenom.addEventListener("input",function(){
    PF.textContent = "";
});

adresse.addEventListener("input",function(){
    AF.textContent = "";
});

ville.addEventListener("input",function(){
    VF.textContent = "";
});

email.addEventListener("input",function(){
    EF.textContent = "";
});

// Fonction

validation.addEventListener('click',f_valid);

function f_valid(e){                                // Création de la fonction associé
    
    

    // Verification des données

    if (nom.validity.valueMissing) {
        e.preventDefault();                         // blocage de l'envoie du formulaire
        NF.textContent = "Nom manquant";            // Affichage d'un message d'erreur
        NF.style.color = "red";
    }
    else if(npv.test(nom.value) == false) {
        e.preventDefault();
        NF.textContent = "Format incorrect";
        NF.style.color = "orange";
    }
    else{                                           // préparation des données
        NF.textContent="";
        let myName = nom.value;
        localStorage.setItem("myName",myName);
        console.log(nom.value);
    }

    if (prenom.validity.valueMissing) {
        e.preventDefault();                         
        PF.textContent = "Prénom manquant";
        PF.style.color = "red";
    }
    else if(npv.test(prenom.value) == false) {
        e.preventDefault();
        PF.textContent = "Format incorrect";
        PF.style.color = "orange";
    }
    else{
        PF.textContent="";
        let myFistName = prenom.value;
        localStorage.setItem("myFisrtName",myFistName);
        console.log(prenom.value);
    }

    if (adresse.validity.valueMissing) {
        e.preventDefault();                         
        AF.textContent = "Adresse manquante";
        AF.style.color = "red";
    }
    else if(adr.test(adresse.value) == false) {
        e.preventDefault();
        AF.textContent = "Format incorrect";
        AF.style.color = "orange";
    }
    else{
        AF.textContent="";
        let myAdress = adresse.value;
        localStorage.setItem("myAdress",myAdress);
        console.log(adresse.value);
        
    }

    if (ville.validity.valueMissing) {
        e.preventDefault();                         
        VF.textContent = "Ville manquante";
        VF.style.color = "red";
    }
    else if(npv.test(ville.value) == false) {
        e.preventDefault();
        VF.textContent = "Format incorrect";
        VF.style.color = "orange";
    }
    else{
        VF.textContent="";
        let myCity = ville.value;
        localStorage.setItem("myCity",myCity);
        console.log(ville.value);
    }

    if (email.validity.valueMissing) {
        e.preventDefault();                         
        EF.textContent = "E-Mail manquant";
        EF.style.color = "red";
    }
    else if(mail.test(email.value) == false) {
        e.preventDefault();
        EF.textContent = "Format incorrect";
        EF.style.color = "orange";
    }
    else{
        EF.textContent="";
        let myEmail = email.value;
        localStorage.setItem("myEmail",myEmail);
        console.log(email.value);
    }

    // Envoie du formulaire POST
    document.forms["commander"].addEventListener("submit",sendData(e));

}

function sendData (e){
    let contact = {
        "prénom" : prenom.value,
        "nom" : nom.value,
        "adresse" : adresse.value,
        "ville" : ville.value,
        "adresse électronique" : email.value
    }

    let data = JSON.stringify(contact); // transformer le JSON en STRING

    // verification des données
    console.log(data);
    console.log(products);

    // Requête serveur AJAX

    let xhr = new XMLHttpRequest();                                                     // On crée l'objet XMLHttpRequest()
    xhr.open("POST","http://localhost:3000/api/cameras/order");                         // On initialise notre requête avec open()
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");           // Option requise pour la methode POST
    xhr.send("contact="+ data +"&products="+ products);                                 // On envoie la requête

    e.preventDefault();
}