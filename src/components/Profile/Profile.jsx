import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {

    const [name, setname] = useState(null)
    const [id, setid] = useState(null)
    
useEffect(function(){
    const x = jwtDecode(localStorage.getItem('tkn'))
    console.log(x);
    setname(x.name)
    setid(x.id)
},[])

  return (
    <div className='container text-center mt-5 py-3'>
        <h1 className='text-center mt-5'> Hello <span className='main-color '> {name}</span>
       </h1>
        <h1 className='text-center my-5'> Your id :  <span className='main-color '> {id}</span></h1>
        <Link className="nav-link text-primary "  to="/AllOrders">get your AllOrders details </Link>

    </div>
  )
}
