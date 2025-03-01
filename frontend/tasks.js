document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const logoutBtn = document.getElementById("logout-btn");

  // Obtener tareas desde el backend
  async function fetchTasks() {
      try {
          const response = await fetch("http://localhost:5000/tasks");
          const tasks = await response.json();
          renderTasks(tasks);
      } catch (error) {
          console.error("⚠️ Error al obtener tareas:", error);
      }
  }

  // Mostrar tareas en la interfaz
  function renderTasks(tasks) {
      taskList.innerHTML = "";
      tasks.forEach(task => {
          const li = document.createElement("li");
          li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
          li.innerHTML = `
              ${task.name}
              <button class="btn btn-danger btn-sm" onclick="deleteTask('${task._id}')">Eliminar</button>
          `;
          taskList.appendChild(li);
      });
  }

  // Agregar una nueva tarea
  taskForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const taskName = document.getElementById("task-name").value;

      try {
          const response = await fetch("http://localhost:5000/tasks", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: taskName })
          });

          if (response.ok) {
              fetchTasks(); // Recargar tareas
              taskForm.reset();
          }
      } catch (error) {
          console.error("⚠️ Error al agregar tarea:", error);
      }
  });

  // Eliminar tarea
  window.deleteTask = async function (taskId) {
      try {
          const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
              method: "DELETE"
          });

          if (response.ok) {
              fetchTasks(); // Recargar tareas
          }
      } catch (error) {
          console.error("⚠️ Error al eliminar tarea:", error);
      }
  };

  // Cerrar sesión
  logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("token"); // Eliminar token de autenticación
      window.location.href = "index.html"; // Redirigir a la página de inicio
  });

  // Cargar tareas al inicio
  fetchTasks();
});

  
  