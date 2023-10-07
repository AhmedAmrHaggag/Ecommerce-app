
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Bars, ColorRing } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'

export default function Wishlist() {

  const { wishlistProducts, addProductToWishlist,setnumOfwishlistItems,
    numOfwishlistItems,deleteProduct,setwishlistProducts } = useContext(WishlistContext)


    const { addProductToCart } = useContext(CartContext)

  const [loader, setloader] = useState(false)

  async function addProduct(id) {

    setloader(true)


    const res = await addProductToCart(id)
    if (res.status === "success") {
      toast.success("Produt added successfully to your cart", {
        position: 'top-right',
        duration: '300',
      }
      
      )
      deleteElement(id)
    } else {
      toast.error('Erro happend please try again later')
    }

    setloader(false)
  }

  
  

  if (wishlistProducts===null) {
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


if (wishlistProducts.length===0) {
  return <>
      <div  className='container py-5  ' style={{backgroundColor:"#eee",marginTop:'150px'}}>
      <h1>My wishlist</h1>
          <h3>your wishlist is empty</h3>
          <Link  className='text-primary' to='/products'  > Get some Products ....</Link>
      </div>
  </>
}




async function deleteElement(id) {
  const res = await deleteProduct(id)  
  if (res.status === "success") {
      toast.success("Produt Removed successfully From your Wishlist  ", {
        position: 'top-right',
        duration: '300',
      }
      )
      setwishlistProducts(wishlistProducts)
      setnumOfwishlistItems(numOfwishlistItems)
    } else {
      toast.error('Error happend please try again later')
    }
  }



  return (<>

    <div className='container pt-5 ' style={{ backgroundColor: "#eee", marginTop: '150px' }}>
      
      <h1>My wishlist</h1>
      <h5 >items number : <span className='main-color'> {numOfwishlistItems} </span>  </h5>
      {wishlistProducts.map(function (product, idx) {
        console.log(product);
        return <div key={idx} className=" row my-4 align-items-center border-bottom border-3 pt-3 p-2">
          <div className='col-sm-1'>
            <img src={product.imageCover} className='w-100' alt="" />
          </div>
          <div className='col-sm-9'>
            <h6>tittle:{product.title}</h6>
            <button onClick={()=>deleteElement(product.id)} className='btn btn-outline-danger'>remove</button>
          </div>
          <div className='col-sm-2'>
            <div className='f-flex align-items-center'>
            <button onClick={() => addProduct(product.id)} className='w-100 p-2 my-2 rounded-3 text-align-center bg-main-color border-white'>
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
      })}

    </div>


  </>

  )
}
