import { useQuery } from "react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient();

const useProductDetails = (productId:number) =>useQuery({
  queryKey:['productSearch',productId],
  queryFn:()=>apiClient.getProductDetail(productId),
  staleTime:1000*60
    // initialData:{count:platforms.length,results:platforms,next:null}
})

export default useProductDetails;