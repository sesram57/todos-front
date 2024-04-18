todos = [];
function getList() {
  todos = fetch('http://localhost:3000/todos')
    .then((response) => response.json())
    .then((json) => { todos = json; })
    .then(() => { displayList(); })
}

function displayList() {
  const app = document.getElementById('app');
  const ul = document.createElement('ul');
  ul.classList.add("list-group");
  const list = todos[0]["todolist"];
  for (i = 0; i < list.length; ++i) {
    let id = list[i].id;
    let li = document.createElement('li');
    li.classList.add("list-group-item");
    let div = document.createElement('div');
    div.setAttribute("id", "item" + id);
    let input = document.createElement('input');
    input.classList.add("form-check-input", "float-start", "me-3");
    input.setAttribute("type", "checkbox");
    input.setAttribute("aria-label", "...");
    input.setAttribute("value", "");
    console.log("isComplete:" + list[i].is_complete);
    input.setAttribute("onclick", "isDone(" + id + ")");
    let span = document.createElement("span");
    span.classList.add("float-start");
    span.innerText = list[i].text;
    if (list[i].is_complete) {
      input.setAttribute("checked", true);
      span.classList.add("text-decoration-line-through");
    }
    div.appendChild(input);
    div.appendChild(span);
    let buttonDelete = document.createElement("button");
    buttonDelete.classList.add("btn", "btn-danger", "float-end","me-2");
    buttonDelete.innerText = "Supprimer";
    buttonDelete.setAttribute("role", "button");
    buttonDelete.setAttribute("onclick", "deleteItem(" + id + ")");
    div.appendChild(buttonDelete);
    let buttonDetails = document.createElement("button");
    buttonDetails.classList.add("btn", "btn-primary", "float-end","me-2");
    buttonDetails.innerText = "Détails";
    buttonDetails.setAttribute("role", "button");
    buttonDetails.setAttribute("onclick", "openItem(" + id + ")");
    div.appendChild(buttonDetails);
    li.appendChild(div);
    ul.appendChild(li);
  }
  app.appendChild(ul);
  const addButton = document.createElement("button");
  addButton.classList.add("btn", "btn-primary", "float-end", "my-5");
  addButton.innerText = "Nouvelle tâche";
  addButton.setAttribute("onclick", "displayForm()");
  app.appendChild(addButton);
  const form = document.createElement('form');
  form.setAttribute("id", "formTask");
  const divTextForm = document.createElement('div');
  divTextForm.classList.add("mb-3", "col-md-12");
  const labelTextForm = document.createElement('label');
  labelTextForm.setAttribute("for", "inputTextForm");
  labelTextForm.classList.add('form-label');
  divTextForm.appendChild(labelTextForm);
  const inputTextForm = document.createElement('input');
  inputTextForm.classList.add("form-control");
  inputTextForm.setAttribute("type", "text");
  inputTextForm.setAttribute("id", "inputTextForm");
  inputTextForm.setAttribute("aria-describedby", "textHelp");
  divTextForm.appendChild(inputTextForm);
  const helpTextForm = document.createElement('div');
  helpTextForm.setAttribute("id", "textHelp");
  helpTextForm.classList.add("form-text");
  helpTextForm.innerText = "Nom de la nouvelle tâche";
  divTextForm.appendChild(helpTextForm);
  form.appendChild(divTextForm);

  const divTagForm = document.createElement('div');
  divTagForm.classList.add("input-group", "col-12");
  const spanTagForm = document.createElement('span');
  spanTagForm.classList.add('input-group-text');
  spanTagForm.innerText = "Tags";
  divTagForm.appendChild(spanTagForm);
  const inputTag1Form = document.createElement('input');
  inputTag1Form.classList.add("form-control");
  inputTag1Form.setAttribute("type", "text");
  inputTag1Form.setAttribute("id", "tag1");
  inputTag1Form.setAttribute("aria-label", "Premier tag");
  divTagForm.appendChild(inputTag1Form);
  const inputTag2Form = document.createElement('input');
  inputTag2Form.classList.add("form-control");
  inputTag2Form.setAttribute("type", "text");
  inputTag2Form.setAttribute("id", "tag2");
  inputTag2Form.setAttribute("aria-label", "Second tag");
  divTagForm.appendChild(inputTag2Form);
  const inputTag3Form = document.createElement('input');
  inputTag3Form.classList.add("form-control");
  inputTag3Form.setAttribute("type", "text");
  inputTag3Form.setAttribute("id", "tag3");
  inputTag3Form.setAttribute("aria-label", "Troisième tag");
  divTagForm.appendChild(inputTag3Form);
  form.appendChild(divTagForm);

  const divDoneForm = document.createElement('div');
  divDoneForm.classList.add("form-check", "form-switch", "col-12");
  const inputDoneForm = document.createElement('input');
  inputDoneForm.classList.add("form-check-input");
  inputDoneForm.setAttribute("type", "checkbox");
  inputDoneForm.setAttribute("id", "checkDone");
  inputDoneForm.setAttribute("role", "switch");
  divDoneForm.appendChild(inputDoneForm);

  const labelDoneForm = document.createElement('label');
  labelDoneForm.setAttribute("for", "checkDone");
  labelDoneForm.classList.add('form-check-label');
  labelDoneForm.innerText = "Tâche déjà terminée?"
  divDoneForm.appendChild(labelDoneForm);
  form.appendChild(divDoneForm);

  const divValidation = document.createElement('div');
  divValidation.classList.add("col-12");
  const buttonValidation = document.createElement('button');
  buttonValidation.classList.add("btn", "btn-primary");
  buttonValidation.setAttribute("type", "submit");
  buttonValidation.innerText = "Ajouter la tâche";
  buttonValidation.setAttribute("id", "addTask");
  divValidation.appendChild(buttonValidation);
  form.appendChild(divValidation);
  form.classList.add("invisible");
  app.appendChild(form);
  app.querySelector('#addTask').addEventListener("click", function (event) {
    event.preventDefault();
    newTask();
  });
}

function openItem(id) {
  if (!!id) {
    localStorage.setItem('item', id);
    console.log("item:" + localStorage.getItem('item'));
    open('item.html');
  } else {
    console.log("openItem : Aucun id")
  }
}

function deleteItem(id) {
  if (!!id) {
    const address = 'http://localhost:3000/todos/' + id;
    fetch(address, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
      .then(() => { console.log("Suppression réussie"); })
      .then(() => { location.reload(); })
  } else {
    console.log("isDone : Aucun id")
  }
}

function isDone(id) {
  if (!!id) {
    let item = document.getElementById('item' + id);
    let input = item.getElementsByTagName('input')[0];
    let span = item.getElementsByTagName('span')[0];
    let checkBody;
    if (input.getAttribute("checked")) {
      console.log("item terminé")
      checkBody = {
        "is_complete": false,
      };
    } else {
      console.log("item non terminé")
      checkBody = {
        "is_complete": true,
      };
    }
    span.classList.toggle("text-decoration-line-through");
    const address = 'http://localhost:3000/todos/' + id;
    fetch(address, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(checkBody)
    })
      .then(() => { console.log("Changement d'état réussi") })
  } else {
    console.log("isDone : Aucun id")
  }
}

function displayForm() {
  let form = document.getElementsByTagName('form')[0];
  form.classList.remove("invisible");
  form.classList.add("visible");
}

function newTask() {

  const nameTask = document.getElementById("inputTextForm").value;
  const tag1Task = document.getElementById("tag1").value;
  const tag2Task = document.getElementById("tag2").value;
  const tag3Task = document.getElementById("tag3").value;
  const doneTask = document.getElementById("checkDone");

  console.log(nameTask + "," + tag1Task + "," + tag2Task + "," + tag3Task );
  console.log(doneTask.checked);
  if(!!nameTask && !!tag1) {
    const address = 'http://localhost:3000/todos/';
    const tags = [tag1Task];
    if (!!tag2Task) {
      tags.push(tag2Task);
    }
    if (!!tag3Task) {
      tags.push(tag3Task);
    }
    const taskBody ={"text":nameTask,"Tags":tags,"is_complete": doneTask.checked};
    fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(taskBody)
    })
      .then(() => { console.log("Changement d'état réussi");})
      .then(()=>{location.reload();})
  } else {
    console.log("Données manquante pour créer une tache");
  }

}
(() => { getList() })()