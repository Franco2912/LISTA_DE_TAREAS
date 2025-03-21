import { useState, useEffect } from "react";
import TaskForm from "./componentes/TaskForm";
import TaskList from "./componentes/TaskList";
import './App.css';

const apiUrl = import.meta.env.VITE_API_URL; 

export default function App() {
    const [tasks, setTasks] = useState([]);

    // GET /api/tasks - Obtener todas las tareas
    useEffect(() => {
        fetch(`${apiUrl}/tasks`)
            .then(res => res.json())
            .then(data => {
                console.log("📥 Tareas recibidas:", data);
                setTasks(data);
            })
            .catch(error => console.error("❌ Error obteniendo tareas:", error));
    }, []);
    
    // POST /api/tasks - Crear una nueva tarea
    const addTask = (task) => {
        fetch(`${apiUrl}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al agregar tarea");
            return response.json();
        })
        .then(newTask => setTasks(prevTasks => [...prevTasks, newTask]))
        .catch(error => console.error('❌ Error adding task:', error));
    };

    // DELETE /api/tasks/:id - Eliminar una tarea
    const deleteTask = (id) => {
        fetch(`${apiUrl}/tasks/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar tarea");
            return response.json();
        })
        .then(() => setTasks(tasks.filter(task => task.id !== id)))
        .catch(error => console.error('❌ Error deleting task:', error));
    };

    // Tarea completa o incompleta
    const TaskCompletion = (id) => {
        const task = tasks.find(task => task.id === id);
        if (!task) return;

        fetch(`${apiUrl}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...task, completed: !task.completed }),
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al actualizar tarea");
            return response.json();
        })
        .then(updatedTask => 
            setTasks(tasks.map(task => (task.id === id ? updatedTask : task)))
        )
        .catch(error => console.error('❌ Error updating task:', error));
    };

    //PUT /api/tasks/:id - Actualizar una tarea existente
    const editTask = (id, newTitle, newDescription) => {
        fetch(`${apiUrl}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
        })
        .then(res => {
            if (!res.ok) throw new Error("Error al editar tarea");
            return res.json();
        })
        .then(updatedTask => 
            setTasks(tasks.map(task => (task.id === id ? updatedTask : task)))
        )
        .catch(error => console.error('Error editing task:', error));
    };

    return (
        <div className="contenedor">
            
            <h1>Lista de Tareas</h1>
            <TaskForm addTask={addTask} />
            <TaskList 
                tasks={tasks} 
                deleteTask={deleteTask} 
                TaskCompletion={TaskCompletion} 
                editTask={editTask} 
            />
            
        </div>
    );
}
