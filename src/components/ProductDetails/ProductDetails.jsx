

import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Bars, ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { CartContext } from './../../Context/CartContext'

export default function ProductDetails() {


  const { addProductToCart } = useContext(CartContext)

  const { id } = useParams();
  const [loader, setloader] = useState(false)

  async function addProduct() {

    setloader(true)


    const res = await addProductToCart(id)
    if (res.status === "success") {
      toast.success("Produt added successfully to your cart", {
        position: 'top-right',
        duration: '300',
      }
      )
    } else {
      toast.error('Erro happend please try again later')
    }

    setloader(false)
  }



  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  const { data, isLoading } = useQuery("ProductDetails", getProductDetails)


  if (isLoading) {
    return <div className="vh-100 d-flex justify-content-center align-items-center">
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


  return (<>

    <div className='container mt-5 py-5'>

      <div className="row  align-items-center">
        <div className='col-md-3' >
          <figure>
            <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />

          </figure>


        </div>

        <div className='col-md-9'>
          <div className='details text-center'>
            <h1> {data.data.data.title}  </h1>
            <p className='text-muted'>{data.data.data.description}</p>
            <h5> price : {data.data.data.price}EGP </h5>
      
            <button onClick={() => addProduct(data.data.data._id)} className='w-100 p-2 my-2 rounded-3 text-align-center bg-main-color border-white'>
              {loader ? <Bars
                height="40"
                width="40"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> : ' + ADD to cart'}
              </button>
          </div>


        </div>



      </div>


    </div>



  </>

  )
}
