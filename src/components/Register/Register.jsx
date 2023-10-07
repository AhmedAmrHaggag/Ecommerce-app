
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate()

  let user = {
    name: '',
    email:'',
    password:'',
    rePassword:'',
    phone:''
}

const [errMsg, seterrMsg] = useState(null)
const [successMsg, setsuccessMsg] = useState(null)
const [isLoading, setisLoading] = useState(false)

async function sendData(values){

  setisLoading(true);

  try {
    const{ data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
      if (data.message === "success") {
        setsuccessMsg("Account has created successfully")
        setTimeout(() => {
          navigate('/Login')
        }, 1000);
        
        
      }
  } catch (error) {
    console.log("error..",error.response.data.message);
    seterrMsg(error.response.data.message)
  }
  setisLoading(false)

}

  const formikObject = useFormik(
    {
      initialValues: user ,
      onSubmit:sendData ,
      validate: function(values){
       seterrMsg(null)
        const errors = {}

        if (values.name.length < 4 || values.name.length > 10 ) {
          errors.name = 'Name must be at from 4 characters t0 10 characters'
        }
        if(values.email.includes('@') ===false||values.email.includes('.') ===false){
              errors.email="Email invalid"
        }
        if (! values.phone.match( /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4}$/)) {
          errors.phone = "Phone invalid"
        }
        if (values.password.length < 6 || values.password.length > 12 ) {
          errors.password = 'password must be at from 6 characters t0 12 characters'
        }
        if (values.rePassword !== values.password ) {
          errors.rePassword =  'password and  rePassword does not match '
        }
         
        return  errors
      }
    }

  )

  

  return (
    <>

    <div className='w-75 m-auto py-3 mt-5'>
      {errMsg? <div className='alert alert-danger'> {errMsg} </div>:""}
      {successMsg?<div className='alert alert-success'> {successMsg}  </div>:""}

      <h2 className=''> Register Now:</h2> 

        <form  onSubmit={formikObject.handleSubmit} className='py-3  ' action="">
            <label htmlFor="name">Name:</label>
            <input onBlur={formikObject.handleBlur} onChange={formikObject.handleChange} value={formikObject.values.name} id='name' type="text" placeholder='name' className='form-control mb-3' />
            {formikObject.errors.name && formikObject.touched.name?  <div className='alert alert-danger'> {formikObject.errors.name} </div> :""}
           

            <label htmlFor="email">Email:</label>
            <input onBlur={formikObject.handleBlur}  onChange={formikObject.handleChange} value={formikObject.values.email} id='email' type="email" placeholder='email' className='form-control mb-3' />
            {formikObject.errors.email  && formikObject.touched.email?  <div className='alert alert-danger'> {formikObject.errors.email} </div> :""}
           
              
   
            <label htmlFor="phone">Phone:</label>
            <input onBlur={formikObject.handleBlur}  onChange={formikObject.handleChange} value={formikObject.values.phone} id='phone' type="tel" placeholder='phone' className='form-control mb-3' />
            {formikObject.errors.phone && formikObject.touched.phone?  <div className='alert alert-danger'> {formikObject.errors.phone} </div> :""}
           
   
            <label htmlFor="password">Password:</label>
            <input onBlur={formikObject.handleBlur}  onChange={formikObject.handleChange} value={formikObject.values.password} id='password' type="password" placeholder='password' className='form-control mb-3' />
            {formikObject.errors.password && formikObject.touched.password?  <div className='alert alert-danger'> {formikObject.errors.password} </div> :""}
           
   
            <label htmlFor="rePassword">Re Password:</label>
            <input onBlur={formikObject.handleBlur}  onChange={formikObject.handleChange} value={formikObject.values.rePassword} id='rePassword' type="password" placeholder='rePassword' className='form-control mb-3' />
            {formikObject.errors.rePassword && formikObject.touched.rePassword?  <div className='alert alert-danger'> {formikObject.errors.rePassword} </div> :""}
           
   
            <button type='submit' disabled={ ! formikObject.isValid || ! formikObject.dirty} className='btn btn-success'> 
            {isLoading? <FallingLines
                  color="#fff"
                  width="30"
                  visible={true}
                  ariaLabel='falling-lines-loading'
            /> :'Register' }
            
            
           
            
            </button>
   
        </form>

    </div>

    


</>
  )
}




