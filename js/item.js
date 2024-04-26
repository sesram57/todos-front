const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
closed = true;
todo = {};
function getItem() {
    if (!!id) {
        console.log("id:", id);
        todo = fetch('http://localhost:3000/todos/' + id)
            .then((response) => response.json())
            .then((json) => { todo = json; })
            .then(() => { displayList(todo); })
    } else {
        console.log("Aucun id")
    }
}

function displayList() {
    let tags = [...todo["Tags"]]; 
    closed = todo["is_complete"];
    console.log("closed:"+closed)
    console.log("todo", todo);
    const app = document.getElementById('app');
    let cardDiv = document.createElement('div');
    cardDiv.classList.add("card");
    let cardHeader = document.createElement('div');
    cardHeader.classList.add("card-header");
    cardHeader.innerText=todo["created_at"];
    let cardClose = document.createElement('button');
    cardClose.setAttribute("type","button");
    cardClose.setAttribute("id","buttonClose");
    cardClose.setAttribute("aria-label","Close");
    cardClose.classList.add("btn-close","float-end");
    cardHeader.appendChild(cardClose);
    let cardBody = document.createElement('div');
    cardBody.classList.add("card-body");
    let cardTitle =document.createElement('h1');
    cardTitle.classList.add("card-title");
    cardTitle.innerText=todo["text"];
    let cardText =document.createElement('div');
    cardText.classList.add("card-text");
    for(i=0; i <tags.length; i++){
        let span = document.createElement('span');
        span.classList.add("badge","bg-primary","rounded-pill");
        span.innerHTML= todo["Tags"][i];
        cardText.appendChild(span);
    }
    let cardFooter = document.createElement('div');
    cardFooter.classList.add("card-footer","float-end");
    let buttonDelete = document.createElement('button');
    buttonDelete.setAttribute("type","button");
    buttonDelete.setAttribute("id", "buttonDelete");
    buttonDelete.classList.add("btn","btn-danger","float-end","ms-2");
    buttonDelete.innerHTML = "Supprimer la tache";
    cardFooter.append(buttonDelete);
    let buttonDone = document.createElement('button');
    buttonDone.setAttribute("type","button");
    buttonDone.setAttribute("id", "buttonDone");
    buttonDone.classList.add("btn","btn-primary","float-end");
    buttonDone.innerHTML = "Terminer la tache"; 
    let buttonOpen = document.createElement('button');
    buttonOpen.setAttribute("type","button");
    buttonOpen.setAttribute("id", "buttonOpen");
    buttonOpen.classList.add("btn","btn-warning","float-end");
    buttonOpen.innerHTML = "Re-ouvrir la tache";
    if (todo["is_complete"]){    
        buttonDone.setAttribute("hidden",true);
    }else {
        buttonOpen.setAttribute("hidden",true);
    }
    cardFooter.appendChild(buttonDone);  
    cardFooter.appendChild(buttonOpen); 
    

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(cardFooter);
    app.appendChild(cardDiv);
    app.querySelector('#buttonClose').addEventListener("click", function (event) {
      event.preventDefault();
      close();
    });
    app.querySelector('#buttonDelete').addEventListener("click", function (event) {
      event.preventDefault();
      deleteAction();
    });
    app.querySelector('#buttonDone').addEventListener("click", function (event) {
        event.preventDefault();
        doneAction();
      });
    app.querySelector('#buttonOpen').addEventListener("click", function (event) {
        event.preventDefault();
        openAction();
    });
}

function doneAction() {
    console.log("doneAction");
    closed=!closed;
    let buttonDone = app.querySelector('#buttonDone');
    let buttonOpen = app.querySelector('#buttonOpen');
    buttonDone.setAttribute("hidden",true);
    buttonOpen.removeAttribute("hidden");
    const address = 'http://localhost:3000/todos/' + todo.id;
    const checkBody = {
        "is_complete": true,
      }
    fetch(address, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(checkBody)
    })
      .then(() => { console.log("Changement d'état réussi") })
}
function openAction() {
    console.log("openAction");
    closed=!closed;
    let buttonDone = app.querySelector('#buttonDone');
    let buttonOpen = app.querySelector('#buttonOpen');
    buttonDone.removeAttribute("hidden");
    buttonOpen.setAttribute("hidden",true);
    

    const address = 'http://localhost:3000/todos/' + todo.id;
    const checkBody = {
        "is_complete": false,
      }
    fetch(address, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(checkBody)
    })
      .then(() => { console.log("Changement d'état réussi") })
}

function deleteAction() {
  
  const address = 'http://localhost:3000/todos/' + todo.id;
  fetch(address, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    }
  })
    .then(() => { console.log("Suppression réussie"); })
    .then(() => { open('tasks.html',"_self"); })

}
(()=>{getItem()})()