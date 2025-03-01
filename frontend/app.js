document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript cargado correctamente");

  // 🚀 REGISTRO DE USUARIOS
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log("✅ Formulario de registro detectado y botón funcionando");

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("📤 Enviando datos de registro:", { username, email, password });

      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        console.log("📜 Resultado del registro:", result);

        // Mostrar mensaje en la página
        const messageDiv = document.getElementById("response-message");
        messageDiv.textContent = result.message || "Error en el registro";
        messageDiv.style.color = response.ok ? "green" : "red";

        if (response.ok) {
          // Esperar 3 segundos antes de redirigir
          setTimeout(() => {
            window.location.href = "login.html";
          }, 3000);
        }

      } catch (error) {
        console.error("⚠️ Error en la solicitud de registro:", error);
      }
    });
  } else {
    console.error("❌ No se encontró el formulario de registro");
  }

  // 🚀 INICIO DE SESIÓN
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log("✅ Formulario de login detectado y botón funcionando");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("📤 Enviando datos de login:", { email, password });

      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        console.log("📜 Resultado del login:", result);

        const messageDiv = document.getElementById("login-message");
        messageDiv.textContent = result.message || "Error en el inicio de sesión";
        messageDiv.style.color = response.ok ? "green" : "red";

        if (response.ok) {
          // Guardar el token en localStorage (si tu backend devuelve uno)
          if (result.token) {
            localStorage.setItem("token", result.token);
          }

          // Redirigir al usuario al gestor de tareas
          setTimeout(() => {
            window.location.href = "gestor_tareas.html";
          }, 2000);
        }
      } catch (error) {
        console.error("⚠️ Error en la solicitud de login:", error);
      }
    });
  } else {
    console.error("❌ No se encontró el formulario de inicio de sesión");
  }
});

