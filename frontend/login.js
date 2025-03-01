document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript cargado correctamente");

  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      console.log("✅ Formulario de login detectado y botón funcionando");

      const username = document.getElementById("username-login").value;
      const password = document.getElementById("password-login").value;

      console.log("📤 Enviando datos:", { username, password });

      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        console.log("📩 Respuesta recibida:", response);

        const result = await response.json();
        console.log("📜 Resultado del JSON:", result);

        // Mostrar mensaje en la página
        const messageDiv = document.getElementById("login-message");
        if (messageDiv) {
          messageDiv.textContent = result.message || "Error en el inicio de sesión";
          messageDiv.style.color = response.ok ? "green" : "red";

          // Limpiar el mensaje después de 5 segundos
          setTimeout(() => {
            messageDiv.textContent = "";
          }, 5000);
        }

        // Redirigir si el inicio de sesión fue exitoso
        if (response.ok) {
          setTimeout(() => {
            window.location.href = "dashboard.html"; // Cambia esto a la página principal de tu app
          }, 2000);
        }

      } catch (error) {
        console.error("⚠️ Error en la solicitud:", error);
      }
    });
  } else {
    console.error("❌ No se encontró el formulario de login");
  }
});

  