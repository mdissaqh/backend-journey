import React from 'react'
import { useState } from 'react'
import { registerUser } from '../state/auth.slice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import '../style/auth.scss'

const Register = () => {
    const dispatch = useDispatch()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [password, setPassword] = useState('')
    const [isSeller, setIsSeller] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        try{
            const role = isSeller ? 'seller' : 'buyer'
            const resultAction = await dispatch(registerUser({ fullname: fullName, email, mobile_no: mobileNumber, password, role })).unwrap()
            toast.success(resultAction.message)
        }catch(error){
            toast.error(error)
        }
    }
  return (
    <div className='form-container'>
      <img src="https://ik.imagekit.io/p4nbkerbz/Snitch/image.png" className='form-image' />
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required type="text" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className='checkbox-container'>
          <input type="checkbox" id="sellerCheck" checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)} />
          <label htmlFor="sellerCheck">Register as Seller</label>
        </div>
        <button type="submit">Register</button>
      </form>
        <Link to="/login" className='redirect-link'>Already have an account? Login</Link>
    </div>
  )
}

export default Register