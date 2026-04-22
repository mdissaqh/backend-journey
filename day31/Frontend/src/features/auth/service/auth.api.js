import axios from 'axios'

const authApi=axios.create({
    baseURL:"http://localhost:3000/api/auth"
})

export async function register(userData) {
    const response=await authApi.post("/register",userData)
    console.log(response)
    return response.data
}

export async function login(credentials) {
    const response=await authApi.post("/login",credentials)
    return response.data
}