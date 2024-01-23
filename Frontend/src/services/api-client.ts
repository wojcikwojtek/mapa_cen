import axios from "axios";
import { Product } from "../entities/product";
import { ProductDetails } from "../entities/productDetails";
import { Price } from "../entities/price";

export interface AuthResponse{
  username:string;
  authorized:boolean;
}

export interface ProductsResponse{
  products:Product[];
}

export interface RegionResponse{
  id:number;
  name:string;
}
export interface ProductsResponse{
  products:Product[];
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
      return axiosInstance.get<ProductDetails>("/ProductDetail/products/"+productId).then(res=>res.data);
    }

    updateOpinionForPrice=(userId: number,priceId:number,isPositive:boolean)=>{
      return axiosInstance.post("/Product/updateRating",{userId:userId,priceId:priceId,positive:isPositive}).then(res=>res.data);
  }

    getProvinces=()=>{
      return axiosInstance.get<RegionResponse[]>("/Region/region").then(res=>res.data);
    }

    getPowiat=(provinceId:number)=>{
      return axiosInstance.get<RegionResponse[]>("/Region/region/"+provinceId).then(res=>res.data);
    }

    getPricesForRegion(productId:number,regionId:number){
      const params={
        productId:productId,
        regionId:regionId,
      }
      return axiosInstance.get<Price[]>("/ProductDetail/prices/",{params}).then(res=>res.data);
    }

    updateDefaultProvince=(provinceId:number,userId:number)=>{
      return axiosInstance.put("/Region/region/"+provinceId+"/user/"+userId).then(res=>res.data);
    }

    // addComment=(priceId: number,userId:number,content:string,photo?:File)=>{
    //   const formData = new FormData();
    //   if(photo){
    //     formData.append('file',photo);
    //     return axiosInstance.post("/Product/addComment",{priceId:priceId,userId:userId,content:content,photo:formData}).then(res=>res.data);
    //   }else{
    //     return axiosInstance.post("/Product/addComment",{priceId:priceId,userId:userId,content:content}).then(res=>res.data);
    //   }
    // }

    addComment = (priceId: number, userId: number, content: string, photo?: File) => {
        return axiosInstance.post('/Product/addComment',{priceId:priceId,userId:userId,content:content,regionId:12,picture:photo}).then((res) => res.data);
    };

    getMostPopular=()=>{
      return axiosInstance.get<ProductsResponse>("/Product/showMostPopularProducts").then(res=>res.data);
    }

    addNewProduct=(name:string,category:number,photo?:File)=>{
      if(!photo){
        return axiosInstance.post("/Admin/addProduct",{product_name:name,category_id:category,picture:""}).then(res=>res.data);
      }
    }


  
  
}

export default APIClient;
