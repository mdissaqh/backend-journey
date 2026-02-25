import React, { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { login, register } from '../services/auth.api'

const useAuth = () => {
    const context=useContext(AuthContext)
    const {user,loading,setuser,setloading}=context
    const handleLogin=async (username,password)=>{
        setloading(true)
        const response=await login(username,password)
        setuser(response.user)
        setloading(false)
    }
    const handleRegister=async (username,email,password)=>{
        setloading(true)
        const response=await register(username,email,password)
        setuser(response.user)
        setloading(false)
    }
  return {
    user,loading,handleLogin,handleRegister
  }
  
}

export default useAuth
