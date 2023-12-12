import React from "react";
import { FieldValues, useForm } from 'react-hook-form';
import APIClient from '../services/api-client';

interface SignUpData {
    login: string;
    email: string;
    password: string;
    repeat_password: string;
}

const RegisterForm = () => {

    const apiClient=new APIClient();

    const {register,handleSubmit, formState:{errors}}=useForm<SignUpData>();
    const onSubmit=(data: FieldValues)=>{
      apiClient.register(data.login,data.password);
      console.log(data)
    };

    return (
        <>
        <div className = "form">
        <h1>Zarejestruj się</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="login">Login:</label><br/>
            <input {...register('login',{required: true,minLength:3})} type="text" id="login" name="login"></input><br/>
            {errors.login &&<p>zly login</p>}
            <label htmlFor="email">Email:</label><br/>
            <input {...register('email',{required: true,minLength:3})} type="text" id="email" name="email"></input><br/>
            {errors.email &&<p>zly mail</p>}
            <label htmlFor="password">Hasło:</label><br/>
            <input {...register('password',{required: true,minLength:3})} type="password" id="password" name="password"></input><br/>
            {errors.password &&<p>zle haslo</p>}
            <label htmlFor="repeat_password">Powtórz hasło:</label><br/>
            <input {...register('repeat_password',{required: true,minLength:3})} type="password" id="repeat_password" name="repeat_password"></input><br/>
            {errors.repeat_password &&<p>zle powtorzone haslo</p>}
            <input type="submit"  value="Zarejestruj się"></input>
        </form>
        </div>
        </>
    )
}

export default RegisterForm