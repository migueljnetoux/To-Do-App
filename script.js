//ELEMENTS
const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");
const buttonAdd = document.getElementById("add-button");

let todoArray = [];

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText.length > 0) {
    todoArray.push(todoText);
    updateTodoList();
    todoInput.value = "";
  }
}

function updateUI() {
  todoListUL.innerHTML = "";
  todoArray.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(str) {
  const todoLI = document.createElement("li");
  todoLI.innerText = str;
  return todoLI;
}
