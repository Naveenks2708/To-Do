const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

addButton.addEventListener("click", addTodo);

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="todo-text">${todoText}</span>
            <button class="edit-btn" onclick="editTodo(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
            <button class="save-btn" style="display: none;" onclick="saveTodo(this)">Save</button>
        `;
    todoList.appendChild(li);
    todoInput.value = ""; 
  }
}

function editTodo(button) {
  const li = button.parentElement;
  const todoText = li.querySelector(".todo-text");
  const saveBtn = li.querySelector(".save-btn");
  const editBtn = li.querySelector(".edit-btn");

  todoText.contentEditable = "true";
  todoText.focus();

  saveBtn.style.display = "inline-block";
  editBtn.style.display = "none";
}

function saveTodo(button) {
  const li = button.parentElement;
  const todoText = li.querySelector(".todo-text");
  const editBtn = li.querySelector(".edit-btn");
  const saveBtn = li.querySelector(".save-btn");

  todoText.contentEditable = "false";

  saveBtn.style.display = "none";
  editBtn.style.display = "inline-block";
}

function deleteTodo(button) {
  const li = button.parentElement;
  todoList.removeChild(li);
}

todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});
