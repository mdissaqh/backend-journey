import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../styles/register.scss'
import useAuth from '../hooks/useAuth'

const Register = () => {
    
    const {handleRegister}=useAuth()

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate=useNavigate()

    async function submitHandler(e){
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }
  return (
        <main>
            <div className="registerFormContainer">
                <div className="top">
                    <h1>Create Your Account</h1>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <p>Username</p>
                        <input 
                        onChange={(e)=>{
                            setUsername(e.target.value)
                        }}
                        type="text" value={username} id="username" placeholder='Enter Username' />
                    </div>
                    <div className="form-group">
                        <p>Email</p>
                        <input 
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                        type="email" value={email} id="email" placeholder='Enter your Email' />
                    </div>
                    <div className="form-group">
                        <p>Password</p>
                        <input 
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        type="password" value={password} id="password" placeholder='........' />
                    </div>
                    <button className='primary-button'>SIGN UP</button>
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </main>
    )
}

export default Register
