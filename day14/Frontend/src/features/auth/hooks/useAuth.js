import { useContext } from "react"
import { authContext } from "../auth.context"
import { login, register } from "../services/auth.api"


export const useAuth=()=>{
    const {user,setUser,loading,setLoading}=useContext(authContext)

    const handleLogin=async (username,password)=>{
        setLoading(true)
        const response=await login(username,password)
        setUser(response.user)
        setLoading(false)
    }

    const handleRegister=async (username,email,password)=>{
        setLoading(true)
        const response=await register(username,email,password)
        setUser(response.user)
        setLoading(false)
    }
    return {user,loading,handleLogin,handleRegister}
}