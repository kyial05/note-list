let main = document.createElement("main");
main.classList.add("container");

document.body.prepend(main);

let projectName = document.createElement("h1");
projectName.innerHTML = "Let's do it";
main.append(projectName);

let listBlock = document.createElement("div");
listBlock.className = "mainBlock";
main.append(listBlock);

let firstDiv = document.createElement("div");
listBlock.append(firstDiv);
firstDiv.className = "form";

let textIn = document.createElement("input");
textIn.classList = "textIn";
textIn.setAttribute("placeholder", "GONNA DO...");
firstDiv.append(textIn);

let setDate = document.createElement("input");
setDate.setAttribute("type", "date");
firstDiv.append(setDate);
setDate.className = "second";

let addBtn = document.createElement("button");
addBtn.innerHTML = "ADD";
addBtn.id = "addBtn";
firstDiv.append(addBtn);

let ul = document.createElement("ul");
listBlock.append(ul);

let todosArray =
  localStorage.getItem("todo") == null
    ? []
    : [...JSON.parse(localStorage.getItem("todo"))];

const addTodo = () => {
  let newTask = textIn.value;
  let date = setDate.value;
  if (newTask != "") {
    todosArray.push({
      text: newTask,
      checked: false,
      date,
    });
    localStorage.setItem("todo", JSON.stringify(todosArray));
    console.log(todosArray);
    renderTodoItem();
    textIn.value = "";
    setDate.value = "";
  }
};

const delateTodo = (e) => {
  let index = parseInt(e.target.parentNode.id);

  todosArray.splice(index, 1);

  localStorage.setItem("todo", JSON.stringify(todosArray));

  renderTodoItem();
};

const completeTodo = (e) => {
  // console.log(e.target.parentNode.id)

  let todosTemporary = [...todosArray];

  let index = parseInt(e.target.parentNode.id);

  let objectElement = todosTemporary[index].checked;

  todosTemporary[index].checked = !objectElement;

  console.log(objectElement);

  localStorage.setItem("todo", JSON.stringify(todosTemporary));

  let isDone = e.currentTarget.parentNode.classList.contains("done");
  isDone
    ? e.currentTarget.parentNode.classList.remove("done")
    : e.currentTarget.parentNode.classList.add("done");
};

addBtn.addEventListener("click", addTodo);

const renderTodoItem = () => {
  ul.innerHTML = "";
  todosArray.map((todo, id) => {
    let li = document.createElement("li");
    li.className = todo.checked ? "taskItem done" : "taskItem";
    li.id = id;

    let doneBtn = document.createElement("img");
    doneBtn.src = "complete.png";
    doneBtn.addEventListener("click", completeTodo);
    doneBtn.className = "doneClick";

    let delateBtn = document.createElement("img");
    delateBtn.src = "delete.png";
    delateBtn.addEventListener("click", delateTodo);
    delateBtn.className = "delClick";

    let label = todo.text + " " + todo.date;
    li.append(label);
    li.append(doneBtn);
    li.append(delateBtn);
    ul.prepend(li);
  });
};
renderTodoItem();
