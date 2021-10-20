import React, { useContext } from 'react';
import "./userpage.css";
import Logo from "../../assets/logo.png";
import { UsersContext } from '../../context/UsersContext';
import { useHistory } from "react-router-dom";

const Userpage = () => {

    const history = useHistory()

    const { currentUser, logoutUser } = useContext(UsersContext)

    const handleLogOut = () => {
        logoutUser()
        history.push("/")
    }

    const { firstName, email } = currentUser;
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <img className="d-block mx-2" src={Logo} alt="Wispro Logo" width="40" height="40" />
                    <div className="" >
                        <ul className="navbar-nav ms-auto  mb-md-0">
                            <li className="nav-item label mb-0 align-self-end">
                                <p className=" mb-0 mx-1 text-light">{email}</p>
                            </li>
                            <li className="nav-item">
                                <button type="button" onClick={handleLogOut} className="btn btn-secondary btn-md px-4 gap-3">Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="px-4 py-5 my-5 text-center">
                <img className="d-block mx-auto mb-4" src={Logo} alt="Wispro Logo" width="72" height="57" />
                <h1 className="display-5 fw-bold">Hi {firstName}. You are logged in!</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa asperiores enim reprehenderit tempore beatae, tenetur, quod accusamus eius inventore maiores debitis alias cupiditate soluta deserunt dignissimos pariatur expedita tempora? Omnis.</p>
                </div>
            </div>
        </div>
    );
};

export default Userpage;
