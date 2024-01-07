//Görevi diziye ekleme
let inputFormDOM = document.querySelector("#inputForm")

inputFormDOM.addEventListener("submit", addTask)

let taskArray = []
let counter = 0

let alertDOM = document.querySelector("#alert")

document.addEventListener("DOMContentLoaded", () => {
  let storedTasks = localStorage.getItem("tasks")
  if (storedTasks) {
    taskArray = JSON.parse(storedTasks)
    counter = taskArray.length
    addDocument()
    clickDelete()
  }
});

function addTask(event) {
  event.preventDefault();

  let inputDOM = document.querySelector("#input");

  if(!inputDOM.value){
    alertDOM.innerHTML = `
    <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
    <div id="liveToast" class="toast hide border-dark rounded-0" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
      <div class="toast-header border-dark" style="background-color: #E7DFD8;">
        <strong class="mr-auto text-dark">Uyarı!</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body" style="background-color: #E7DFD8;">
        Lütfen Görev Giriniz!
      </div>
    </div>
    </div>
    `

    let toast = new bootstrap.Toast(document.getElementById('liveToast'));
    toast.show();

    return
  }

  taskArray[counter] = {
    task: `${inputDOM.value}`,
  };

  counter++;
  console.log(taskArray);
  inputDOM.value = "";

  alertDOM.innerHTML = `
  <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
  <div id="liveToast" class="toast hide border-dark rounded-0" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
    <div class="toast-header border-dark" style="background-color: #E7DFD8;">
      <strong class="mr-auto text-dark">Bildirim</strong>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body" style="background-color: #E7DFD8;">
      Görev Eklendi.
    </div>
  </div>
  </div>
  `

  let toast = new bootstrap.Toast(document.getElementById('liveToast'));
  toast.show();

  addDocument();
  clickDelete()
  saveToLocalStorage()
}

function addDocument() {
  let taskListDOM = document.querySelector("#taskList");
  taskListDOM.innerHTML = ""

  taskArray.forEach((item, index, array) => {
    let taskListLiDOM = document.createElement("li");
    taskListLiDOM.classList.add("list-group-item","mb-3");
    taskListLiDOM.style.backgroundColor = "#E7DFD8"
    taskListLiDOM.style.borderColor = "black"
    taskListLiDOM.style.borderWidth = "1px"
    taskListLiDOM.style.borderRadius = "0px"

    let deleteButtonDOM = document.createElement("button");
    deleteButtonDOM.classList.add("float-right", "btn", "border", "border-1", "delete-button", "border-dark");
    deleteButtonDOM.style.borderRadius = "0px"
    deleteButtonDOM.innerHTML = "X";

    taskListLiDOM.innerHTML = item.task
    taskListLiDOM.append(deleteButtonDOM);

    taskListDOM.append(taskListLiDOM);
  });
}

// Görev silme
function clickDelete() {
  let deleteButtonsDOM = document.querySelectorAll(".delete-button");

  deleteButtonsDOM.forEach((item, index, array) => {
    item.removeEventListener("click", function() {
      deleteTask(index);
    });
  });

  deleteButtonsDOM.forEach((item, index, array) => {
    item.addEventListener("click", function() {
      deleteTask(index);
    });
  });
}


function deleteTask(index) {
  taskArray.splice(index, 1)
  console.log(taskArray)

  updateDocument()

  counter = 0

  alertDOM.innerHTML = `
  <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
  <div id="liveToast" class="toast hide border-dark rounded-0" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
    <div class="toast-header border-dark" style="background-color: #E7DFD8;">
      <strong class="mr-auto text-dark">Bildirim</strong>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body" style="background-color: #E7DFD8;">
      Görev Silindi.
    </div>
  </div>
  </div>
  `

  let toast = new bootstrap.Toast(document.getElementById('liveToast'));
  toast.show();

  saveToLocalStorage()
}

function updateDocument(){
  taskListDOM = document.querySelector("#taskList");
  taskListDOM.innerHTML = ""

  taskArray.forEach((item, index, array) => {
    taskListLiDOM = document.createElement("li");
    taskListLiDOM.classList.add("list-group-item","mb-3");
    taskListLiDOM.style.backgroundColor = "#E7DFD8"
    taskListLiDOM.style.borderColor = "black"
    taskListLiDOM.style.borderWidth = "1px"
    taskListLiDOM.style.borderRadius = "0px"

    deleteButtonDOM = document.createElement("button");
    deleteButtonDOM.classList.add("float-right", "btn", "border", "border-1", "delete-button", "border-dark");
    deleteButtonDOM.style.borderRadius = "0px"
    deleteButtonDOM.innerHTML = "X";

    taskListLiDOM.innerHTML = item.task
    taskListLiDOM.append(deleteButtonDOM);

    taskListDOM.append(taskListLiDOM);
  });

  clickDelete()
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}