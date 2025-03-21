import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
    
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title) {
            addTask({
                id: Date.now(), // Generar un ID temporal para la tarea
                title,
                description,
                completed: false,
                createdAt: new Date(),
            });
            setTitle(""); // Limpiar el input
            setDescription(""); // Limpiar la descripción
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título de la tarea"
                    maxLength="15"  // Cambio de `maxlength` a `maxLength`
                    required
                />
            </div>
            <div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción de la tarea"
                    rows="4"
                    maxLength="80"  // Cambio de `maxlength` a `maxLength`
                    required
                />
            </div>
            <button type="submit">Agregar Tarea</button>
        </form>
    );
}
