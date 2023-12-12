import { create } from "zustand";


interface UserStore{
  username:string;
  setUsername:(username:string)=>void;
  reset:()=>void;
}

const useUserStore=create<UserStore>(set=>({
    username:"gość",
    setUsername:(username)=>set(()=>({username: username})),
    reset:()=>set(()=>({username:"gość"}))
}));

export default useUserStore;