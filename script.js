const todoInput = document.getElementById("todo-input");
const reminderInput = document.getElementById("reminder-datetime");
const addButton = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Ask for notification permission on page load
if (Notification.permission !== "granted") {
  Notification.requestPermission().then(permission => {
    console.log("Notification permission:", permission);
  });
}

addButton.addEventListener("click", addTodo);

function addTodo() {
  const todoText = todoInput.value.trim();
  const reminderTime = new Date(reminderInput.value);

  if (todoText !== "" && !isNaN(reminderTime)) {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="todo-text">${todoText}</span>
      <span class="reminder-time">${reminderTime.toLocaleString()}</span>
      <button class="edit-btn" onclick="editTodo(this)">Edit</button>
      <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
      <button class="save-btn" style="display: none;" onclick="saveTodo(this)">Save</button>
    `;

    todoList.appendChild(li);

    const delay = reminderTime.getTime() - Date.now();
    console.log("Reminder set in:", delay / 1000, "seconds");

    if (delay > 0) {
      setTimeout(() => {
        console.log(`Triggering reminder for: ${todoText}`);
        showNotification(`Reminder: ${todoText}`);
      }, delay);
    }

    todoInput.value = "";
    reminderInput.value = "";
  } else {
    alert("Please enter a task and valid reminder date & time.");
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

function showNotification(message) {
  if (Notification.permission === "granted") {
    new Notification(message);
  } else {
    console.warn("Notification not allowed.");
  }
}
