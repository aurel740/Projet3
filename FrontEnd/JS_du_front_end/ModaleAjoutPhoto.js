// -------------------------modale 2 ajout photo---------------------------
    const aside = document.querySelector("#modale");

    const divModale2 = document.querySelector(".modale-wrapper2");

    aside.appendChild(divModale2);
    
    const espaceCroix = document.createElement("div");
    espaceCroix.className="tete-pop-up";

    const btnIconeArrowLeft = document.createElement("button");
    btnIconeArrowLeft.className="btn-fleche-gauche";

    const iconeArrowLeft = document.createElement("i");
    iconeArrowLeft.className="fa-solid fa-arrow-left";
    btnIconeArrowLeft.appendChild(iconeArrowLeft);

    const btnExit2 = document.createElement("button");
    btnExit2.className="exit2";
    const iconeCroix = document.createElement("i");
    iconeCroix.className="fa-solid fa-x"
    btnExit2.appendChild(iconeCroix);

    espaceCroix.appendChild(btnIconeArrowLeft);
    espaceCroix.appendChild(btnExit2);

    const titre = document.createElement("h1");
    titre.innerText="Ajout Photo";
    titre.id="titlemodal"

    const formPhoto = document.createElement("form");
    formPhoto.method="post";
    formPhoto.id="ajout-image-presentation";
    formPhoto.enctype="multipart/form-data";

    const divAjout = document.createElement("fieldset");
    divAjout.className="ajout-img";

    const divPreview = document.createElement("fieldset");
    divPreview.className="imgInPreview";

    const divInfo = document.createElement("fieldset");
    divInfo.className="info-form";

    const labelTitle = document.createElement("label");
    labelTitle.setAttribute("for","title")
    labelTitle.innerText="Titre";

    const inputTitre = document.createElement("input");
    inputTitre.id="title";
    inputTitre.setAttribute("required","");
    inputTitre.setAttribute("type","text");
    inputTitre.setAttribute("name","title");

    const labelCategory = document.createElement("label");
    labelCategory.setAttribute("name","Category");
    labelCategory.innerText="Catégorie";

    const selectObjet = document.createElement("select");
    selectObjet.setAttribute("name","Category");
    selectObjet.id="Category";
    selectObjet.setAttribute("required","");

    const option1 = document.createElement("option");

    const option2 = document.createElement("option");
    option2.setAttribute("value","1");
    option2.innerText="Objets";

    const option3 = document.createElement("option");
    option3.setAttribute("value","2");
    option3.innerText="Appartements";

    const option4 = document.createElement("option");
    option4.setAttribute("value","3");
    option4.innerText="Hôtel & restaurants";

    const inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("type","submit");
    inputSubmit.setAttribute("value","Valider");
    inputSubmit.id="Valider"
	
	const iconePreview = document.createElement("i");
	iconePreview.className="fa-solid fa-image";

	const imgPreview = document.createElement("img");
	imgPreview.className="img-preview";

	const labelPreview=document.createElement("label");
	labelPreview.id="label-file";
	labelPreview.innerText="+ Ajouter photo";
	labelPreview.setAttribute("for","image");

	const inputPreview = document.createElement("input");
	inputPreview.setAttribute("type","file");
	inputPreview.id="image";
	inputPreview.setAttribute("name","image");
	inputPreview.setAttribute("accept",".png,.jpg");
	inputPreview.setAttribute("size","4194304");
	inputPreview.setAttribute("required","");
	inputPreview.crossOrigin = "anonymous";

	const paragraphePreview = document.createElement("p");
	paragraphePreview.innerText="jpg, png : 4mo max";

    divModale2.appendChild(espaceCroix);
    divModale2.appendChild(titre);
    divModale2.appendChild(formPhoto);

    selectObjet.appendChild(option1);
    selectObjet.appendChild(option2);
    selectObjet.appendChild(option3);
    selectObjet.appendChild(option4);

    divInfo.appendChild(labelTitle);
    divInfo.appendChild(inputTitre);
    divInfo.appendChild(labelCategory);
    divInfo.appendChild(selectObjet);

    formPhoto.appendChild(divAjout);
    formPhoto.appendChild(divPreview);
    formPhoto.appendChild(divInfo);
    formPhoto.appendChild(inputSubmit);

	divAjout.appendChild(iconePreview);
	divAjout.appendChild(imgPreview);
	divAjout.appendChild(labelPreview);
	divAjout.appendChild(inputPreview);
	divAjout.appendChild(paragraphePreview);
// ---------------gestion preview image---------------------
const imgReel = document.createElement("img");
	divPreview.appendChild(imgReel); 
    
    inputPreview.addEventListener("change",function(e){
	e.preventDefault();
    imgReel.src=URL.createObjectURL(e.target.files[0]);

    if (getComputedStyle(divAjout).height == "250px" && getComputedStyle(divPreview).display=="none") {
        divAjout.style.height="0.1px";
        divAjout.style.display="none"
        divPreview.style.display="flex";
        iconePreview.style.visibility="hidden";
    }
	});
//--------------------Enleve la preview-------------------
function remettreBtnAjout (){
        if (getComputedStyle(divAjout).height == "0.1px" && getComputedStyle(divPreview).display=="flex") {
        divAjout.style.height="250px";
        divAjout.style.display="flex"
        divPreview.style.display="none";
        iconePreview.style.visibility="visible";
    }
}
// -------------------button Exit--------------------------
		btnExit2.addEventListener("click",function(e){
		e.preventDefault();
        aside.style.display="none";
        divModale2.style.display="none";
        remettreBtnAjout();
		});
// ----------------button fleche gauche--------------------
const modale1 = document.querySelector(".modale-wrapper1")	
btnIconeArrowLeft.addEventListener("click",function(e){
	e.preventDefault();
    divModale2.style.display="none";
    modale1.style.display="flex";
    imgReel.src="";
    remettreBtnAjout();

});
// ---------------Si click en dehors modale---------------
document.addEventListener("mouseup",function(e){
    e.preventDefault();
    if (!divModale2.contains(e.target) && getComputedStyle(divModale2).display=="flex"){
        aside.style.display="none"
        divModale2.style.display="none"
        remettreBtnAjout();
    }
})
//-------------------Post new works----------------------
let user = JSON.parse(sessionStorage.getItem('user'));

formPhoto.addEventListener("submit",function(e){
	e.preventDefault();	
	let valeurForm = new FormData();
	valeurForm.append("title",inputTitre.value);
	valeurForm.append("image",inputPreview.files[0]);
	valeurForm.append("category",selectObjet.value);
	fetch("http://localhost:5678/api/works",{
		method:'POST',
		headers:{
			"Authorization":"Bearer "+ user.token
		},
		body:valeurForm
	})
	.then(response =>{
		if(!response.ok){
			console.log("erreur ici en response")
		}
		return response.json()
	})
	.then(data => {
		console.log(data)
	})
	.catch(error => {    
		console.error('Error:',error);
	});	
	})