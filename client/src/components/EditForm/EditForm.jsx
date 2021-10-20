import React, { useContext, useEffect, useState } from 'react';
import "./editForm.css"
import Logo from "../../assets/logo.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UsersContext } from '../../context/UsersContext';
import { useHistory, useParams } from "react-router-dom";

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
  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .required("Required!"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password's not match")
    .required("Required!")
})

const EditUserForm = () => {
  const { users } = useContext(UsersContext)
  const [foundUser, setFoundUser] = useState(null)

  const { id } = useParams();
  useEffect(() => {
    const getUser = async () => {
      setFoundUser(await users.find(user => user.id === Number(id)))
    }
    getUser()
  }, [id, users])

  return foundUser ? <EditForm preloadedValues={foundUser} /> : <div> Loading </div>
}

const EditForm = ({ preloadedValues }) => {
  const { updateUser, currentUser } = useContext(UsersContext)
  const history = useHistory()

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: preloadedValues
  });


  const sendSubmit = (data, e) => {
    updateUser(data)
    e.target.reset()
    history.push("/adminPage");

  }

  return (
    <div className="text-center">
      {currentUser.isAdmin ?
        <main className="form-signin">
          <form onSubmit={handleSubmit(sendSubmit)} className="form-container">
            <img className="mb-4" src={Logo} alt="Wispro Logo" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Edit User</h1>

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
              <input type="password" className="form-control" placeholder="Password" {...register("password")} />
              <p>{errors.password?.message}</p>
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-floating">
              <input type="password" className="form-control" placeholder="Confirm Password" {...register("confirm_password")} />
              <p>{errors.confirm_password?.message}</p>
              <label htmlFor="floatingPassword">Confirm Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Edit</button>

          </form>
        </main> :
        <div>Just Admin admited!</div>
      }
    </div>
  )
}

export default EditUserForm;