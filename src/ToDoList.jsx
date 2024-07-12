import { useEffect } from "react";
import { useState } from "react";

const taskFromLocalStorage = JSON.parse(localStorage.getItem('task') || '[]')

const ToDoList = () => {

    const [tasks, setTasks] = useState(taskFromLocalStorage)
    const [newTask, setNewTask] = useState('')


    useEffect(()=>{
        localStorage.setItem('task', JSON.stringify(tasks))

    },[tasks])
    
    const handleInputTask = (e) =>{
        setNewTask(e.target.value)
    }

    const addTask = () =>{
        if(newTask){
            setTasks(t=> [...t, newTask])
            setNewTask("")
        }
        
    }
    const deleteTask = (index) =>{
        setTasks(t=> t.filter((_, i)=> i !== index))
    }
    const moveTaskUp = (index) => {
        if (index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]
        setTasks(updatedTasks)}
    
      };
      const moveTaskDown = (index) => {
        if (index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]
        setTasks(updatedTasks)}
    
      };

    return ( 
        <div className="to-do-list">
            <div>
                <input type="text" onChange={handleInputTask} placeholder="Enter Task"/>
                <button onClick={addTask} className="add-btn">Add Task</button>
            </div>
            <ol>
                {
                    tasks.map((item, index)=>{
                        return <li key={index}><span className="text">{item}</span><button onClick={()=>deleteTask(index)} className="delete-btn">Delete Task</button><button onClick={()=>moveTaskUp(index)} className="move-btn">⬆️</button><button onClick={()=>moveTaskDown(index)} className="move-btn">⬇️</button></li>
                    })

                }
            </ol>
        </div>
     );
}
 
export default ToDoList;