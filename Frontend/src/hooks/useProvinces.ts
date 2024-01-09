import { useQuery } from "react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient();

const useProvinces = () =>useQuery({
  queryKey:['provinces'],
  queryFn:apiClient.getProvinces,
  staleTime:1000*60
    // initialData:{count:platforms.length,results:platforms,next:null}
})

export default useProvinces;