import { useEffect, useRef } from "react";
import { useState } from "react";
import ContentEditable from "react-contenteditable";

const taskFromLocalStorage = JSON.parse(localStorage.getItem("task") || "[]");

const ToDoList = () => {
  const [tasks, setTasks] = useState(taskFromLocalStorage);
  const [newTask, setNewTask] = useState("");
//   const [isEidtable, setIsEditable] = useState(false)


    const undone = useRef(null)
    const done = useRef(null)
    const textRef = useRef(null)

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);


  const handleInputTask = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask) {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  };
  const deleteTask = (index) => {
    setTasks((t) => t.filter((_, i) => i !== index));
  };
  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };
  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };
  const handleChecked = () =>{
        textRef.current.style.textDecoration = 'line-through'
        undone.current.style.display = 'none'
        done.current.style.display = 'block'
        
  }

  return (
    <div className="to-do-list">
        <h1>To-Do List App</h1>
      <div>
        <input
          type="text"
          onChange={handleInputTask}
          placeholder="Enter Task"
        />
        <button onClick={addTask} className="add-btn">
          Add Task
        </button>
      </div>
      <ol>
        {tasks.map((item, index) => {
          return (
            <li key={index}>
              <span contentEditable={true} ref={textRef}  className="text">{item}</span>
              <button onClick={() => deleteTask(index)} className="delete-btn">
                Delete Task
              </button>
              <button onClick={() => moveTaskUp(index)} className="move-btn">
                ⬆️
              </button>
              <button onClick={() => moveTaskDown(index)} className="move-btn">
                ⬇️
              </button>
              <button ref={done}  className="done" style={{display: 'none'}}><i className='bx bx-check'></i></button>
              <button onClick={handleChecked} ref={undone} className="check-btn"><i className='bx bx-checkbox'></i></button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ToDoList;
