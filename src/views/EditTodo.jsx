import React, { useEffect, useState } from 'react'
import axios from 'axios';

import "./EditTodo.css";

import { useParams } from 'react-router';
import EmojiPicker from 'emoji-picker-react';

function EditTodo() {

    const {id} =useParams();

  const[todoData,setTodoData]=useState(
    {
   
    todoItem:"",
    priority:"low",
    emoji:"✍️",
    isDone:false,
    
}
  );

  const loadTodo = async(id)=>{
    if(!id) return;

    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/todos/${id}`
    );

    const todoDetail = response.data.data;
    setTodoData({
        todoItem:todoDetail.todoItem,
        priority:todoDetail.priority,
        emoji:todoDetail.emoji,
        isDone:todoDetail.isDone,
    })
  }

  useEffect(() => {
    loadTodo(id);
  }, [id])

  const[emojiPickerOpen,setEmojiPickerOpen]=useState(false);

  const updateTodo=async()=>{
    const response=await axios.put(`${import.meta.env.VITE_API_URL}/todos/${id}`,todoData);

    if(response.data.message){
      alert(response.data.message);

      setTimeout(()=>{
        window.location.href="/";
        
      },2000)
    }
  }


  return (
    <div>
     <div className='new-todo-form'>
       <h1>Editing ToDo : {id}</h1>
       
      <input
       type="text"
       value={todoData.todoItem} 
       onChange={(e)=>{
        setTodoData({...todoData,todoItem:e.target.value

        })
       }}/>

       <select 
       value={todoData.priority}
       onChange={(e)=>{
        setTodoData({
          ...todoData,
          priority:e.target.value,
        });
       }}> 
        <option value="low">low Priority</option>
        <option value="medium">medium Priority</option>
        <option value="high">high Priority</option>
       </select>

       <span onClick={()=>{
        setEmojiPickerOpen(!emojiPickerOpen);

       }} className='emoji-button'>
        Emoji: {todoData.emoji}
       </span>

       
      

           <EmojiPicker onEmojiClick={({emoji})=>{

            setTodoData({
              ...todoData,
              emoji:emoji,
            });

            setEmojiPickerOpen(false);
           }}

           open={emojiPickerOpen}
           
           />

           <button onClick={updateTodo}  className='update-button'>Update ToDo</button>
            </div>
    </div>
  )
}

export default EditTodo
