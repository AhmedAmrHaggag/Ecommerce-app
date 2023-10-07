import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Bars, ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import HomeSlider from '../HomeSlider/HomeSlider';
import Categorieslider from '../HomeSlider/CategoriesSlider';



export default function Home() {

  const { addProductToCart, setelementId, elementId } = useContext(CartContext)
  const { wishlistProducts, addProductToWishlist } = useContext(WishlistContext)
  const [loader, setloader] = useState(false)
  const [searchValue, setSearchValue] = useState('');

  async function addProduct(id) {
    setloader(true);
  
    const res = await addProductToCart(id);
    if (res.status === 'success') {
      toast.success('Product added successfully to your cart', {
        position: 'top-right',
        duration: '300',
      });
      setelementId(null); 
    } else {
      toast.error('Error happened, please try again later');
    }
  
    setloader(false);
  }


  async function addFavouriteProduct(id, event) {
    event.stopPropagation(); // Prevent event propagation to parent elements

    const res = await addProductToWishlist(id);
    if (res.status === 'success') {
      toast.success('Product added successfully to your Wishlist', {
        position: 'top-right',
        duration: '300',
      });
      setelementId(id); // Update the selected element ID
    } else {
      toast.error('Error happened, please try again later');
    }
  }


  const { data, isLoading, isFetching } = useQuery('allProducts', getAllProducts)

  console.log(isFetching);

 
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  
  }

 

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



    <div className='container py-5 mt-5 '>

      <div className='row g-0 justify-content-center mb-5'>
        <div className='col-md-3'>
          <HomeSlider />
        </div>
        <div className='col-md-3'>
          <img style={{ width: '100%', height: '200px' }} src={require("../../images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg")} alt="" />
          <img style={{ width: '100%', height: '200px' }} src={require("../../images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg")} alt="" />
        </div>

      </div>

      <div className='mb-5' >
        <Categorieslider />
      </div>



      <input
        id="search"
        type="text"
        placeholder="Search..."
        className="form-control mb-5 w-75 m-auto"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="row g-5">

        {data?.data.data.filter((product) =>
          product.title.toLowerCase().includes(searchValue.toLowerCase())
        ).map(function (product, idx) {
          return <div key={idx} className="col-md-3  ">


            <div className='product position-relative shad p-2'>

              <Link to={`/ProductDetails/${product.id} `}>

                <img className='w-100' src={product.imageCover} alt="product" />
                <h6 className='main-color'> {product.category.name} </h6>
                <h5>{product.title.split(' ').slice(0, 2).join("-")}</h5>

                <div className='d-flex justify-content-between align-items-center'>
                  <p>{product.price} Egp</p>
                  <p> <span> <i className="fa-solid fa-star text-gold">  </i> {product.ratingsAverage} </span>  </p>
                </div>





              </Link>
              <div className="d-flex align-items-center  justify-content-end cursor-pointer " style={{ cursor: 'pointer' }}>

                <i
                  id={`heading-${product.id}`}
                  className={`fa-solid ${elementId === product.id ? 'text-danger' : 'text-black'} fa-heart h3`}
                  onClick={(event) => addFavouriteProduct(product.id, event)}
                ></i>
              </div>
              <button onClick={() => addProduct(product.id)} className='w-75  btn btn-success position-absolute  down' >
                {loader ? <Bars
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                /> : ' + ADD to cart'}
              </button>


            </div>



          </div>
        })}

      </div>



    </div>






  </>

  )
}
