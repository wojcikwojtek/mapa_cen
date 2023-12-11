import { create } from "zustand";


interface UserStore{
  email:string;
  token?:string;
  setEmail:(email:string)=>void;
  setToken:(token:string)=>void;
  reset:()=>void;
}

const useUserStore=create<UserStore>(set=>({
    email:"gość",
    setEmail:(email)=>set(()=>({email: email})),
    setToken:(token)=>set(()=>({token: token})),
    reset:()=>set(()=>({email:"gość",token:undefined}))
}));

export default useUserStore;