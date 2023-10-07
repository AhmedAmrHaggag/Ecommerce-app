import axios from 'axios'
import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Categories() {

     function getCategories(){
        return  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const {data,isLoading} = useQuery('Categories',getCategories)


    if (isLoading) {
        return  <div className="vh-100 d-flex justify-content-center align-items-center">
        <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
        </div>
       }

  return  <>
    
    <div className='container pt-5 ' style={{  marginTop: '150px' }}>

            <div className='row g-4'>

            {data?.data.data.map(function(product,idx ) { return   <div key={idx} className='col-md-4'>
           
                    <div className='border rounded shad'>
                        <img className='w-100' style={{width:'100%',height:'300px'}} src={product.image} alt="" />
                        <div className='border '>
                            <h1>{product.name}</h1>
                        </div>
                    </div>
                </div>

          

        })}

            </div>

    </div>
  
  </>
}
