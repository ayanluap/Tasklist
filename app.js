// Decieding Variables
let form = document.querySelector('#form-content');
let taskInput = document.querySelector('#task');
let filterInput = document.querySelector('#filter');
let taskList = document.querySelector('.collection');
let clearTask = document.querySelector('.clear-btn');

// Load Event Listeners

loadEventListeners();

// Create function

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearTask.addEventListener('click', clearAll);
  filterInput.addEventListener('keyup', filterTask);
}

// Get tasks from Local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    let li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    taskList.appendChild(li);

    // Create link
    let link = document.createElement('a');
    link.className = 'secondary-content delete-item';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
  });
}

// Add task

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
  } else {
    // Create a new list
    let li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    taskList.appendChild(li);

    // Create link
    let link = document.createElement('a');
    link.className = 'secondary-content delete-item';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Store Task in Local Storage
    storeTaskInLocStor(taskInput.value);

    taskInput.value = '';
  }
  e.preventDefault();
}

// Remove/Delete Task

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you Sure ?')) {
      e.target.parentElement.parentElement.remove();

      // remove Task from Local storage
      remTaskFromLocStor(e.target.parentElement.parentElement);
    }
  }
}

// Clear all Tasks

function clearAll() {
  // using innerHTML
  /*
  if (confirm('Are you sure ?')) {
    taskList.innerHTML = '';
  } */

  // Faster Method
  if (confirm('Are you sure ?')) {
    while (taskList.firstChild) {
      taskList.firstChild.remove();

      // Clear All tasks from Local Storage
      clearAllFromLocStor();
    }
  }
}

// Filter Task

function filterTask(e) {
  const text = filterInput.value.toLowerCase();
  let tasks = document.querySelectorAll('.collection-item');
  tasks.forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
  e.preventDefault();
}

// STORE TASK IN LOCAL STORAGE
function storeTaskInLocStor(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// REMOVE TASK FROM LOCAL STORAGE
function remTaskFromLocStor(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR ALL TASKS FROM THE LOCAL STORAGE
function clearAllFromLocStor() {
  localStorage.clear();
}
