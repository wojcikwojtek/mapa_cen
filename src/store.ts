import { create } from "zustand";


interface UserStore{
  username:string;
  setUsername:(newUsername:string)=>void;
  reset:()=>void;
}

const useUserStore=create<UserStore>(set=>({
    username:"gosc",
    setUsername:(newUsername)=>set(()=>({username: newUsername})),
    reset:()=>set(()=>({username:"gosc"}))
}));

export default useUserStore;