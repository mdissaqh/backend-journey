import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  const [Title,setTitle]=useState("")
  const[Description,setDescription]=useState("")
  const [Notes,setNotes]= useState([])
  const [Editid,setEditid]=useState(null)
  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    const {notes}=res.data
    setNotes(notes)
  })
  }
  function submithandler(e){
    e.preventDefault()
    if(Editid){
      axios.patch("http://localhost:3000/api/notes/"+Editid,{
        description:Description
      })
      .then((res)=>{
      console.log(res.data)
      fetchNotes()
      alert("Description updated successfully")
      setEditid(null)
    })
    }
    else{
      axios.post("http://localhost:3000/api/notes",{
      title:Title,
      description:Description
    })
    .then((res)=>{
      console.log(res)
      fetchNotes()
    })
    }
    setTitle("")
    setDescription("")
  }
  function deletefn(id){
    axios.delete("http://localhost:3000/api/notes/"+id)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }
  useEffect(()=>{
    fetchNotes()
  },[])
  return (
    <div>
      <form onSubmit={(e)=>{
        submithandler(e)
      }}>
        <input type="text" placeholder='Title' value={Title} onChange={(e)=>{
          setTitle(e.target.value)
        }} />
        <input type="text" className='desc' placeholder='Description' value={Description} onChange={(e)=>{
          setDescription(e.target.value)
        }} />
        <button className='submit'>Submit</button>
      </form>
      <div className='cards'>
        {
        Notes.map((note,idx)=>{
          return (
            <div key={idx} className='card'>
              <h1>{note.title}</h1>
              <h1>{note.description}</h1>
              <button id='delete'onClick={()=>{
                deletefn(note._id)
              }}>Delete</button>
              <button id='edit' onClick={()=>{
                setEditid(note._id)
                alert("Editing mode active: Please write the description in the form and submit it to Update Description.")
              }}>Edit</button>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default App
