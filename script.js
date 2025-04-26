
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Load tasks from localStorage
  window.onload = () => {
    tasks.forEach(task => renderTask(task));
  };

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const newTask = { text: taskText, done: false };
    tasks.push(newTask);
    updateLocalStorage();
    renderTask(newTask);
    taskInput.value = "";
  }

  function renderTask(task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = task.text;
    if (task.done) span.classList.add("done");
    span.onclick = () => {
      task.done = !task.done;
      span.classList.toggle("done");
      updateLocalStorage();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => {
      tasks = tasks.filter(t => t !== task);
      taskList.removeChild(li);
      updateLocalStorage();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
