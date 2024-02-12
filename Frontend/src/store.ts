import { create } from "zustand";


interface UserStore{
  searchProduct:string|undefined;
  username:string;
  userId:number;
  userRegion:number;
  hasAdmin:boolean;
  globalSelectedRegion:string;
  globalSelectedRegionId:number;
  setglobalSelectedRegion:(region:string)=>void;
  setglobalSelectedRegionId:(regionId:number)=>void;
  setUsername:(username:string)=>void;
  setUserId:(userId:number)=>void;
  setUserRegion:(userRegion:number)=>void;
  setHasAdmin:(hasAdmin:boolean)=>void;
  setSearchProduct:(searchProduct:string)=>void;
  reset:()=>void;
}

const useUserStore=create<UserStore>(set=>({
    username:"gość",
    userId:-1,
    searchProduct:undefined,
    userRegion:0,
    hasAdmin:false,
    globalSelectedRegion:"gliwice",
    globalSelectedRegionId:33,
    setUsername:(username)=>set(()=>({username: username})),
    setglobalSelectedRegion:(region)=>set(()=>({globalSelectedRegion: region})),
    setglobalSelectedRegionId:(regionId)=>set(()=>({globalSelectedRegionId: regionId})),
    setUserId:(userId)=>set(()=>({userId: userId})),
    setUserRegion:(userRegion)=>set(()=>({userRegion: userRegion})),
    setHasAdmin:(hasAdmin)=>set(()=>({hasAdmin: hasAdmin})),
    setSearchProduct:(searchProduct)=>set(()=>({searchProduct: searchProduct})),
    reset:()=>set(()=>({username:"gość",userId:-1,userRegion:0}))
}));

export default useUserStore;