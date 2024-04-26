todos = [];
function getList() {
  todos = fetch('http://localhost:3000/todos')
    .then((response) => response.json())
    .then((json) => { todos = json; })
    .then(()=>{console.log(todos)})
    .then(() => { displayList(); })
}

function displayList() {
    const app = document.getElementById('app');
    let div = document.createElement('div');
    div.classList.add("d-flex","justify-content-between");
    
    let card1Div = document.createElement('div');
    card1Div.classList.add("card","w-25");
    let card1Header = document.createElement('div');
    card1Header.classList.add("card-header","d-flex","justify-content-center");
    card1Header.innerText="Nombre total de taches";
    let card1Body = document.createElement('div');
    card1Body.classList.add("card-body");
    let card1Title =document.createElement('h1');
    card1Title.classList.add("card-title");
    let card1Text =document.createElement('div');
    card1Text.classList.add("card-text");
    card1Text.classList.add("card-header","d-flex","justify-content-center");
    card1Text.innerText=todos[0].todolist.length;
    card1Body.appendChild(card1Title);
    card1Body.appendChild(card1Text);
    card1Div.appendChild(card1Header);
    card1Div.appendChild(card1Body);
    let card2Div = document.createElement('div');
    card2Div.classList.add("card","w-25");
    let card2Header = document.createElement('div');
    card2Header.classList.add("card-header","d-flex","justify-content-center");
    card2Header.innerText="Nombre total de taches en cours";
    let card2Body = document.createElement('div');
    card2Body.classList.add("card-body");
    let card2Title =document.createElement('h1');
    card2Title.classList.add("card-title");
    let card2Text =document.createElement('div');
    card2Text.classList.add("card-text");
    card2Text.classList.add("card-header","d-flex","justify-content-center");
    card2Text.innerText=todos[0].todolist.filter((item)=>{return item.is_complete==false;}).length;
    card2Body.appendChild(card2Title);
    card2Body.appendChild(card2Text);
    card2Div.appendChild(card2Header);
    card2Div.appendChild(card2Body);

    let card3Div = document.createElement('div');
    card3Div.classList.add("card","w-25");
    let card3Header = document.createElement('div');
    card3Header.classList.add("card-header","d-flex","justify-content-center");
    card3Header.innerText="Nombre total de taches terminées";
    let card3Body = document.createElement('div');
    card3Body.classList.add("card-body");
    let card3Title =document.createElement('h1');
    card3Title.classList.add("card-title");
    let card3Text =document.createElement('div');
    card3Text.classList.add("card-text");
    card3Text.classList.add("card-header","d-flex","justify-content-center");
    card3Text.innerText=todos[0].todolist.filter((item)=>{return item.is_complete==true;}).length;
    card3Body.appendChild(card3Title);
    card3Body.appendChild(card3Text);
    card3Div.appendChild(card3Header);
    card3Div.appendChild(card3Body);
    
    // let cardDiv = document.createElement('div');
    // cardDiv.classList.add("card");
    // let cardHeader = document.createElement('div');
    // cardHeader.classList.add("card-header");
    // cardHeader.innerText=todo["created_at"];
    // let cardClose = document.createElement('button');
    // cardClose.setAttribute("type","button");
    // cardClose.setAttribute("id","buttonClose");
    // cardClose.setAttribute("aria-label","Close");
    // cardClose.classList.add("btn-close","float-end");
    // cardHeader.appendChild(cardClose);
    // let cardBody = document.createElement('div');
    // cardBody.classList.add("card-body");
    // let cardTitle =document.createElement('h1');
    // cardTitle.classList.add("card-title");
    // cardTitle.innerText=todo["text"];
    // let cardText =document.createElement('div');
    // cardText.classList.add("card-text");
    // for(i=0; i <tags.length; i++){
    //     let span = document.createElement('span');
    //     span.classList.add("badge","bg-primary","rounded-pill");
    //     span.innerHTML= todo["Tags"][i];
    //     cardText.appendChild(span);
    // }
    // let cardFooter = document.createElement('div');
    // cardFooter.classList.add("card-footer","float-end");
    // let buttonDelete = document.createElement('button');
    // buttonDelete.setAttribute("type","button");
    // buttonDelete.setAttribute("id", "buttonDelete");
    // buttonDelete.classList.add("btn","btn-danger","float-end","ms-2");
    // buttonDelete.innerHTML = "Supprimer la tache";
    // cardFooter.append(buttonDelete);
    // let buttonDone = document.createElement('button');
    // buttonDone.setAttribute("type","button");
    // buttonDone.setAttribute("id", "buttonDone");
    // buttonDone.classList.add("btn","btn-primary","float-end");
    // buttonDone.innerHTML = "Terminer la tache"; 
    // let buttonOpen = document.createElement('button');
    // buttonOpen.setAttribute("type","button");
    // buttonOpen.setAttribute("id", "buttonOpen");
    // buttonOpen.classList.add("btn","btn-warning","float-end");
    // buttonOpen.innerHTML = "Re-ouvrir la tache";
    // if (todo["is_complete"]){    
    //     buttonDone.setAttribute("hidden",true);
    // }else {
    //     buttonOpen.setAttribute("hidden",true);
    // }
    // cardFooter.appendChild(buttonDone);  
    // cardFooter.appendChild(buttonOpen); 
    

    // cardBody.appendChild(cardTitle);
    // cardBody.appendChild(cardText);
    // cardDiv.appendChild(cardHeader);
    // cardDiv.appendChild(cardBody);
    // cardDiv.appendChild(cardFooter);
    div.appendChild(card1Div);
    div.appendChild(card2Div);
    div.appendChild(card3Div);
    app.appendChild(div)
}

(()=>{getList()})()