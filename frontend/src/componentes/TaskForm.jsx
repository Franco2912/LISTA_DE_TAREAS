import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
    const [title, setTitle] = useState(""); // Estado para el título
    const [description, setDescription] = useState(""); // Estado para la descripción

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title) {
            // Se pasa tanto el título como la descripción
            addTask({
                id: Date.now(),
                title,
                description,
                completed: false,
                createdAt: new Date(),
            });
            setTitle(""); // Limpiar campo título
            setDescription(""); // Limpiar campo descripción
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
                    required
                />
            </div>
            <div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción de la tarea"
                    rows="4"
                    required
                />
            </div>
            <button type="submit">Agregar Tarea</button>
        </form>
    );
}