import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./views/Home/Home.jsx"

import { BrowserRouter,Routes,Route } from 'react-router'
import NewTodo from './NewTodio/NewTodo.jsx'



createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/new" element={<NewTodo/>}></Route>
 </Routes>
 </BrowserRouter>
)
