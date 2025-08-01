import { useState } from 'react'
import './css/App.css'
import Moviecard from './components/Moviecard'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Favorites from './pages/favorites'
import Navbar from './components/Navbar'

function App() {
  

  return (
    <div>
      <Navbar />
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/favorites' element={<Favorites />}/>
      </Routes>
    </main>
    </div>
  )
}

export default App
