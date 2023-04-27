import React, { useState, } from 'react'
import Header from "./Components/Header"
import Modal from "./Components/Modal"
import Input from "./Components/Input"
import './App.css'

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [name, setName] = useState("");

  return (
    <div className='container'>
      <Header />
      <Modal
        show={openModal}
        title="Add User"
        message="Adds a new user to the database"
      />
      <Input
        label="Name"
        value={name}
        change={(e) => setName(e.target.value)}
        invalid={isEmpty}
      />
    </div>
  )
}
export default App
