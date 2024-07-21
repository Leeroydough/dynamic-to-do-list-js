document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // Use classList.add to add the class
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText); // Remove the task from Local Storage
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';

        // Save the task to Local Storage
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add task when the add button is clicked
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Add task when the enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
