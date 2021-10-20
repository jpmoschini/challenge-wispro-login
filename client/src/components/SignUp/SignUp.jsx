import React, { useContext, useState } from 'react';
import "./signUp.css"
import Logo from "../../assets/logo.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UsersContext } from '../../context/UsersContext';
import { v4 as uuid_v4 } from "uuid";
import { useHistory } from "react-router-dom";

const schema = yup.object({
    firstName: yup
        .string()
        .min(2, "Mininum 2 characters")
        .max(20, "Maximum 20 characters")
        .required("Required!")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: yup
        .string()
        .min(2, "Mininum 2 characters")
        .max(20, "Maximum 20 characters")
        .required("Required!")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Required!"),
    password: yup
        .string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    confirm_password: yup
        .string()
        .oneOf([yup.ref("password")], "Password's not match")
        .required("Required!")
})


const SignUp = () => {
    const [userError, setUserError] = useState(false)

    const { users, createUser } = useContext(UsersContext)

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const history = useHistory()

    const sendSubmit = (data, e) => {
        const userExist = users.some(user =>
            user.email === data.email)

        if (userExist) {
            setUserError(true)
        } else {
            data.id = uuid_v4();
            data.isAdmin = false;
            setUserError(false)
            createUser(data)
            e.target.reset()
            history.push("/SignIn");
        }
    }

    return (
        <div className="text-center">
            <main className="form-signin">
                <form onSubmit={handleSubmit(sendSubmit)} className="form-container">
                    <img className="mb-4" src={Logo} alt="Wispro Logo" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="First name" {...register("firstName")} />
                        <p>{errors.firstName?.message}</p>
                        <label htmlFor="floatingInput">First Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Last name" {...register("lastName")} />
                        <p>{errors.lastName?.message}</p>
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Email" {...register("email")} />
                        <p>{errors.email?.message}</p>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password" {...register("password")} />
                        <p>{errors.password?.message}</p>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Confirm Password" {...register("confirm_password")} />
                        <p>{errors.confirm_password?.message}</p>
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>

                    {userError && <span> That email already exists</span>}

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>

                </form>
            </main>
        </div>
    );
};

export default SignUp;