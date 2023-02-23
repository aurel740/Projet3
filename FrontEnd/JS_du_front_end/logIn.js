  const loginLien = document.querySelector(".log");
  const form = document.forms["formLogIn"];
  const email = document.querySelector("#email2");
  const password = document.querySelector("#mdp2");

form.addEventListener("submit",function(e){
// post valeur des inputs
e.preventDefault();
 fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: {
    "accept": "application/json",
    "content-type":"application/json"
  },
  body: JSON.stringify({
    "email":email.value,
    "password":password.value
  })
})// Partie token reponse
.then(response => {
  let erreur;

  if((!email.value || !password.value) && !response.ok){
    erreur = "Veuillez saisir tout les champs";
  }
  if((email.value && password.value) && !response.ok){
    erreur = "Adresse email ou mot de passe incorrect";
  }
  if (erreur) {
    document.querySelector("#erreur").innerHTML=erreur;
  }else{
    document.querySelector("#erreur").innerHTML=""; 
    form.action="../index.html";  
  }

  if(response.ok){
  console.table(response)  
 return response.json()
  }
})
.then(data => {
  console.table(data)
      sessionStorage.setItem("user",JSON.stringify(data));
      let user = JSON.parse(sessionStorage.getItem('user'));
      if (user){
        form.submit();
      }
  })
.catch(error => {
    console.error('Error:', error);
});
})

