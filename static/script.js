function loadTasks() {
    fetch("/tasks")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";
            data.forEach((task, index) => {
                list.innerHTML += `
                    <li>
                        ${task}
                        <button onclick="deleteTask(${index})">❌</button>
                    </li>`;
            });
        });
}

function addTask() {
    const task = document.getElementById("taskInput").value;

    fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    }).then(() => {
        document.getElementById("taskInput").value = "";
        loadTasks();
    });
}

function deleteTask(index) {
    fetch(`/tasks/${index}`, {
        method: "DELETE"
    }).then(() => loadTasks());
}

loadTasks();