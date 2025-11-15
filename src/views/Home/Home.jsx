import React, { useEffect } from 'react'
import { useState } from 'react';
import "./Home.css"
import axios from 'axios';
import imgTrash from "../../assets/trash.png"
import imgEdit from "../../assets/edit.png"

import { Link } from "react-router-dom";



function Home() {

  const [todos,setTodos] = useState([]);

const loadTodos = async()=>{
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
  setTodos(response.data.data);

  
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
  };

  const markToDoDone = async(id,isDone)=>{
   

    const response =await axios.patch(
      `${import.meta.env.VITE_API_URL}/todos/${id}/status`,
      {isDone:isDone}
    );

    if(response){
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
            <input type="checkbox"checked={isDone} onChange={(e)=>{
              markToDoDone(id,e.target.checked);
            }}/>


            <div className='todo-icon'>{emoji}</div>
            <div className='todo-detail'>
          <h2 className={isDone ? "todo-done" : ""}>{todoItem}</h2>

             </div> 
            <span className='todo-createdat'>
              {createdAt.replace("T"," ").slice(0,16)}</span>

              <Link to={`/edit/${id}`}>
              <img src={imgEdit} alt="edit" 
             
              className='icon-edit'/>

              </Link>
              
              <img src={imgTrash} alt="Delete" 
              onClick={()=>{
                deleteTodo(id);
              }}  
              className='icon-delete'/>
          </div>
        )
      })}

     <Link to="/new" className='button'>New ToDO</Link>
    </div>
  )
}

export default Home
