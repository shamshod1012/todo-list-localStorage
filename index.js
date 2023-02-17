/* DOM elements*/
const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const messageCreate = document.getElementById("message-create");
const closeEl = document.getElementById("close");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
let editItemId;

/* 
==============
   main code
==============
 */

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
if (todos.length) {
  showTodos();
}
/*
================
👇All functions 
================
*/
function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month = now.getMonth() < 10 ? "0" + now.getMonth() + 1 : now.getMonth();
  const year = now.getFullYear();

  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyul",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  const month_text = now.getMonth();

  fullDay.textContent = `${date} ${months[month_text]}, ${year}`;
  hourEl.textContent = hour;
  secondEl.textContent = second;
  minuteEl.textContent = minute;
  return `${hour}:${minute}, ${date}.${month}.${year}`;
}
setInterval(getTime, 1000);

function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

function deleteTodo(id) {
  const deletedTodos = todos.filter((item, index) => {
    return index !== id;
  });

  todos = deletedTodos;
  setTodos();
  showTodos();
}

function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  todos.forEach((item, index) => {
    listGroupTodo.innerHTML += `
    <li ondblclick=(setCompleted(${index})) class="list-group-item d-flex justify-content-between ${
      item.completed == true ? "completed" : ""
    }">${item.text}
        <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick=(editTodo(${index})) src="./img/edit.svg" alt="edit" width="25" height="25" />
            <img onclick=(deleteTodo(${index})) src="./img/delete.svg" alt="edit" width="25" height="25" />
        </div>
    </li>
    `;
  });
}

function setCompleted(id) {
  const competedTodos = todos.map((item, index) => {
    if (id == index) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = competedTodos;
  setTodos();
  showTodos();
}

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (todoText.length) {
    todos.splice(editItemId, 1, {
      text: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();
    closeModal();
  } else {
    showMessage("message-edit", "please, Enter text");
  }
});

function editTodo(id) {
  openModal();
  editItemId = id;
}
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}

overlay.addEventListener("click", () => {
  closeModal();
});
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), completed: false });
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please, enter text");
  }
});
closeEl.addEventListener("click", () => {
  closeModal();
});

document.addEventListener("keydown", (e) => {
  if ((e.which == 27)) {
    closeModal();
  }
});

/*
================
👆All functions 
================
*/
