import axios from "axios";

export interface AuthResponse{
  username:string;
  authorized:boolean;
}

export interface ProductsResponse{
  products:Product[];
}

export interface Product{
  productId:number;
  productName:string;
}

export const axiosInstance= axios.create({
  baseURL: "https://localhost:7106",
});

class APIClient{
  //endpoint:string;

  constructor(){
  
  }

  register=(login:string,email:string,password:string)=>{
      return axiosInstance.post("/Auth/register",{username:login,email:email,password:password}).then(res=>res.data);
  }

  login=(login:string,password:string)=>{
    return axiosInstance.post("/Auth/login",{username:login,password:password}).then(res=>res.data);
}

    getProducts=(productName:string)=>{
      return axiosInstance.get<ProductsResponse>("/Product/search/"+productName).then(res=>res.data);
    }
    
    getProductDetail=(productId:number)=>{
      return axiosInstance.get<AuthResponse>("/ProductDetail/products/"+productId).then(res=>res.data);
    }

  // get=(id: number | string)=>{
  //   return axiosInstance.get<T>(this.endpoint+'/'+id).then(res=>res.data);
  // }

  
  
}

export default APIClient;
