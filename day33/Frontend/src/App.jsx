import React from 'react'
import { router } from './app.routes'
import { RouterProvider } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUser } from './features/auth/state/auth.slice'

const App = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getCurrentUser())
  }, [dispatch])
  return (
    <RouterProvider router={router} />
  )
}

export default App