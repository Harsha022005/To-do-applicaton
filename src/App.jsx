import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import Calendarstreak from "./calendar";
function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);

 useEffect(()=>{
   const today=new Date().toDateString();
   if (lastCompletedDate && lastCompletedDate!=today)
   {
     const yesterday=new Date();
     yesterday.setDate(yesterday.getDate()-1);
     if(lastCompletedDate==yesterday.toDateString()){
        setStreak((presteak)=>presteak+1);

     }
     else{
      setStreak(0);
     }
   }
 })


  function handleInputText(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }

  function markTaskCompleted(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) return { ...task, completed: !task.completed };
      return task;
    });
    setTasks(updatedTasks);

    // Update streak if all tasks for the day are marked completed
    if (updatedTasks.every((task) => task.completed)) {
      const today = new Date().toDateString();
      setLastCompletedDate(today);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="py-6">
        <h1 className="text-4xl font-bold text-white bg-yellow-500 px-6 py-3 rounded-lg shadow-md">
          Today-goals
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Current Streak: <span className="text-yellow-500 font-semibold">{streak} days</span>
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full mt-6 px-4 py-3 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Enter your task"
          onChange={handleInputText}
          value={newTask}
          className="flex-1 h-12 bg-gray-50 text-lg px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          onClick={addTask}
        >
          <IoAddOutline />
        </button>
      </div>
      <div className="mt-8 w-full max-w-4xl mx-auto">
        {tasks.length === 0 ? (
          <p className="text-xl text-center text-gray-500">No tasks added yet</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`bg-white shadow-lg rounded-lg px-4 py-3 flex flex-col justify-between space-y-2 w-64 break-words ${
                  task.completed ? "bg-green-100" : ""
                }`}
              >
                <p className="text-lg text-gray-800">{task.text}</p>
                <div className="flex justify-between">
                  <button
                    className={`px-3 py-1 rounded-md ${
                      task.completed
                        ? "bg-gray-400 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    onClick={() => markTaskCompleted(index)}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    onClick={() => deleteTask(index)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Calendarstreak  />
    </div>
  );
}

export default App;
