//Deffine UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Loading all event listeners

loadEventListeners();



// Load all event listeners
function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);

}

    // Get Tasks from LS
    function getTasks() {
        let tasks;
        if(localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }

        tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        //  Add class
        li.className = 'collection-item';
        // Create text node and append tp li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

        });

        console.log(tasks);
    }
    // Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Mag lagay ka!');
    } else{
        //create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // Add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
        //Store in LS
        storeTaskInLocalStorage(taskInput.value);
        console.log(li);
        taskInput.value = '';
    }
    e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
            // Remove from Local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

    //Clear Tasks
function clearTasks() {
    if(confirm('you sure?'));{
    taskList.innerHTML = '';
    // Clear form LS
    clearTasksFromLocalStorage();
    }

}

    // Clear Tasks from local storage
    function clearTasksFromLocalStorage() {
        localStorage.clear();
    }

    // Filter Tasks
    function filterTasks(e) {
        const text = e.target.value.toLowerCase();

        document.querySelectorAll('.collection-item').forEach(function(task) {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }