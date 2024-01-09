import { useQuery } from "react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient();

const useProductPrices = (productId:number,regionId:number) =>useQuery({
  queryKey:['productSearch',productId,regionId],
  queryFn:()=>apiClient.getPricesForRegion(productId,regionId),
  staleTime:1000*60
    // initialData:{count:platforms.length,results:platforms,next:null}
})

export default useProductPrices;