import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default class Project extends Component {
  render() {
    return ( <>
    
    <Navbar/>
    <div>
        <Outlet/>
    </div>
    
    
    </>
    
    )
  }
}
