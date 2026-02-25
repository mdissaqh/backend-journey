import React from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'


const Login1 = () => {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const {handleLogin,loading}=useAuth()
    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        await handleLogin(username,password)
        navigate('/')
    }

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }

  return (
    <main>
        <div className="formContainer">
            <h1>Log into Instagram</h1>
            <form onSubmit={handleSubmit}>
                <input 
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
                type="text" 
                name="username" 
                id="username" 
                placeholder='Username'
                value={username} />
                <input 
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                type="password" 
                name="password" 
                id="password" 
                placeholder='Password'
                value={password} />
                <button className='primaryButton'>Log in</button>
            </form>
            <p>Don't have an account? <Link to={'/register'}>Create one</Link></p>
        </div>
    </main>
  )
}

export default Login1
