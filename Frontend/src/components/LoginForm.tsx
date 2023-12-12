import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import APIClient from '../services/api-client';
import { Link,  useNavigate } from 'react-router-dom';
import useUserStore from '../store';

interface SignInData {
    login: string;
    password: string;
}

const LoginForm = () => {
  const navigate=useNavigate();
  const [loginError, setLoginError] = useState(false);
  const userStore=useUserStore();
  const apiClient=new APIClient();

    const {register,handleSubmit, formState:{errors}}=useForm<SignInData>();
    const onSubmit=(data: FieldValues)=>{
      apiClient.login(data.login,data.password)
      .then(res=>{
        if(res.authorized == true){
          userStore.setUsername(data.login);
          localStorage.setItem("username",data.login);
          console.log("jest git");
          navigate("/");
        }else{
          setLoginError(true);
        }
      })
      .catch(err=>{
        console.log("error"+err);
     
      })
    };

    
   
  return (
  <>
    <div className = "form">
    <h1>Zaloguj się</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login">Login:</label><br/>
      <input {...register('login',{required: true,minLength:3})}  type="text" id="login" name="login"></input><br/>
      {errors.login &&<p style={{color:'red'}}>wprowadź login </p>}
      <label htmlFor="password">Password:</label><br/>
      <input  {...register('password',{required: true,minLength:3})}  type="password" id="password" name="password"></input><br/>
      {errors.password &&<p  style={{color:'red'}}>wprowadź hasło</p>}
      <input type="submit"   value="Zaloguj się"></input><br/>
      {loginError && <p  style={{color:'red'}}>zly login lub hasło</p>}
      <Link to={'/auth/register'}>Zarejestruj się
      </Link>
    </form>
    </div>
  </>
  )
}

export default LoginForm