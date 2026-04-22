import React from 'react'
import { useState } from 'react'
import { loginUser } from '../state/auth.slice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const [userIdentifier, setUserIdentifier] = useState('')
    const [password, setPassword] = useState('')
    async function handleSubmit(e) {
        e.preventDefault()
        
        try{
            const loginData = userIdentifier.includes('@') ? { email: userIdentifier, password } : { mobile_no: userIdentifier, password }
            const resultAction = await dispatch(loginUser(loginData)).unwrap()
            toast.success(resultAction.message)
        } catch (error) {
            toast.error(error)

        }
    }
  return (
    <div className='form-container'>
        <img src="https://ik.imagekit.io/p4nbkerbz/Snitch/image.png" className='form-image' />
        <form onSubmit={handleSubmit}>
            <input 
                required 
                type="text" 
                placeholder="Email or Mobile Number" 
                value={userIdentifier}
                onChange={(e) => setUserIdentifier(e.target.value)}
            />
            <input 
                required 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
        <Link to="/register" className='redirect-link'>Don't have an account? Register</Link>
    </div>
  )
}

export default Login
