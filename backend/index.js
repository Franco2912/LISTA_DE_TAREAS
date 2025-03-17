const express = require('express');
const webApp = express();

const PUERTO = 3000;

webApp.use(express.json()); // Permite recibir JSON en las peticiones

let tasks = [];
let idCounter = 1;

// Obtener todas las tareas
webApp.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Crear una nueva tarea
webApp.post('/api/tasks', (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  const newTask = { id: idCounter++, title, completed: completed || false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar una tarea existente
webApp.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id == id);
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  task.title = title !== undefined ? title : task.title;
  task.completed = completed !== undefined ? completed : task.completed;
  
  res.json(task);
});

// Eliminar una tarea
webApp.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id == id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

webApp.listen(PUERTO);
console.log(`El servidor esta levantando en el puerto ${PUERTO}`);