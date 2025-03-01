require("dotenv").config();
const express = require("express");
const connectDB = require("./config");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Middleware para leer JSON
app.use(express.json());

// Esquema y modelo de usuario
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,  // ⚠️ En producción, usa bcrypt para encriptar la contraseña
});

const User = mongoose.model("User", userSchema);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor corriendo...");
});

// ✅ Ruta para registrar usuarios
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: `Usuario ${username} registrado con éxito` });
    } catch (error) {
        console.error("Error en /register:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

