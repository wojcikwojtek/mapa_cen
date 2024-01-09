import { create } from "zustand";


interface UserStore{
  searchProduct:string|undefined;
  username:string;
  userId:number;
  userRegion:number;
  setUsername:(username:string)=>void;
  setUserId:(userId:number)=>void;
  setUserRegion:(userRegion:number)=>void;
  setSearchProduct:(searchProduct:string)=>void;
  reset:()=>void;
}

const useUserStore=create<UserStore>(set=>({
    username:"gość",
    userId:-1,
    searchProduct:undefined,
    userRegion:0,
    setUsername:(username)=>set(()=>({username: username})),
    setUserId:(userId)=>set(()=>({userId: userId})),
    setUserRegion:(userRegion)=>set(()=>({userRegion: userRegion})),
    setSearchProduct:(searchProduct)=>set(()=>({searchProduct: searchProduct})),
    reset:()=>set(()=>({username:"gość",userId:-1,userRegion:0}))
}));

export default useUserStore;