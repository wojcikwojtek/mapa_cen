import axios from "axios";

export interface AuthResponse{
  accessToken:string;
}

export const axiosInstance= axios.create({
  baseURL: "https://localhost:7106",
});

class APIClient{
  //endpoint:string;

  constructor(){
  
  }

  register=(login:string,email:string,password:string)=>{
      return axiosInstance.post("/register",{login:login,email:email,password:password}).then(res=>res.data);
  }

  login=(login:string,password:string)=>{
    return axiosInstance.post("/login",{email:login,password:password}).then(res=>res.data);
}

  
  // get=(id: number | string)=>{
  //   return axiosInstance.get<T>(this.endpoint+'/'+id).then(res=>res.data);
  // }

  
  
}

export default APIClient;
