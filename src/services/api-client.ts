import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  next:string|null;
  results: T[];
}

export const axiosInstance= axios.create({
  baseURL: "https://api.rawg.io/api",
});

class APIClient<T>{
  endpoint:string;

  constructor(endpoint:string){
    this.endpoint=endpoint;
  }

  // login=(login:string,password:string)=>{
  //     return axiosInstance.
  // }

  
  get=(id: number | string)=>{
    return axiosInstance.get<T>(this.endpoint+'/'+id).then(res=>res.data);
  }

  
  
}

export default APIClient;
