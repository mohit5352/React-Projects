// TaskList.js
import React, { useState } from 'react';
import Task from './Task';

function TaskList({ tasks, toggleCompletion, deleteTask, setTasks, editingIndex, setEditingIndex }) {
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
    const [sortBy, setSortBy] = useState('name');

    //Filter Tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    } else {
      return true;
    }
  });

  //Sort Tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'completion') {
      return b.completed - a.completed;
    } else if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1; // Tasks without due dates are placed at the end
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 }; // Define priority order
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });

  return (
    <div className="list-container">
        <select
            value={filter}
            onChange={(e) => {
                setFilter(e.target.value);
            }}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
        </select>

        <select
            value={sortBy}
            onChange={(e) => {
                setSortBy(e.target.value);
            }}>
            <option value="name">Sort by Name</option>
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by dueDate</option>
            <option value="completion">Sort by Completion</option>
        </select>
      <table>
        {/* Table structure */}
        <thead>
            <tr>
                <th>Task Name</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Complete</th>
                <th>Remove</th>
                <th>Edit</th>
            </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              index={index}
              toggleCompletion={() => toggleCompletion(index)}
              deleteTask={() => deleteTask(index)}
              setTasks={setTasks}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              tasks={sortedTasks}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
