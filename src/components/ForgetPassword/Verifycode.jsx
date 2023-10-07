import axios, { Axios } from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/Auth'
import toast from 'react-hot-toast'

export default function Verifycode() {

  const navigate = useNavigate()
   const {setToken} = useContext(authContext)
  let user = {
    
    password:''
    
}

const [errMsg, seterrMsg] = useState(null)
const [successMsg, setsuccessMsg] = useState(null)
const [isLoading, setisLoading] = useState(false)

async function sendData(values) {
    setisLoading(true);
  
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
  
      console.log("Response:", response);
  
      if (response.data && response.data.message === "success") {
        toast.success(response.data.message);
        setsuccessMsg("good");
       
      }
    } catch (error) {
      console.log("Error:", error); 
      seterrMsg(error.response?.data?.message || "An error occurred");
    }
  
    setisLoading(false);
  }

  const formikObject = useFormik(
    {
      initialValues: user ,
      onSubmit:sendData ,
      validate: function(values){
       seterrMsg(null)
        const errors = {}

        
      
       
        if (values.password.length < 5 || values.password.length > 12 ) {
          errors.password = 'resect code must be at from 5 characters t0 12 characters'
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

      <h2 className=''> reset your account password</h2> 

        <form  onSubmit={formikObject.handleSubmit} className='py-3  ' action="">
          
            
            <input onBlur={formikObject.handleBlur}  onChange={formikObject.handleChange} value={formikObject.values.password} id='password' type="text" placeholder='code' className='form-control mb-3' />
            {formikObject.errors.password && formikObject.touched.password?  <div className='alert alert-danger'> {formikObject.errors.password} </div> :""}
           
   
            <div className='d-flex justify-content-between p-4 '>

          


            <button type='submit' disabled={ ! formikObject.isValid || ! formikObject.dirty} className='btn btn-success'> 
            {isLoading? <FallingLines
                  color="#fff"
                  width="30"
                  visible={true}
                  ariaLabel='falling-lines-loading'
            /> :'verfiy' }
            
            
           
            
            </button>

            </div>
   
           
   
        </form>

    </div>

    


</>
  )
}
