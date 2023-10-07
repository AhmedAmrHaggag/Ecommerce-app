import React from 'react'
import Navbar from '../Navbar/Navbar'

export default function NotFound() {
    return <>
        <Navbar />
        <div className='container' style={{ marginTop: '150px' }}>
            <h1> Unexpected Application Error! 404 Not Found ...</h1>
            <h2> you can try another section ...</h2>
        </div>


    </>
}
