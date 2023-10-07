import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'

export default function AllOrders() {

    const [userOrders, setuserOrders] = useState(null)


    useEffect(() => {
        const res = jwtDecode(localStorage.getItem('tkn'))

        getUserOrders(res.id)
    }, [])

    async function getUserOrders(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            setuserOrders(data)
        } catch (error) {
            console.log(error, 'All orders');
        }
    }

    if (userOrders === null) {
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

    return <>


        <div className='container' style={{ marginTop: '150px' }}>

            <div className='row g-3'>

                {userOrders.map(function (order, idx) {
                    return <div key={idx} className="col-md-6">

                        <div className='order bg-black text-white  rounded-4 p-3'>

                            <div className='container'>

                                <div className="row">

                                {order.cartItems?.map(function (item, index) {
                                return <>

                                    <div key={index} className='col-sm-4'>

                                        <div className='bg-secondary text-white my-1'>

                                            <img className='w-100' src={item.product.imageCover} alt="" />
                                            <p> tittle: {item.product.title.split(' ').slice(0,2).join(' ')} </p>
                                            <h5> count :{item.count} </h5>
                                            <h5> price :{item.price} </h5>
                                        </div>


                                    </div>

                                </>
                            })}

                                </div>


                            </div>
                            


                            <p>order sent to user with phone {order.shippingAddress.phone}
                                and with details {order.shippingAddress.details} at {order.shippingAddress.city}
                            </p>

                            <h5> payment method : {order.paymentMethodType}</h5>
                            <h5> Total Price: {order.totalOrderPrice}</h5>



                        </div>
                    </div>


                })}





            </div>



        </div>





    </>


}
