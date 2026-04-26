import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const SellerProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth)
    if (loading) {
        return <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>;
    }
    if(!user){
        return <Navigate to="/login" />
    }
    if(user.role !== "seller"){
        return <Navigate to="/" />
    }
  return children
}

export default SellerProtectedRoute
