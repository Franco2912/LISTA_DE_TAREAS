export default function TaskList({ tasks, deleteTask, TaskCompletion, editTask }) {
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
                <li key={task.id} className={task.completed ? "completado" : ""}>
                    <div className="lista-tarea">
                        <span className="titulo" onClick={() => TaskCompletion(task.id)}>{task.title}</span>
                        <p className="descripcion" onClick={() => TaskCompletion(task.id)}>{task.description ? task.description : "📌 Sin descripción"}</p>
                    </div>
                    <div>
                        <button className='btn-editar' onClick={() => handleEdit(task.id)}>🖋</button>
                        
                        <button className='btn-eliminar' onClick={() => deleteTask(task.id)}>🗑</button>
                      
                    </div>
                </li>
            ))}
        </ul>
    );
}
