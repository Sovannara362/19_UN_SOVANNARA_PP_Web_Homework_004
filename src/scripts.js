
let modal = document.getElementById("form");
let openModalBtn = document.getElementById("open-modal-btn");
let span = document.getElementById("close");

openModalBtn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let tasks = [];
function Task(taskName, priority, status) {
  this.taskName = taskName;
  this.priority = priority;
  this.status = status;
}
let addBtn = document.getElementById("add-btn");
let inputTaskName = document.getElementById("input-task-name");
let priorityButtons = document.querySelectorAll(".priority-button");
let statusButtons = document.querySelectorAll(".status-button");

let resultPriority;
function clickedPriority() {
  priorityButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      resultPriority = event.target.value;
    });
  });
}
function getResultPriority() {
  return resultPriority;
}

let resultStatus;
function clickedStatus() {
  statusButtons.forEach(button => {
    button.addEventListener("click", (event) => {

      resultStatus = event.target.value;
    });
  });
}
function getResultStatus() {
  return resultStatus;
}

clickedPriority();
clickedStatus();

addBtn.onclick = () => {
  let priority = getResultPriority() ?? "Medium";
  let status = getResultStatus();
  let taskName = inputTaskName.value;

  tasks.push(new Task(taskName, priority, status));
  modal.style.display = "none";
  inputTaskName.value = '';
  resultStatus = undefined
  resultStatus = undefined;
  renderListTasks();
};
const task1 = new Task("Finish homework", "High", "To Do");
const task2 = new Task("Buy groceries", "Medium", "Progress");
const task3 = new Task("Clean room", "Low", "Done");

tasks.push(task1);
tasks.push(task2);
tasks.push(task3);

let taskListContainer = document.getElementById("task-list-container");

function renderListTasks() 
{
  taskListContainer.innerHTML = '';

  for (let t of tasks.toReversed()) {
    let taskContainer = document.createElement("div");
    let taskName = document.createElement("h3");
    let priority = document.createElement("p");
    let status = document.createElement("p");

    taskName.textContent = t.taskName;
    priority.textContent = t.priority;
    status.textContent = t.status;

    let actionContainer = document.createElement("div");
    actionContainer.className = "flex justify-center gap-1 w-1/4";

    let updateBtn = document.createElement("button");
    updateBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    updateBtn.className = "w-20  rounded-2xl text-blue-500  p-2";

    updateBtn.addEventListener('click', () => {
      let index = tasks.indexOf(t);
      inputTaskName.value = t.taskName;
      resultPriority = t.priority;
      resultStatus = t.status;
      modal.style.display = "block";
      addBtn.textContent = "Update";

      addBtn.onclick = () => {
        tasks[index].taskName = inputTaskName.value;
        tasks[index].priority = resultPriority ?? t.priority;
        tasks[index].status = resultStatus ?? t.status;

        addBtn.textContent = "Add";
        addBtn.onclick = null;

        modal.style.display = "none";
        inputTaskName.value = '';
        resultPriority = undefined;
        resultStatus = undefined;

        renderListTasks();
      };
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.className = "w-20  rounded-2xl text-red-500  p-2";

    deleteBtn.addEventListener("click", () => {
      let index = tasks.indexOf(t);
      tasks.splice(index, 1);
      renderListTasks();
    });

    actionContainer.appendChild(updateBtn);
    actionContainer.appendChild(deleteBtn);
    let priorityColor;
    if (t.priority == "High") {
      priorityColor = "text-red-500";
    } else if (t.priority == "Medium") {
      priorityColor = "text-yellow-500";
    } else {
      priorityColor = "text-green-500";
    }
    taskContainer.className = "flex mx-50 p-4  my-5 bg-gray-100 rounded-tl-2xl rounded-br-2xl text-lg font-bold";
    taskName.className = "w-1/4 text-center text-black";
    priority.className = `w-1/4 text-center ${priorityColor}`;
    status.className = "w-1/4 text-center text-black";

    taskContainer.appendChild(taskName);
    taskContainer.appendChild(priority);
    taskContainer.appendChild(status);
    taskContainer.appendChild(actionContainer);
    taskListContainer.appendChild(taskContainer);
  }
}

renderListTasks();

