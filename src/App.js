import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddProfile from './pages/AddProfile'
import EditProfile from './pages/EditProfile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/addprofile' element = {<AddProfile />} />
        <Route path='/edit/:id' element = {<EditProfile />} />
      </Routes>
    </div>
  )
}

export default App