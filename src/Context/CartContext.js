import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext();


export function CartContextProvider({ children }) {

    const [cartProducts, setcartProducts] = useState(null)
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [cartId, setcartId] = useState(null)
    const [elementId, setelementId] = useState('')



    async function addProductToCart(productId) {

        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                "productId": productId
            }, {
                headers: { token: localStorage.getItem('tkn') }
            })

            getUserCart();

            return data;
        } catch (error) {
            console.log("error form cartContext", error);
        }


    }

    async function getUserCart() {

        try {
            const { data } =  await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            {headers:{token:localStorage.getItem('tkn')}}
            )

            setnumOfCartItems(data.numOfCartItems)
            settotalCartPrice(data.data.totalCartPrice)
            setcartProducts(data.data.products)
            setcartId(data.data._id)

            
            
        } catch (error) {
            console.log(error,"from getUserCArt in context");
        }
            
        }


    async function deleteProduct(productId){
        try {
            const { data } =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {headers:{token:localStorage.getItem('tkn')}}
            )
            setnumOfCartItems(data.numOfCartItems)
            settotalCartPrice(data.data.totalCartPrice)
            setcartProducts(data.data.products)

            return data

        } catch (error) {
            console.log(error,"error from deleteProduct in cart context");
        }
    }   
    
    
    async function updateCount(productId,count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                "count": count
            }, {
                headers: { token: localStorage.getItem('tkn') }
            })

            setnumOfCartItems(data.numOfCartItems)
            settotalCartPrice(data.data.totalCartPrice)
            setcartProducts(data.data.products)

            return data
        } catch (error) {
            console.log(error,"error from updateCount in cart context");
        }
    }

    async function emptyCart(){
        try {
            const { data } =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {headers:{token:localStorage.getItem('tkn')}}
            )
            setnumOfCartItems(0)
            settotalCartPrice(0)
            setcartProducts([])

            return data

        } catch (error) {
            console.log(error,"error from deleteProduct in cart context");
        }
    }   



        useEffect(function () {
            getUserCart()
        },[])


    return <CartContext.Provider value={{ 
        addProductToCart,
        getUserCart,
        deleteProduct,
        updateCount,
        emptyCart,
        setnumOfCartItems,
        settotalCartPrice,
        setcartProducts,
        setelementId,
        cartProducts,
        totalCartPrice,
        numOfCartItems,
        cartId,
        elementId,
        
     }}>

        {children}
    </CartContext.Provider>
}


