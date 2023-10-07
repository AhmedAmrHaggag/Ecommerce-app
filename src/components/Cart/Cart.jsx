import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function Cart() {
  const { numOfCartItems, totalCartPrice, cartProducts, deleteProduct, updateCount, emptyCart, getUserCart } = useContext(CartContext);

  if (cartProducts === null) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
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
    );
  } else if (cartProducts.length === 0) {
    return (
      <div className='container py-5' style={{ backgroundColor: "#eee", marginTop: '150px' }}>
        <h2>Cart Shop</h2>
        <h3>Your cart is empty</h3>
        <Link className='text-primary' to='/products'>Get some Products ....</Link>
      </div>
    );
  }
  
  

  async function deleteElement(id) {
    const res = await deleteProduct(id)
    if (res.status === "success") {
      toast.success("Product Removed successfully From your Cart", {
        position: 'top-right',
        duration: '300',
      });
    } else {
      toast.error('Error happened please try again later');
    }
  }

  async function updateElementCount(id, count) {
    const res = await updateCount(id, count)
    if (res.status === "success") {
      toast.success("Count changed successfully", {
        position: 'top-right',
        duration: '300',
      });
    } else {
      toast.error('Error happened please try again later');
    }
  }

  async function deleteCart() {
    await emptyCart();
  }

  return (
    <div className='container pt-5' style={{ backgroundColor: "#eee", marginTop: '150px' }}>
      <div className='d-flex justify-content-between px-4'>
        <h2>Cart Shop</h2>
        <Link to='/CashPayment' className='btn btn-outline-primary p-2'>Check out</Link>
      </div>
      <div className='d-flex justify-content-between p-4'>
        <h5>Total price: <span className='main-color'>{totalCartPrice}</span></h5>
        <h5>Total number of items: <span className='main-color'>{numOfCartItems}</span></h5>
      </div>

      {cartProducts.map(function (product, idx) {
        return (
          <div key={idx} className="row my-4 align-items-center border-bottom border-3 pt-3 p-2">
            <div className='col-sm-1'>
              <img src={product.product.imageCover} className='w-100' alt="" />
            </div>
            <div className='col-sm-9'>
              <h6>Title: {product.tittle}</h6>
              <h6>Price: {product.price}</h6>
              <button onClick={() => deleteElement(product.product.id)} className='btn btn-outline-danger'>Remove</button>
            </div>
            <div className='col-sm-2'>
              <div className='d-flex align-items-center'>
                <button onClick={() => updateElementCount(product.product.id, product.count + 1)} className='btn btn-outline-success'>+</button>
                <span>{product.count}</span>
                <button onClick={() => updateElementCount(product.product.id, product.count - 1)} className='btn btn-outline-success'>-</button>
              </div>
            </div>
          </div>
        );
      })}

      <div onClick={deleteCart} className='text-center my-4 pb-3'>
        <button className='btn btn-outline-success'>Clear your cart</button>
      </div>
    </div>
  );
}
