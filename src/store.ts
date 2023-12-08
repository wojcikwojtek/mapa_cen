import { create } from "zustand";


interface UserStore{
  username:string;
  setUsername:(newUsername:string)=>void;
  reset:()=>void;
}

const useUserStore=create<UserStore>(set=>({
    username:"gość",
    setUsername:(newUsername)=>set(()=>({username: newUsername})),
    reset:()=>set(()=>({username:"gość"}))
}));

export default useUserStore;