const form = document.querySelector('form');
form.addEventListener("submit",(event)=> {
    event.preventDefault();
    const name = document.getElementById('prenom').value;
    if (!!name) {
        localStorage.setItem('prenom',name);
        console.log("nom:"+ localStorage.getItem('prenom'));
        document.getElementById('prenom').value ="";
        open('tasks.html');
    } else
    {
        alert("Veuillez saisir votre prénom.")
    }
})