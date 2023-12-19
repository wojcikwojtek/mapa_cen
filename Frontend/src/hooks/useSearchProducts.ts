import { useQuery } from "react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient();

const useSearchProducts = (productName:string) =>useQuery({
  queryKey:['productSearch',productName],
  queryFn:()=>apiClient.getProducts(productName),
  staleTime:1000*60
    // initialData:{count:platforms.length,results:platforms,next:null}
})

export default useSearchProducts;