
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './Context/Auth';
import { CartContextProvider } from './Context/CartContext';
import { WishlistContextProvider } from './Context/WishlistContext';
import AllOrders from './components/AllOrders/AllOrders';
import Brands from './components/Brand/Brands';
import Cart from './components/Cart/Cart';
import CashPayment from './components/CashPayment/CashPayment';
import Categories from './components/Categories/Categories';
import Contact from './components/Contact/Contact';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Verifycode from './components/ForgetPassword/Verifycode';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Profile from './components/Profile/Profile';
import Project from './components/Project/Project';
import Register from './components/Register/Register';
import Wishlist from './components/Wishlist/Wishlist';
import ProtectRoute from './components/protect/ProtectRoute';
import NotFound from './components/Not-found/NotFound';








const router = createBrowserRouter ([
  {path:'/',element:  <Project/>,children:[
    {path:'/', element: <ProtectRoute> <Home/> </ProtectRoute>},
    {path:'Home', element: <ProtectRoute> <Home/> </ProtectRoute> },
    {path:'Products',element: <ProtectRoute> < Products /> </ProtectRoute>  },
    {path:'ProductDetails/:id',element: <ProtectRoute> < ProductDetails /> </ProtectRoute>  },
    {path:'Cart',element: <ProtectRoute> < Cart /> </ProtectRoute>  },
    {path:'Wishlist',element: <ProtectRoute> < Wishlist /> </ProtectRoute>  },
    {path:'Profile',element: <ProtectRoute> < Profile /> </ProtectRoute>  },
    {path:'CashPayment',element: <ProtectRoute> < CashPayment /> </ProtectRoute>  },
    {path:'Categories',element: <ProtectRoute> < Categories /> </ProtectRoute>  },
    {path:'Brands',element: <ProtectRoute> < Brands /> </ProtectRoute>  },
    {path:'AllOrders',element: <ProtectRoute> < AllOrders /> </ProtectRoute>  },
    {path:'contact',element: <ProtectRoute>< Contact /> </ProtectRoute>  },

    {path:'Register',element:  < Register /> },
    {path:'Login',element: < Login /> },
    {path:'ForgetPassword',element:  < ForgetPassword /> },
    {path:'Verifycode',element:  < Verifycode /> },
   
  ] },
  
  
  {path:'*',element:  <NotFound/> }
])

function App() {
  let clientQuery = new QueryClient()
  return ( <>
  
    <QueryClientProvider client={clientQuery}>


    <CartContextProvider>

      <WishlistContextProvider>
   
            <AuthProvider>
          <RouterProvider router={router} />
          </AuthProvider>

      </WishlistContextProvider>

    </CartContextProvider>

      

   

    </QueryClientProvider>

    
    <Toaster/>



  </>


    
   

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
