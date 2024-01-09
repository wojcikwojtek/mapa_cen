import { useQuery } from "react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient();

const usePowiaty = (provinceId:number) =>useQuery({
  queryKey:['provinces',provinceId],
  queryFn:()=>apiClient.getPowiat(provinceId),
  staleTime:1000*60
    // initialData:{count:platforms.length,results:platforms,next:null}
})

export default usePowiaty;