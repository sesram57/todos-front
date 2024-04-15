let todos = fetch('http://localhost:3000/todos')
.then((response)=>response.json())
.then((json)=>{todos=json;})
.then(()=>{displayList();})
.then(()=>{console.log(todos[0])});

function displayList() {
  const app = document.getElementById('app');
  const ul = document.createElement('ul');
  ul.classList.add("list-group");
  const list = todos[0]["todolist"];
  for (i = 0; i < list.length; ++i) {
    let li = document.createElement('li');
    li.classList.add("list-group-item");
    let div = document.createElement('div');
    let input = document.createElement('input');
    input.classList.add("form-check-input");
    input.classList.add("float-start");
    input.classList.add("me-3");
    input.setAttribute("type","checkbox");
    input.setAttribute("aria-label","...");
    input.setAttribute("value","");
    div.appendChild(input);
    let span = document.createElement("span");
    span.classList.add("float-start");
    span.innerText=list[i]["text"];
    div.appendChild(span);
    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.classList.add("float-end");
    button.innerText="Détails";
    button.setAttribute("type","button");
    div.appendChild(button);
    li.appendChild(div);
    ul.appendChild(li);
 }
  app.appendChild(ul);
  const addButton = document.createElement("button");
  addButton.classList.add("btn");
  addButton.classList.add("btn-primary");
  addButton.classList.add("float-end");
  addButton.classList.add("my-5");
  addButton.innerText="Nouvelle tâche";
  addButton.setAttribute("type","submit");
  app.appendChild(addButton);
}

// (()=>{displayList();})()
// fetch('http://localhost:3000/todos')
//   .then((response)=>response.json())
//   .then((json)=>{console.log(json);})