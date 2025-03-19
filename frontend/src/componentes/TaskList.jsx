export default function TaskList({ tasks, deleteTask, toggleTaskCompletion, editTask }) {
    const handleEdit = (id) => {
        const newTitle = prompt("Edita el título de la tarea:");
        const newDescription = prompt("Edita la descripción de la tarea:");

        if (newTitle && newDescription) {
            editTask(id, newTitle, newDescription);
        }
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} className={task.completed ? "completed" : ""}>
                    <div>
                        <span onClick={() => toggleTaskCompletion(task.id)}>{task.title}</span>
                        <p>{task.description ? task.description : "📌 Sin descripción"}</p>
                    </div>
                    <div>
                        <button onClick={() => handleEdit(task.id)}>Editar</button>
                        
                        <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
