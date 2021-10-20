import React, { useContext, useState } from 'react';
import "./signIn.css";
import Logo from "../../assets/logo.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UsersContext } from '../../context/UsersContext';
import { useHistory } from "react-router-dom";

const schema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Required!"),
})

const SignIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const { users, setCurrentUser } = useContext(UsersContext)

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const history = useHistory()

    const sendSubmit = (data, e) => {

        const foundUser = users.find(user => user.email === data.email)
        if (foundUser) {
            setEmailError(false)
            if (foundUser.password === data.password) {
                e.target.reset();
                setCurrentUser(foundUser)
                if (foundUser.isAdmin === true) {
                    history.push("/adminPage");

                } else {
                    history.push("/Userpage");
                }
            } else {
                setPasswordError(true)
            }
        } else {
            setEmailError(true)
        }

    }

    return (
        <div className="text-center">
            <main className="form-signin">
                <form onSubmit={handleSubmit(sendSubmit)} className="form-container">
                    <img className="mb-4" src={Logo} alt="Wispro Logo" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Email" {...register("email")} />
                        <p>{errors.email?.message}</p>
                        <label htmlFor="floatingInput">Email address</label>
                        {emailError && <span> The email doesn't exist</span>}
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password" {...register("password")} />
                        <p>{errors.password?.message}</p>
                        <label htmlFor="floatingPassword">Password</label>
                        {passwordError && <span> Wrong password</span>}
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </main>
        </div>
    );
};

export default SignIn;
