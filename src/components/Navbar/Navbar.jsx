import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/Auth';
import { WishlistContext } from '../../Context/WishlistContext';
import logo from '../../images/freshcart-logo.svg';
import { CartContext } from './../../Context/CartContext';



export default function Navbar() {

  const { token, setToken } = useContext(authContext)
  const navigate = useNavigate()
  const { numOfCartItems } = useContext(CartContext)
  const { numOfwishlistItems } = useContext(WishlistContext)

  function logout() {
    localStorage.removeItem('tkn')
    setToken(null)
    navigate('/Login')

  }

  return (<>

    <nav className="navbar navbar-expand-lg mb-3 pt-3  fixed-top bg-light text-dark">
      <div className="container d-flex flex-row justify-content-between ">

        <div>
          <Link className="navbar-brand text-white" to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {token ? <>
              <li className="nav-item">
                <Link className="nav-link active  " aria-current="page" to="/Home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active  " aria-current="page" to="/Cart">Cart
                 


                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active  position-relative" aria-current="page" to="/Wishlist">Wishlist
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning ">
                
                    {numOfwishlistItems}
                    <span className="visually-hidden">unread messages</span>
                  </span>


                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/Products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/Categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/Brands">Brands</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to="/AllOrders">AllOrders</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to="/contact">CONTACT Us</Link>
              </li>
            </> : ''}

          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {token ? <>
              <li className="nav-item mx-2">
                <Link className="nav-link active position-relative " aria-current="page" to="/Cart"> <span>
                  <i class="fa-solid fa-cart-shopping   "></i>
                </span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main-color">
                    {numOfCartItems}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>

              </li>

              <li className="nav-item">
                <Link className="nav-link active  " aria-current="page" to="/Profile">Profile</Link>
              </li>

              <li>
                <Link className="nav-link active  " aria-current="page" >
                  <span style={{ cursor: 'pointer' }} className="nav-item  pt-5" onClick={logout} > Log out </span>
                </Link>
              </li>



            </> : <>
              <li className="nav-item">
                <Link className="nav-link active  " aria-current="page" to="/Register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active  " aria-current="page" to="/Login">Log in</Link>
              </li>
            </>}
          </ul>

        </div>



      </div>
    </nav>


  </>

  )
}



