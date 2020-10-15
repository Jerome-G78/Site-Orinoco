/* Fichier JavaScript */

// Variables globales
let CAM="";
let ID="";

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

        for (i =0; i < xhr.response.length; i++){   // Boucle for pour créer la liste des produits
            CAM = new createItem (xhr.response[i]._id,xhr.response[i].name,xhr.response[i].imageUrl,xhr.response[i].description,xhr.response[i].price);
            addElement(CAM._id,CAM.name,CAM.imageUrl,CAM.description,CAM.price);
        }
        
        let Item = document.getElementsByClassName("Item");
        console.log(Item);
        Item.addEventListener('click', event => {
            console.log("OK");
            event.preventDefault();
            Details(this);
        })
    }
};

// Fonction de création d'un produit

function createItem (ID,name,imageUrl,description,price){
    this._id = ID,
    this.name = name,
    this.imageUrl = imageUrl,
    this.description = description,
    this.price = price

//  alert(this._id +" \n "+ this.name +" \n "+ this.imageUrl +" \n "+ this.description +" \n "+ this.price); // DEBUG
}

// Ajout du produit au tableau 

function addElement (id,name,imageUrl,description,price){

    let tr = document.createElement("tr");
    tr.id = id;
    tr.setAttribute("class","Item");

    let td1 = document.createElement("td");
    
    let link = document.createElement("a");
    link.setAttribute("href","produits.html");
    link.setAttribute("class",id + " test");

    link.appendChild(document.createTextNode(id));
    td1.appendChild(link);
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.setAttribute("class","name");

    td2.appendChild(document.createTextNode(name));
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.setAttribute("class","imageUrl");

    let pict = document.createElement("img");
        pict.setAttribute("src",imageUrl);
        pict.setAttribute("width","256");
        pict.setAttribute("height","auto");
        pict.setAttribute("alt","Photo du produit");

    td3.appendChild(pict);
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.setAttribute("class","description");

    td4.appendChild(document.createTextNode(description));
    tr.appendChild(td4);

    let td5 = document.createElement("td");
    td5.setAttribute("class","price");

    td5.appendChild(document.createTextNode(price));
    tr.appendChild(td5);

    document.getElementById("ProductList").append(tr);
}

//Se rendre sur la page d'un produit

function Details (Item) {
   localStorage.setItem("ID", document.getElementsByClassName(Item.innerHTML));
   console.log(localStorage.getItem("ID"));
}