import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/Auth'

export default function Login() {

  const navigate = useNavigate()
   const {setToken} = useContext(authContext)
  let user = {
    
    email:'',
    password:''
    
}

const [errMsg, seterrMsg] = useState(null)
const [successMsg, setsuccessMsg] = useState(null)
const [isLoading, setisLoading] = useState(false)

async function sendData(values){

  setisLoading(true);

  try {
    const{ data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
      if (data.message === "success") {
        setsuccessMsg("Welcome Back")
        localStorage.setItem('tkn',data.token)
        setToken(data.token)

        setTimeout(() => {
          navigate('/')
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

        
        if(values.email.includes('@') ===false||values.email.includes('.') ===false){
              errors.email="Email invalid"
        }
       
        if (values.password.length < 6 || values.password.length > 12 ) {
          errors.password = 'password must be at from 6 characters t0 12 characters'
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

      <h2 className=''> Login Now:</h2> 

        <form  onSubmit={formikObject.handleSubmit} className='py-3  ' action="">
          

            <label htmlFor="email">Email:</label>
            <input onBlur={formikObject.handleBlur}  onChange={formikObject.handleChange} value={formikObject.values.email} id='email' type="email" placeholder='email' className='form-control mb-3' />
            {formikObject.errors.email  && formikObject.touched.email?  <div className='alert alert-danger'> {formikObject.errors.email} </div> :""}
           
   
            <label htmlFor="password">Password:</label>
            <input onBlur={formikObject.handleBlur}  onChange={formikObject.handleChange} value={formikObject.values.password} id='password' type="password" placeholder='password' className='form-control mb-3' />
            {formikObject.errors.password && formikObject.touched.password?  <div className='alert alert-danger'> {formikObject.errors.password} </div> :""}
           
   
            <div className='d-flex justify-content-between p-4 '>

           <Link to='/ForgetPassword'>forget your password ?</Link>


            <button type='submit' disabled={ ! formikObject.isValid || ! formikObject.dirty} className='btn btn-success'> 
            {isLoading? <FallingLines
                  color="#fff"
                  width="30"
                  visible={true}
                  ariaLabel='falling-lines-loading'
            /> :'Login' }
            
            
           
            
            </button>

            </div>
   
           
   
        </form>

    </div>

    


</>
  )
}


