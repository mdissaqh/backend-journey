import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {
  const [capitals,setCapitals]=useState([])
  useEffect(()=>{
    const getData=async ()=>{
      const response=await axios.get("/api/capitals")
      setCapitals(response.data.data)
    }
    getData()
  },[])
  return (
    <div>
      <h1>State capitals</h1>
      <ul>
        {
          capitals.map((stateData,idx)=>{
            return <li key={idx}>State={stateData.state}, Capital={stateData.capital}</li>
          })
        }
      </ul>
    </div>
  )
}

export default App
