import React, { useState } from "react";
import { FieldValues, useForm } from 'react-hook-form';
import APIClient from '../services/api-client';

interface SignUpData {
    login: string;
    email: string;
    password: string;
    repeat_password: string;
}

const RegisterForm = () => {

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const apiClient = new APIClient();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpData>();
    const onSubmit = (data: FieldValues) => {
        apiClient.register(data.login, data.email, data.password)
            .then(() => {
                setRegistrationSuccess(true);
                showAlert();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const showAlert = () => {
        alert("Udało się zarejestrować");
    };

    return (
        <>
            <div className="form">
                <h1>Zarejestruj się</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="login">Login:</label><br />
                    <input {...register('login', { required: true, minLength: 3 })} type="text" id="login" name="login" /><br />
                    {errors.login && <p style={{ color: 'red' }}>login musi mieć conajmniej 3 znaki</p>}
                    <label htmlFor="email">Email:</label><br />
                    <input {...register('email', { required: true, minLength: 3 })} type="text" id="email" name="email" /><br />
                    {errors.email && <p style={{ color: 'red' }}>zły email</p>}
                    <label htmlFor="password">Hasło:</label><br />
                    <input {...register('password', { required: true, minLength: 3, pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                        message: "hasło musi mieć conajmniej 8 znaków i zawierać małą oraz duża literę"
                    } })} type="password" id="password" name="password" /><br />
                    {errors.password && <p style={{ color: 'red' }}>hasło musi mieć conajmniej 8 znaków i zawierać małą oraz duża literę</p>}
                    <label htmlFor="repeat_password">Powtórz hasło:</label><br />
                    <input {...register('repeat_password', {
                        required: true,
                        minLength: 3,
                        validate: (value) => value === watch('password') || 'hasła nie są identyczne'
                    })} type="password" id="repeat_password" name="repeat_password" /><br />
                    {errors.repeat_password && <p style={{ color: 'red' }}>zle powtorzone haslo</p>}
                    <input type="submit" value="Zarejestruj się" />
                </form>
            </div>
        </>
    )
}

export default RegisterForm;


