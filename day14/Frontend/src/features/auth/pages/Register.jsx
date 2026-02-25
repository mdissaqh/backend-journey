import React from 'react'
import {Link, useNavigate} from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Register = () => {
    const {handleRegister,loading}=useAuth()
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()

    const submitHandler=async (e)=>{
        e.preventDefault()
        await handleRegister(username,email,password)
        navigate('/')
    }

    if(loading){
        return <h1>Loading...</h1>
    }

  return (
    <main>
        <div className="formContainer">
            <h1>Register in Instagram</h1>
            <form onSubmit={submitHandler}>
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
                    setEmail(e.target.value)
                }}
                type="email" 
                name="email" 
                id="email" 
                placeholder='Email'
                value={email} />
                <input 
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                type="password" 
                name="password" 
                id="password" 
                placeholder='Password'
                value={password} />
                <button className='primaryButton'>Register</button>
            </form>
            <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
        </div>
    </main>
  )
}

export default Register
