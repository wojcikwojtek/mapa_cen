import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Main from "./components/Main";
import AuthPage from "./pages/AuthPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";


const router =createBrowserRouter([
    {
    path:'/',
    element:<Layout/>,
    // errorElement:<ErrorPage/>,
    children:[
     {path:'',element:<Main/>},
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