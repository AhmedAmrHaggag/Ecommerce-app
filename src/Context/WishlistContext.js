import axios from "axios";
import { createContext, useEffect, useState } from "react";

     export const WishlistContext= createContext() 
       export function WishlistContextProvider( {children}) {

        // const [wishlistProducts, setwishlistProducts] = useState(null)
        // const [numOfwishlistItems, setnumOfwishlistItems] = useState(0)
    
        const [wishlistProducts, setwishlistProducts] = useState(null)
        const [numOfwishlistItems, setnumOfwishlistItems] = useState(null)


        async function addProductToWishlist(productId) {

            try {
                const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/Wishlist', {
                    "productId": productId
                }, {
                    headers: { token: localStorage.getItem('tkn') }
                })
                
                getUserwishlist()
                // setwishlistProducts(data.data)
                return data;
            } catch (error) {
                console.log( error,"error form  addProductToWishlist  in WishlistContext", error);
            }
    
    
        }
        async function getUserwishlist() {

            try {
                const { data } =  await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
                {headers:{token:localStorage.getItem('tkn')}}
                )
    
                
                setwishlistProducts(data.data)
                setnumOfwishlistItems(data.count)
    
                
                
            } catch (error) {
                console.log(error,"from getUserWishlist in WishlistContext");
            }
                
            }

            async function deleteProduct(productId){
                try {
                    const { data } =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                    {headers:{token:localStorage.getItem('tkn')}}
                    )

                    getUserwishlist()
                     
        
                    return data;
        
                } catch (error) {
                    console.log(error,"error from deleteProduct in WishlistContext");
                }
            }   




            useEffect(function () {
                getUserwishlist()
            },[])
    




            return <WishlistContext.Provider value={{
                addProductToWishlist,
                setnumOfwishlistItems,
                setwishlistProducts,
                deleteProduct,
                numOfwishlistItems,
                wishlistProducts,

            }}>
            
             {children}
            
            </WishlistContext.Provider>

        }
        