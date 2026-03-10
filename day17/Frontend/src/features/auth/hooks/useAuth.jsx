import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../auth.context'
import { getme, login, logout, register } from '../services/auth.api'



const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleLogin({ username, email, password }) {
        setLoading(true)
        const data = await login(username, email, password)
        setUser(data.user)
        setLoading(false)
    }
    async function handleRegister({ username, email, password }) {
        setLoading(true)
        const data = await register(username, email, password)
        setUser(data.user)
        setLoading(false)
    }
    async function handleGetMe() {
        setLoading(true)
        try {
            const data = await getme()
            setUser(data.user)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }

    }
    async function handleLogOut() {
        setLoading(true)
        await logout()
        setUser(null)
        setLoading(false)
    }
    useEffect(() => {
        handleGetMe()
    }, [])
    return { loading, user, handleLogin, handleRegister, handleGetMe, handleLogOut }
}


export default useAuth
