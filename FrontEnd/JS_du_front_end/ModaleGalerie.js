let user = JSON.parse(sessionStorage.getItem('user'));

const aside = document.querySelector("#modale");
const divModale = document.querySelector(".modale-wrapper1");
const divModale2 = document.querySelector(".modale-wrapper2");
// --------------------si click en dehors modale--------------------
document.addEventListener("mouseup",function(e){
    e.preventDefault();
    if (!divModale.contains(e.target) && getComputedStyle(divModale).display=="flex"){
        aside.style.display="none"
        divModale.style.display="none"
    }

    // if (!divModale2.contains(e.target) && getComputedStyle(divModale2).display=="flex"){
    //     aside.style.display="none"
    //     divModale2.style.display="none"
    // }
})
// ----------------------Modale Galerie------------------------  
    aside.appendChild(divModale);

    const espaceCroix = document.createElement("div");
    espaceCroix.className="tete-pop-up";
    
    const tricheFlex = document.createElement("span");
    
    const btnExit = document.createElement("button");
    btnExit.className="exit";
    const iconeCroix = document.createElement("i");
    iconeCroix.className="fa-solid fa-x";
    
    btnExit.appendChild(iconeCroix);
    
    espaceCroix.appendChild(tricheFlex);
    espaceCroix.appendChild(btnExit);
    
    const titre = document.createElement("h1");
    titre.innerText="Galerie Photo";
    
    const galleryModale = document.createElement("div");
    galleryModale.className="gallery-modal"
    
       
    const AjoutPhoto = document.createElement("button");
    AjoutPhoto.className="btn-envoie";
    AjoutPhoto.innerText="Ajouter une photo";
    
    const btnSuppr = document.createElement("button");
    btnSuppr.id="supp-galerie";
    btnSuppr.innerText="Supprimer la galerie"
    
    divModale.appendChild(espaceCroix);
    divModale.appendChild(titre);
    divModale.appendChild(galleryModale);
    divModale.appendChild(AjoutPhoto);
    divModale.appendChild(btnSuppr); 
// ---------------------button exit-----------------------
    btnExit.addEventListener("click",function(e){
		e.preventDefault();
        aside.style.display="none"
        divModale2.style.display="none"
		});
//-----button "Ajout Photo"vers la modale Ajout Photo-----
    AjoutPhoto.addEventListener("click",function(e){
        e.preventDefault();
        divModale.style.display="none";
        divModale2.style.display="flex";
    })
