import React, { useState, useEffect} from 'react';
import Snackbar from "../snackbar/Snackbar";
import AddTask from "./AddTask";
import Header from "./Header";
import TaskList from "./TaskList";
import '../App.default.css';
import axios from 'axios';

function ToDoApp ({ handleLogout }) {
    const [theme, setTheme] = useState('default');
    const [tasks, setTasks] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);

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
        import('../App.dark.css').then(() => {
            console.log('Dark theme loaded');
        });
        }
    }, [theme]);

    useEffect(() => {
        // Fetch tasks from API when component mounts
        axios.get('http://localhost:5000/tasks')
            .then(response => {
                const respData = response.data;
                let newTask = []
                respData.forEach((item) => {
                    newTask.push({ 
                        id: item.id,
                        name: item.task, 
                        completed: item.completed, 
                        dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString() : null,
                        priority: item.priority || null
                    });
                });
                setTasks(newTask); 
                console.log("resp", respData)
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []); // Empty dependency array to fetch tasks only once when component mounts


    const toggleTheme = (selectedTheme) => {
        // Update the selected theme in state and localStorage
        setTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    };

    // Add Task
    const addTask = (taskName, dueDate, priority, id) => {
        if (taskName.trim()) {
        const isDuplicate = tasks.some(t => t.name.toLowerCase() === taskName.toLowerCase());
        if (isDuplicate) {
            setShowSnackbar(true);
            return; // Do not add the task if it's a duplicate
        }
        const newTask = { 
            id: id,
            name: taskName, 
            completed: false, 
            dueDate: dueDate ? new Date(dueDate).toLocaleDateString() : null,
            priority: priority || null
        };
        setTasks([...tasks, newTask]);
        }
    };

    //Delete Task
    const deleteTask = (index) => {
        // Extract the id of the task to be deleted
        console.log("tasks", tasks, index)
        const taskId = tasks[index].id;
        // const newTasks = tasks.filter((_, i) => i !== index);
        // setTasks(newTasks);
        axios.delete(`http://localhost:5000/tasks/${taskId}`)
        .then(response => {
            // If the delete request is successful, update the tasks state by removing the deleted task
            const updatedTasks = tasks.filter((task, i) => i !== index);
            setTasks(updatedTasks);
            console.log('Task deleted successfully:', response.data);
            if (updatedTasks.length === 0) {
                setTasks([]);
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
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

    return (
        <div className={`app-container ${theme}-theme`}>
          <Header toggleTheme={toggleTheme} handleLogout={handleLogout} />
          <AddTask addTask={addTask} tasks={tasks} />
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleCompletion={toggleCompletion}
            setTasks={setTasks}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
          />
          {showSnackbar && (
            <Snackbar
              message="Duplicate task found"
              onClose={() => setShowSnackbar(false)}
            />
          )}
        </div>
      );

}

export default ToDoApp;