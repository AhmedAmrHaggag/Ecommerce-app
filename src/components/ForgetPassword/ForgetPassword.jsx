import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { FallingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/Auth'

export default function ForgetPassword() {

  const navigate = useNavigate()
   const {setToken} = useContext(authContext)
  let user = {
    
    email:'',
    
}

const [errMsg, seterrMsg] = useState(null)
const [successMsg, setsuccessMsg] = useState(null)
const [isLoading, setisLoading] = useState(false)

async function sendData(values){

  setisLoading(true);

  try {
    const{ data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
      if (data.statusMsg === "success") {
        toast.success(data.message)
       

        setTimeout(() => {
          navigate('/Verifycode')
        }, 1000);
        
        
      }
  } catch (error) {
    console.log("error..",error.response.data.message);
    seterrMsg(error.response.data.message)
    console.log(values);
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
       
        
         
        return  errors
      }
    }

  )

  

  return (
    <>

    <div className='w-75 m-auto py-3 mt-5'>
      {errMsg? <div className='alert alert-danger'> {errMsg} </div>:""}
      {successMsg?<div className='alert alert-success'> {successMsg}  </div>:""}

      <h1 className='mt-5'>please enter your verification code</h1> 

        <form  onSubmit={formikObject.handleSubmit} className='py-3  ' action="">
          

            
            <input onBlur={formikObject.handleBlur}  onChange={formikObject.handleChange} value={formikObject.values.email} id='email' type="email" placeholder='email' className='form-control mb-3' />
            {formikObject.errors.email  && formikObject.touched.email?  <div className='alert alert-danger'> {formikObject.errors.email} </div> :""}
           
   
            
            
   
            <button type='submit' disabled={ ! formikObject.isValid || ! formikObject.dirty} className='btn btn-success'> 
            {isLoading? <FallingLines
                  color="#fff"
                  width="30"
                  visible={true}
                  ariaLabel='falling-lines-loading'
            /> :'verfiy' }
            
            
           
            
            </button>
   
        </form>

    </div>

    


</>
  )
}