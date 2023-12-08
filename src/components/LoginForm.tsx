import React from 'react'

interface SignInData {
    email: string;
    password: string;
}

const LoginForm = () => {

    const {register,handleSubmit, formState:{errors}}=useForm<SignInData>();
    const onSubmit=(data: FieldValues)=>console.log(data);

  return (
    <>
    <h1>Zaloguj się</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login">Login:</label><br/>
      <input type="text" id="login" name="login"></input><br/>
      <label htmlFor="password">Password:</label><br/>
      <input type="password" id="password" name="password"></input><br/>
      <input type="submit" value="Zaloguj się"></input><br/>
      <a href=''>Zarejestruj się</a>
    </form>
    </>
  )
}

export default LoginForm