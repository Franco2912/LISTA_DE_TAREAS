import React from 'react';

function TaskItem({ task }) {
    return (
        <div className={`task-item ${task.completed ? "completed" : ""}`}>  
        <li>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Estado: {task.completed ? '✅ Completada' : '❌ Pendiente'}</p>
            <p>Creada el: {new Date(task.createdAt).toLocaleDateString()}</p>
            
        </li>
        </div>
    );
}

export default TaskItem;