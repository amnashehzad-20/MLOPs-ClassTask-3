
import React, { useState, useEffect } from "react";
import "./style.css";

const API_URL = "http://localhost:5000/tasks";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTasks(data);
    };

    const addTask = async () => {
        if (taskTitle.trim()) {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: taskTitle }),
            });
            setTaskTitle("");
            fetchTasks();
        }
    };

    const toggleComplete = async (id) => {
        await fetch(`${API_URL}/${id}/complete`, { method: "PUT" });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchTasks();
    };

    const startPomodoro = () => {
        if (isRunning) return;
        setIsRunning(true);
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    alert(isBreak ? "Break's over!" : "Time's up!");
                    setIsBreak(!isBreak);
                    return isBreak ? 25 * 60 : 5 * 60;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="container">
            <h1>Pomodoro To-Do List</h1>

            <div className="pomodoro">
                <h2>{isBreak ? "Break Time" : "Work Time"}</h2>
                <div>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</div>
                <button onClick={startPomodoro}>Start</button>
            </div>

            <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
            <button onClick={addTask}>Add Task</button>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={task.completed ? "completed" : ""}>
                        {task.title}
                        <button onClick={() => toggleComplete(task.id)}>✔</button>
                        <button onClick={() => deleteTask(task.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
