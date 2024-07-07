import './App.default.css';
// import './App.dark.css';
import React, { useState, useEffect } from 'react';
import Snackbar from './snackbar/Snackbar';

function App() {

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const [sortBy, setSortBy] = useState('name');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    // Load the selected theme from localStorage when the app loads
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Dynamically import theme-specific CSS file based on the selected theme
    if (theme === 'dark') {
      import('./App.dark.css').then(() => {
        console.log('Dark theme loaded');
      });
    }
  }, [theme]);

  const toggleTheme = (selectedTheme) => {
    // Update the selected theme in state and localStorage
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  //Add Task
  const addTask = () => {
    if (task.trim()) {

      const isDuplicate = tasks.some(t => t.name.toLowerCase() === task.toLowerCase());
      if (isDuplicate) {
        setShowSnackbar(true);
        return; // Do not add the task if it's a duplicate
      }
      const newTask = { 
        name: task, 
        completed: false, 
        dueDate: dueDate ? new Date(dueDate).toLocaleDateString() : null,
        priority: priority || null
      };
      setTasks([...tasks, newTask]);
      setTask('');
      setDueDate('');
      setPriority('');
    }
  };

  //Delete Task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  //Complete Task
  const toggleCompletion = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

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

  //Local Storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  

  return (
    

    <div className={`app-container ${theme}-theme`}>
      <div><h1>My To-Do List</h1></div>
      <div className='theme-buttons'>
        <button onClick={() => toggleTheme('default')}>Default Theme</button>
        <button onClick={() => toggleTheme('dark')}>Dark Theme</button>
      </div>
      <div className="input-container">
        {/* Input and Add Button */}
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
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="list-container">
        {/* Task List */}
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
              <tr key={index} className={task.completed ? 'completed' : ''}>
                {/* <td>{task.name}</td> */}
                {editingIndex === index ? (
                  <td>
                    <input
                      type="text"
                      value={task.name}
                      onChange={(e) => {
                        const newTasks = [...tasks];
                        newTasks[index].name = e.target.value;
                        setTasks(newTasks);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setEditingIndex(-1); // Finish editing
                        }
                      }}
                      onBlur={() => setEditingIndex(-1)}
                      autoFocus
                    />
                  </td>
                ) : (
                  <td>{task.name}</td> 
                )}
                <td>{task.priority}</td>
                <td>{task.dueDate}</td>
                <td>
                  <button onClick={() => toggleCompletion(index)}>
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteTask(index)}>
                    Remove
                  </button>
                </td>
                <td>
                  <button onClick={() => setEditingIndex(index)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showSnackbar && (
        <Snackbar 
          message="Duplicate task found" 
          onClose={() => setShowSnackbar(false)} 
        />
      )}
    </div>

  );
}

export default App;
