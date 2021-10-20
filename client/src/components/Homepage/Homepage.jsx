import React from 'react';
import "./homepage.css";
import Logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';


const Homepage = () => {
    return (
        <div>
            <div className="px-4 py-5 my-5 text-center">
                <img className="d-block mx-auto mb-4" src={Logo} alt="Wispro Logo" width="72" height="57" />
                <h1 className="display-5 fw-bold">Welcome!</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa asperiores enim reprehenderit tempore beatae, tenetur, quod accusamus eius inventore maiores debitis alias cupiditate soluta deserunt dignissimos pariatur expedita tempora? Omnis.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="SignIn">
                            <button type="button" className="btn btn-primary btn-ms px-4 gap-3">Sign In</button>
                        </Link>
                        <Link to="SignUp">
                            <button type="button" className="btn btn-outline-secondary btn-ms px-4">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
