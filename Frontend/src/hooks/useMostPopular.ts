import { useQuery } from "react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient();

const useMostPopular = () =>useQuery({
  queryKey:['mostPopular'],
  queryFn:apiClient.getMostPopular,
  staleTime:1000*60
    // initialData:{count:platforms.length,results:platforms,next:null}
})

export default useMostPopular;