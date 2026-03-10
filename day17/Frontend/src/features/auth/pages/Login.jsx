import React, { useState } from 'react'
import '../styles/login.scss'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const Login = () => {
    const {handleLogin}=useAuth()

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const navigate=useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({username,email:username,password})
        navigate('/')
    }
    return (
        <main>
            <div className="loginFormContainer">
                <div className="top">
                    <h1>Welcome Back!</h1>
                    <p>Log in to your account to continue</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <p>Email or Username</p>
                        <input 
                        onChange={(e)=>{
                            setUsername(e.target.value)
                        }}
                        type="text" value={username} id="emailOrUsername" placeholder='Enter your Email or Username' />
                    </div>
                    <div className="form-group">
                        <p>Password</p>
                        <input
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }} 
                        type="password" value={password} id="password" placeholder='........' />
                    </div>
                    <button className='primary-button'>LOG IN</button>
                </form>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </main>
    )
}

export default Login
