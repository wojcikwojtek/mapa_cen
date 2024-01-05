import { create } from "zustand";


interface UserStore{
  searchProduct:string|undefined;
  username:string;
  userId:number;
  setUsername:(username:string)=>void;
  setUserId:(userId:number)=>void;
  setSearchProduct:(searchProduct:string)=>void;
  reset:()=>void;
}

const useUserStore=create<UserStore>(set=>({
    username:"gość",
    userId:-1,
    searchProduct:undefined,
    setUsername:(username)=>set(()=>({username: username})),
    setUserId:(userId)=>set(()=>({userId: userId})),
    setSearchProduct:(searchProduct)=>set(()=>({searchProduct: searchProduct})),
    reset:()=>set(()=>({username:"gość",userId:-1}))
}));

export default useUserStore;