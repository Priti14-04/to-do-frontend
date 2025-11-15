import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./views/Home/Home.jsx"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewTodo from './views/NewTodo.jsx'
import EditTodo from './views/EditTodo.jsx'


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
