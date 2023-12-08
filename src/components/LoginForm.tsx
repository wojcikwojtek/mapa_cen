import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import APIClient from '../services/api-client';

interface SignInData {
    login: string;
    password: string;
}

const LoginForm = () => {
  const apiClient=new APIClient<string>('/login');

    const {register,handleSubmit, formState:{errors}}=useForm<SignInData>();
    const onSubmit=(data: FieldValues)=>{
      apiClient.get(1);//tu ma byc na endpoint login do backenfu request
      console.log(data)
    };

  return (
    <>
    <h1>Zaloguj się</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login">Login:</label><br/>
      <input {...register('login',{required: true,minLength:3})}  type="text" id="login" name="login"></input><br/>
      {errors.login &&<p>zly login</p>}
      <label htmlFor="password">Password:</label><br/>
      <input  {...register('password',{required: true,minLength:3})}  type="password" id="password" name="password"></input><br/>
      {errors.password &&<p>zle haslo</p>}
      <input type="submit" value="Zaloguj się"></input><br/>

      <a href=''>Zarejestruj się</a>
    </form>
    </>
  )
}

export default LoginForm