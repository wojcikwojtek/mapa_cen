import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Main from "./components/Main";
import AuthPage from "./pages/AuthPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductDetails from "./components/productDetails/ProductDetails";
import AdminPanel from "./components/AdminPanel";


const router =createBrowserRouter([
    {
    path:'/',
    element:<Layout/>,
    children:[
     {path:'',element:<Main/>},
     {path:'/adminPanel',element:<AdminPanel/>},
     {path:'/productDetail/:productId',element:<ProductDetails/>},
        {path:'auth',
        element:<AuthPage/>,
        children:[
            {path:'login',element:<LoginForm/>},
            {path:'register',element:<RegisterForm/>}
              ]  
         }, 
    ]
    }
]);

export default router;