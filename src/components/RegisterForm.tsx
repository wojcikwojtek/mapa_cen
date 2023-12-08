import React from "react";

const RegisterForm = () => {
    return (
        <>
        <h1>Zarejestruj się</h1>
        <form action="">
            <label htmlFor="login">Login:</label><br/>
            <input type="text" id="login" name="login"></input><br/>
            <label htmlFor="email">Email:</label><br/>
            <input type="text" id="email" name="email"></input><br/>
            <label htmlFor="password">Hasło:</label><br/>
            <input type="password" id="password" name="password"></input><br/>
            <label htmlFor="repeat_password">Powtórz hasło:</label><br/>
            <input type="password" id="repeat_password" name="repeat_password"></input><br/>
            <input type="submit" value="Zarejestruj się"></input>
        </form>
        </>
    )
}

export default RegisterForm