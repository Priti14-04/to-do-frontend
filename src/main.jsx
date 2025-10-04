import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./views/Home/Home.jsx"

import { BrowserRouter, Routes, Route } from 'react-router-dom' // ✅ corrected import
import NewTodo from './NewTodio/NewTodo.jsx'
import EditTodo from './EditTodo/EditTodo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
