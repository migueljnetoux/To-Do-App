//ELEMENTS
const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");
const buttonAdd = document.getElementById("add-button");

let todoArray = getTodos();
console.log(todoArray);
updateUI();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    todoArray.unshift(todoObject);
    updateUI();
    saveTodos();
    todoInput.value = "";
  }
}

function updateUI() {
  todoListUL.innerHTML = "";
  todoArray.forEach((todo, todoIndex) => {
    todoItem = createLI(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createLI(str, strIndex) {
  const todoId = `todo-` + strIndex;
  const todoLI = document.createElement("li");
  const todoText = str.text;
  todoLI.className = "todo";
  todoLI.innerHTML = `
          <input type="checkbox" id="${todoId}" />
          <label class="custom-checkbox" for="${todoId}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="transparent"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label class="todo-text" for="${todoId}">${todoText}</label>
          <button class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--secondary-color)"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
          `;

  const deleteButton = todoLI.querySelector(".delete-button");

  deleteButton.addEventListener("click", () => {
    deleteTodoItem(strIndex);
  });

  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    todoArray[strIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = str.completed;
  return todoLI;
}

function deleteTodoItem(strIndex) {
  todoArray = todoArray.filter((_, i) => i !== strIndex);
  saveTodos();
  updateUI();
}

function saveTodos() {
  const todoJson = JSON.stringify(todoArray);
  localStorage.setItem("todos", todoJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
