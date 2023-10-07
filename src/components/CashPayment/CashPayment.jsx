import axios from 'axios'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Bars } from 'react-loader-spinner'
import toast from 'react-hot-toast'

export default function CashPayment() {
    const{cartId,setnumOfCartItems,settotalCartPrice,setcartProducts,getUserCart}  = useContext(CartContext)
    const [loader, setloader] = useState(false)
    const [loader2, setloader2] = useState(false)



    async function confirmCashPayment() {

        setloader(true)

       const DetailsValue =  document.querySelector('#Details').value
       const PhoneValue =  document.querySelector('#Phone').value
       const CityValue =  document.querySelector('#City').value

       const shippingAddress  = {
        
    "shippingAddress":{
        "details": DetailsValue,
        "phone": PhoneValue,
        "city": CityValue,
        }
       }
       
       try {
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, shippingAddress ,{
            headers:{token:localStorage.getItem('tkn')}
            
        })

        if (data.status === "success") {
            toast.success("order  successfully initalized ", {
              position: 'top-right',
              duration: '300',
            }
           
            )

            setcartProducts([])
            setnumOfCartItems(0)
            settotalCartPrice(0)

          } else {
            toast.error('Error happend please try again later')
          }
        
        console.log(data);
       } catch (error) {
        console.log(error, 'error from cashPayment componet by confirmCashPayment function');
        toast.error('add somthing in cart first to order')
       }
       
       setloader(false)
    }

    async function confirmOnlinePayment() {
        setloader2(true)
       const DetailsValue =  document.querySelector('#Details').value
       const PhoneValue =  document.querySelector('#Phone').value
       const CityValue =  document.querySelector('#City').value

       const shippingAddress  = {
        
    "shippingAddress":{
        "details": DetailsValue,
        "phone": PhoneValue,
        "city": CityValue,
        }
       }

       try {
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, shippingAddress ,{
            headers:{token:localStorage.getItem('tkn')},
            params:{url:'http://localhost:3000'}        
        });


        if (data.status === "success") {
            toast.success("order  successfully initalized ")


            getUserCart()

            // setcartProducts([])
            // setnumOfCartItems(0)
            // settotalCartPrice(0)

          } else {
            toast.error('Error happend please try again later')
          }

          setTimeout(() => {
            window.open(data.session.url,'_blank');
          }, 1500);

            
            
        console.log(data);
       } catch (error) {
        console.log(error, 'error from cashPayment componet by confirmOnlinePayment function');
        toast.error('add somthing in cart first to order')
       }
        
       setloader2(false)
    }

    


    return (<>
        <div className='container' style={{  marginTop: '150px' }}>

            <form className='' action="">


                <label  htmlFor="Details">Details : </label>
                <input required type="text" className='form-control mb-3   w-100' id='Details' placeholder='Details' />


                <label htmlFor="Phone">Phone</label>
                <input required type="tel" className='form-control mb-3  w-100' id='Phone' placeholder='Phone' />

                <label htmlFor="City">City : </label>
                <input required type="text" className='form-control mb-3  w-100' id='City' placeholder='City' />

                <button type='button' onClick={confirmCashPayment} className='btn btn-outline-info w-100 text-center my-3'> 
                {loader ? <Bars
                height="30"
                width="30"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> : ' Pay cash on delivery'}
                </button>

                <button type='button' onClick={confirmOnlinePayment} className='btn btn-outline-info w-100 text-center my-3'> 
                {loader2 ? <Bars
                height="30"
                width="30"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /> : ' Pay Now '}
                </button>

            </form>


        </div>


    </>

    )
}
