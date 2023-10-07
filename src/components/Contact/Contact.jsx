

import React from 'react'

export default function Contact() {
  return <>


    <section className="text-center bg-white mt-5 py-5">
      <h2 className="text-black">CONATCT SECTION</h2>
      <div className="container py-5  ">
        <input type="text" placeholder="userName" className="w-50 border border-0  bg-transparent" />
        <hr className="w-50 mx-auto text-black" />


        <input type="text" placeholder="userEmail" className="w-50 border border-0  bg-transparent" />
        <hr className="w-50 mx-auto text-black" />
        <input type="text" placeholder="userPassword" className="w-50 border border-0  bg-transparent" />
        <hr className="w-50 mx-auto text-black" />
        <textarea name="" className="border border-1 w-50" required id="" cols="20" rows="5" placeholder="Message for Me"></textarea> <br />
        <button className="btn btn-success">send Message</button>
      </div>
    </section>



  </>
}

