import { useQuery } from "react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient();

const useRegions = (provinceId:number) =>useQuery({
  queryKey:['regions',provinceId],
  queryFn:()=>apiClient.getRegion(provinceId),
  staleTime:1000*60
    // initialData:{count:platforms.length,results:platforms,next:null}
})

export default useRegions;