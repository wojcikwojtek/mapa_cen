import React from 'react'

// interface SignInData {
//     email: string;
//     password: string;
// }

const LoginForm = () => {

<<<<<<< HEAD
    //const {register,handleSubmit, formState:{errors}}=useForm<SignInData>();
    //const onSubmit=(data: FieldValues)=>console.log(data);
=======
    // const {register,handleSubmit, formState:{errors}}=useForm<SignInData>();
    // const onSubmit=(data: FieldValues)=>console.log(data);
>>>>>>> 4e52a517b91a3704436032c35f0ab86fcae47d38

  return (
    <>
    <h1>Zaloguj się</h1>
<<<<<<< HEAD
    <form action="">
=======
    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
    <form>
>>>>>>> 4e52a517b91a3704436032c35f0ab86fcae47d38
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