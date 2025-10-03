import React, { useEffect } from 'react'
import { useState } from 'react';
import "./Home.css"
import axios from 'axios';

import { Link } from "react-router-dom";



function Home() {

  const [todos,setTodos] = useState([]);

const loadTodos = async()=>{
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
  setTodos(response.data.data);

  console.log(response.data.data);
}


  useEffect(()=>{
    loadTodos();
  },[]);


  const deleteTodo = async(id)=>{
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);

    if(response){
      alert(response.data.message);
      loadTodos();
    }
  }

  return (
    <div>
      <h1>React ToDo</h1>
      {todos.map((todoObj)=>{

        const {id,todoItem,priority,emoji,isDone,createdAt}=todoObj;
        return(
          <div key={id} className='todo-card'>
            <span className="todo-priority">{priority}</span>
            <div className='todo-icon'>{emoji}</div>
            <div className='todo-detail'>
          <h2 className={isDone ? "todo-done" : ""}>{todoItem}</h2>

             </div> 
            <span className='todo-createdat'>
              {createdAt.replace("T"," ").slice(0,16)}</span>

              <button onClick={()=>{
                deleteTodo(id);
              }}>Delete</button>
          </div>
        )
      })}

     <Link to="/new" className='button'>New ToDO</Link>
    </div>
  )
}

export default Home
