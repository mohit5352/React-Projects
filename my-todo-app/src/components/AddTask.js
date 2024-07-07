// Input.js
import React, { useState } from 'react';
import axios from 'axios';

function AddTask({ addTask, tasks }) {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  //Add Task
  const handleAddTask = () => {
    if (task.trim()) {
    //   addTask(task, dueDate, priority);
    addTaskAPI();
      setTask('');
      setDueDate('');
      setPriority('');
    }
  };

  // Function to make POST request to API
  const addTaskAPI = async () => {
    try {
      const id = Math.floor(100 + Math.random() * 900);
      const response = await axios.post('http://localhost:5000/tasks', {
        id: id,
        task: task,
        completed: false,
        dueDate: dueDate,
        priority: priority,
      });
      // Call addTask() to update the task list after successful addition
      const respData = response.data
      addTask(respData.task, respData.dueDate, respData.priority, id); // Assuming response.data contains the added task
      console.log(response.data); // Optional: Handle response data
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="input-container">
      <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     addTask();
          //   }
          // }}
          placeholder='Enter task name...'
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Set priority"
        >
          <option>...</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default AddTask;
