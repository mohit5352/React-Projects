// Task.js

import React, { useState } from 'react';

function Task({ task, toggleCompletion, deleteTask, index, tasks, setTasks, editingIndex, setEditingIndex }) {
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleEdit = () => {
        setEditingIndex(index);
    };

    const handleSave = () => {
        const originalDueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;
        const updatedTask = { ...editedTask, dueDate: originalDueDate };
        const newTasks = [...tasks];
        newTasks[index] = updatedTask;
        setTasks(newTasks);
        setEditingIndex(-1);
    };

    const handleCancel = () => {
        setEditedTask({ ...task }); // Reset edited task to original task
        setEditingIndex(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <tr className={task.completed ? 'completed' : ''}>
            {/* Task details and buttons */}
            {editingIndex === index ? (
                <>
                    <td>
                        <input
                            type="text"
                            name="name"
                            value={editedTask.name}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="priority"
                            value={editedTask.priority}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="date"
                            name="dueDate"
                            value={editedTask.dueDate}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <button onClick={() => toggleCompletion(index)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                    </td>
                    <td>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </td>
                    <td>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{task.name}</td>
                    <td>{task.priority}</td>
                    <td>{task.dueDate}</td>
                    <td>
                        <button onClick={() => toggleCompletion(index)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                    </td>
                    <td>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </td>
                    <td>
                        <button onClick={handleEdit}>Edit</button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Task;
