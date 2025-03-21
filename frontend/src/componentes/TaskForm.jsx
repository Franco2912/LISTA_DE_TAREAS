import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
    
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title) {
          
            addTask({
                id: Date.now(),
                title,
                description,
                completed: false,
                createdAt: new Date(),
            });
            setTitle(""); 
            setDescription(""); 
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
                    maxlength="15"
                    required
                />
            </div>
            <div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción de la tarea"
                    rows="4"
                    maxlength="80"
                    required
                />
            </div>
            <button type="submit">Agregar Tarea</button>
        </form>
    );
}