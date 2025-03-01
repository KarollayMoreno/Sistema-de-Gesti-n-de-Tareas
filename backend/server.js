const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../")));

// 🔹 Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/gestorTareas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 🔹 Modelo de Tareas
const TaskSchema = new mongoose.Schema({ name: String });
const Task = mongoose.model("Task", TaskSchema);

// 📌 Ruta para registrar usuarios (simulación)
app.post("/register", (req, res) => {
    console.log("Solicitud recibida en /register:", req.body);
    res.json({ message: "Usuario registrado correctamente" });
});

// 📌 Ruta para obtener todas las tareas
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// 📌 Ruta para agregar una nueva tarea
app.post("/tasks", async (req, res) => {
    const task = new Task({ name: req.body.name });
    await task.save();
    res.json({ message: "Tarea creada" });
});

// 📌 Ruta para eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada" });
});

// 🔥 Iniciar servidor
app.listen(5000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:5000");
});

