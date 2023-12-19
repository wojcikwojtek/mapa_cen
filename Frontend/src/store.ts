import { create } from "zustand";


interface UserStore{
  searchProduct:string|undefined;
  username:string;
  setUsername:(username:string)=>void;
  setSearchProduct:(searchProduct:string)=>void;
  reset:()=>void;
}

const useUserStore=create<UserStore>(set=>({
    username:"gość",
    searchProduct:undefined,
    setUsername:(username)=>set(()=>({username: username})),
    setSearchProduct:(searchProduct)=>set(()=>({searchProduct: searchProduct})),
    reset:()=>set(()=>({username:"gość"}))
}));

export default useUserStore;