let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        updateTaskList();
        updateTaskCount();

        // Clear the input field
        taskInput.value = "";
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
    updateTaskCount();
}

function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    updateTaskList();
    updateTaskCount();
}

function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskStatus(${task.id})">
            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
}

function updateTaskCount() {
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
}

// Initial update
updateTaskList();
updateTaskCount();
