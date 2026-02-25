import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const {loading,handleLogin}=useAuth()

  const navigate=useNavigate()

  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const submitHandler=async (e)=>{
    e.preventDefault()
    await handleLogin(username,password)
    navigate('/')
  }
  if(loading){
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }
  return (
    <main>
      <div className="formContainer">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input
          onChange={(e)=>{
            setusername(e.target.value)
          }} 
          type="text" 
          name="username" 
          id="username" 
          placeholder='Enter username' 
          value={username} />
          <input 
          onChange={(e)=>{
            setpassword(e.target.value)
          }}
          type="password" 
          name="password" 
          id="password"  
          placeholder='Enter password'
          value={password} />
          <button className='button primary-button'>Login</button>
        </form>
        <p>Don't have an account? <Link to={'/register'}>Create one</Link></p>
      </div>
    </main>
  )
}

export default Login
