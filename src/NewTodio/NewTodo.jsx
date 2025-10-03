import React, { useState } from 'react'
import axios from 'axios';

import "./NewTodo.css"
import EmojiPicker from 'emoji-picker-react';

function NewTodo() {

  const[todoData,setTodoData]=useState(
    {
   
    todoItem:"",
    priority:"low",
    emoji:"✈️"
    
}
  )

  const[emojiPickerOpen,setEmojiPickerOpen]=useState(false);

  const addTodo=async()=>{
    const response=await axios.post(`http://localhost:8080/todos`,todoData);

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
       <h1>New ToDo</h1>
       
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
        <option value="mediun">medium Priority</option>
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

           <button onClick={addTodo}>Add ToDo</button>
            </div>
    </div>
  )
}

export default NewTodo
