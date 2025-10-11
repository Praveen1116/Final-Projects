async function signup(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    const response = await axios.post("/api/signup", {
        name,
        email,
        password
    });

    alert(response.data.message);

    if(response.data.message === "You are signed up") {
        window.location.href = "signin.html";
    }

    if(response.data.message === "User already registered") {
        window.location.href = "signin.html";
    }
}

async function signin(event) {
    event.preventDefault();

    const email = document.querySelector("#signin-email").value;
    const password = document.querySelector("#signin-password").value;

    try {
        const response = await axios.post("/api/signin", {
            email,
            password
        });

        if(response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.name);
            window.location.href = "todo.html";
        } else {
            alert(response.data.message || "Invalid credentials");

            if(response.data.message === "You are not registered") {
                window.location.href = "signup.html"
            }
        }
    } catch(err) {
        if(err.response && err.response.data && err.response.data.message) {
            alert(err.response.data.message);
        } else {
            alert("Server error");
        }
    }
}

async function addTodo(event) {
    event.preventDefault();

    const titleInput = document.querySelector("#todo-title");
    const token = localStorage.getItem("token");

    await axios.post("/api/todo", {
        title: titleInput.value,
        done: false
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    titleInput.value = "";
    fetchTodos();
}

async function fetchTodos() {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/todos", {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    const todos = response.data.todos;
    const todosView = document.querySelector(".todo-view");
    if(!todosView) return;
    todosView.innerHTML = "";

    todos.sort((a, b) => b._id.localeCompare(a._id));

    todos.forEach(todo => {
        const todoCard = document.createElement("div");
        todoCard.className = "todo-card";

        const titleDiv = document.createElement("div");
        titleDiv.className = "todo-title";
        titleDiv.innerHTML = todo.title;

        const statusDiv = document.createElement("div");
        statusDiv.className = "todo-status";
        statusDiv.textContent = todo.done ? "✅ Done" : "⏳ Pending";

        todoCard.appendChild(titleDiv);
        todoCard.appendChild(statusDiv);
        todosView.appendChild(todoCard);

        const editDeleteDiv = document.createElement("div");
        editDeleteDiv.className = "edit-delete-div";

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerHTML = "Edit";

        editBtn.onclick = async function() {
            const newTitle = prompt("Enter new title...", todo.title);
            if(newTitle && newTitle.trim() !== "") {
                const token = localStorage.getItem("token");
                await axios.put(`/api/todo/${todo._id}`, {
                    title: newTitle
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                fetchTodos();
            }
        };

        editDeleteDiv.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "Delete";

        deleteBtn.onclick = async function() {
            const token = localStorage.getItem("token");
            await axios.delete(`/api/todo/${todo._id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            fetchTodos();
        }

        editDeleteDiv.appendChild(deleteBtn);

        const markDone = document.createElement("button");
        markDone.className = "mark-btn";
        markDone.innerHTML = todo.done ? "Undone" : "Done";

        markDone.onclick = async function() {
            const token = localStorage.getItem("token");
            await axios.put(`/api/todo/${todo._id}`, {
                done: !todo.done
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            fetchTodos();
        }

        editDeleteDiv.appendChild(markDone);

        todoCard.appendChild(editDeleteDiv);
    })
}

async function logout(event) {
    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "signin.html";
}

window.onload = function() {
    fetchTodos();

    const token = localStorage.getItem("token");
    const navLinks = document.querySelectorAll('.list ul li');

    navLinks.forEach(li => {
        const a = li.querySelector('a');
        if (!a) return;
        if (a.textContent.trim() === "Signup" || a.textContent.trim() === "Login") {
            li.style.display = token ? "none" : "";
        }

        if(a.textContent.trim() === "My Todos") {
            li.style.display = token ? "" : "none";
        }
    });

    const username = localStorage.getItem("username");
    const userSpan = document.getElementById("user");
    if (username && userSpan) {
        userSpan.innerHTML = username;
    }

};

