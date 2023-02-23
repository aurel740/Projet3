const answer = await fetch("http://localhost:5678/api/works");
const works = await answer.json();
const sectionGallery = document.querySelector(".gallery");
const body = document.querySelector("body");
const loginLien = document.querySelector(".log");

// -----------------création generateur galerie principale------------------------
function generateImgGallery(works) {
	for (let i = 0; i < works.length; i++) {
		const photoGallery = works[i];
		const figureElement = document.createElement("figure");

		figureElement.dataset.id = works[i].id;

		const imgGallery = document.createElement("img");
		imgGallery.crossOrigin = "anonymous";
		imgGallery.src = photoGallery.imageUrl;
		imgGallery.alt = photoGallery.title;
		

		const figCaptureImg = document.createElement('figcaption');
		figCaptureImg.textContent = photoGallery.title;
		
		sectionGallery.appendChild(figureElement);
		figureElement.appendChild(imgGallery);
		figureElement.appendChild(figCaptureImg);
	}
};
	generateImgGallery(works)

// -------------------------mode édition---------------------------
let user = JSON.parse(sessionStorage.getItem('user'));
console.log(user);
const btnModifier1 = document.querySelector(".btn1");
const btnModifier2 = document.querySelector(".btn2");
const btnModifier3 = document.querySelector(".btn3");
const divEdition = document.querySelector(".mode-edition");
const aside = document.querySelector("#modale");
const divModale = document.querySelector(".modale-wrapper1");

if (user){
	btnModifier1.style.display="flex";
	btnModifier2.style.display="flex";
	btnModifier3.style.display="flex";
	divEdition.style.display="flex";
	generateImgGallery2(works);
	body.style.marginTop="80px";
	loginLien.innerText="";
	loginLien.innerText="Logout";
}

document.querySelectorAll(".modifier").forEach( button =>
	button.addEventListener("click",function(e){
	    e.preventDefault();
divModale.style.display="flex";
aside.style.display="flex";	
	}));

// ----------------------création des boutons filtres----------------------------
const boutonTous =document.createElement("button");
boutonTous.textContent = "Tous";
const boutonObjets =document.createElement("button");
boutonObjets.textContent = "Objets";
const boutonAppartements =document.createElement("button");
boutonAppartements.textContent = "Appartements";
const boutonHotel =document.createElement("button");
boutonHotel.textContent = "Hôtel & restaurants";

const divBtn = document.querySelector(".btn-filtres");

divBtn.appendChild(boutonTous);
divBtn.appendChild(boutonObjets);
divBtn.appendChild(boutonAppartements);
divBtn.appendChild(boutonHotel);
// ------------configuration des boutons filtres-------------
boutonTous.addEventListener("click",function(){
	sectionGallery.innerHTML = "";
	generateImgGallery(works);
});
	
boutonObjets.addEventListener("click",function(){
	const nameObjet = works.filter(function(work){
		return work.category.name == "Objets";
	});
	sectionGallery.innerHTML = "";
	generateImgGallery(nameObjet);
});

boutonAppartements.addEventListener("click",function(){
	const nameAppart = works.filter(function(work){
		return work.category.name == "Appartements";
	});
	sectionGallery.innerHTML = "";
	generateImgGallery(nameAppart);
});

boutonHotel.addEventListener("click",function(){
	const namehotel = works.filter(function(work){
		return work.category.name == "Hotels & restaurants";
	});
	sectionGallery.innerHTML = "";
	generateImgGallery(namehotel);
});

// ------------generateur galerie dans la modale-------------
 function generateImgGallery2(works) {
	const sectionGallery2 = document.querySelector(".gallery-modal");

	for (let i = 0; i < works.length; i++) {
		const photoGallery = works[i];

		const figureElement = document.createElement("figure");
		figureElement.dataset.id = works[i].id;

		const contenairImage = document.createElement("div");
		contenairImage.className="contenair-image";
		
		const iconTrash = document.createElement("i");
		iconTrash.className ="fa-solid fa-trash-can";

		const iconArrow = document.createElement("i");
		iconArrow.className="fa-solid fa-arrows-up-down-left-right";

		const divBtnTrash = document.createElement('div');
		divBtnTrash.className="btn-icone-trash";

		const btnIconeTrash = document.createElement("input");
		btnIconeTrash.type="button";
		btnIconeTrash.id=works[i].id;
		btnIconeTrash.className="input-trash";
		btnIconeTrash.value=btnIconeTrash.id;
		
		const divBtnArrow = document.createElement('div');
		divBtnArrow.className="btn-icone-arrow";

		const btnIconeArrow = document.createElement("input");
		btnIconeArrow.type="button";
		btnIconeArrow.className="input-arrow";

		const btnEditer = document.createElement('input');
		btnEditer.value="éditer"
		btnEditer.type="button"
		btnEditer.className="editer-btn";
		btnEditer.id=works[i].id;
		
		const imgGallery = document.createElement("img");
		imgGallery.crossOrigin = "anonymous";
		imgGallery.className="photo";
		imgGallery.src = photoGallery.imageUrl;
		imgGallery.alt = photoGallery.title;

		divBtnTrash.append(iconTrash);
		divBtnTrash.append(btnIconeTrash);

		divBtnArrow.append(iconArrow);
		divBtnArrow.append(btnIconeArrow);

		sectionGallery2.appendChild(figureElement);

		contenairImage.appendChild(divBtnArrow);
		contenairImage.appendChild(divBtnTrash);
		contenairImage.appendChild(imgGallery);
		contenairImage.appendChild(btnEditer)

		figureElement.appendChild(contenairImage);
	}
// ------------------------Supprimer une image----------------------
	document.querySelectorAll(".input-trash").forEach( input => 
		input.addEventListener('click', e => {
		e.preventDefault();
		let id = e.target.id;
		fetch("http://localhost:5678/api/works/"+id,{
			method:"DELETE",
			headers:{
				"Authorization":"Bearer "+ user.token
			}
		})
		.then(response => {
			console.table(response)
			if(!response.ok){
				throw'erreur par ici';
			}
			console.log(e.target)
			return false;
		})
		.catch(error => {    
			console.error('Error:', error);
		});
		
		console.log(id)
		})
		);
};
// ----------------------Supprimer galerie----------------------
const btnSuppr = document.querySelector("#supp-galerie");
btnSuppr.addEventListener("click",function(e){
	e.preventDefault
	if (confirm("Vous êtes sûr ?")==true) {
		for (let i = 0; i < works.length; i++) {
			let id2 = works[i];
			console.log(id2);
			fetch("http://localhost:5678/api/works/"+id2.id,{
		method:"DELETE",
		headers:{
			"content-type":"application/json",
			"Authorization":"Bearer "+ user.token
		},
		body:null
	})
	.then(response => {
		console.table(response)
		if(!response.ok){
			throw'erreur par ici';
		}
		return response.json();
	})
	.then(data => {
		console.table(data)
	})
	.catch(error => {    
		console.error('Error:', error);
	});
	}
		}else{
		console.log("annulation de la suppression")
	}
})