const express = require('express');
const cors = require('cors');

const app = express();
const PUERTO = 3000;

// Middleware
app.use(cors()); // Permite solicitudes desde cualquier origen
app.use(express.json()); // Permite recibir JSON en las peticiones

// Base de datos en memoria
let tasks = [];
let idCounter = 1;

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  console.log("📥 GET /api/tasks - Enviando todas las tareas");
  res.json(tasks);
});

// Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { title, description, completed } = req.body;
  
  if (!title || !description) {
      return res.status(400).json({ error: 'El título y la descripción son requeridos' });
  }

  const newTask = { 
      id: idCounter++, 
      title, 
      description,
      completed: completed || false, 
      createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  console.log("✅ Nueva tarea creada:", newTask);
  res.status(201).json(newTask);
});


// Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
  console.log(`📥 PUT /api/tasks/${req.params.id} - Recibido:`, req.body);

  const { id } = req.params;
  const { title, description, completed } = req.body;

  console.log("🔎 Revisando datos recibidos:", { title, description, completed }); // 👈 Verifica esto

  const task = tasks.find((t) => t.id == id);
  if (!task) {
    console.log("❌ Error: Tarea no encontrada");
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  task.title = title !== undefined ? title : task.title;
  task.description = description !== undefined ? description : task.description;
  task.completed = completed !== undefined ? completed : task.completed;

  console.log("✅ Tarea actualizada:", task);
  res.json(task);
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  console.log(`📥 DELETE /api/tasks/${req.params.id}`);

  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id == id);

  if (index === -1) {
    console.log("❌ Error: Tarea no encontrada");
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const deletedTask = tasks.splice(index, 1);
  console.log("✅ Tarea eliminada:", deletedTask[0]);

  res.json(deletedTask[0]);
});

// Iniciar el servidor
app.listen(PUERTO, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PUERTO}`);
});
