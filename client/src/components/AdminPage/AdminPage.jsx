import React, { useContext, useState, useEffect } from 'react';
import Logo from "../../assets/logo.png";
import "./adminPage.css";
import { UsersContext } from '../../context/UsersContext';
import { useHistory } from "react-router-dom";
import Charts from "../Charts/Charts";
import { usersLogged } from "../../database/analytics";
import io from 'socket.io-client';


const AdminPage = () => {
  const [data, setData] = useState([])
  const history = useHistory()
  const { currentUser, logoutUser, users, deleteUser } = useContext(UsersContext)
  const ioClient = io.connect("http://localhost:8000", { transports: ['websocket'] });

  useEffect(() => {
    ioClient.on("registerStats", (usersRegistered) => {
      usersRegistered.day === '1' ? setData([usersRegistered]) : setData((currentData) => [...currentData, usersRegistered])
    })
  }, [])

  const handleLogOut = () => {
    logoutUser()
    history.push("/")
  }

  const handleDelete = (id) => {
    deleteUser(id);
  }
  const handleEdit = (id) => {
    history.push(`/editForm/${id}`)
  }

  return (
    <div id="wrapper">
      <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <img className="d-block mx-2" src={Logo} alt="Wispro Logo" width="40" height="40" />
          <div className="" >
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <button type="button" onClick={handleLogOut} className="btn btn-secondary btn-md px-4 gap-3">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="px-4 py-5  text-center wrapper">
        {currentUser?.isAdmin ?
          <>
            <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                <li className="sidebar-brand">
                  Users List
                </li>
                <li className="sidebar-brand custom-container">
                  <ul className="list-group">
                    {users.map((user, index) => {
                      return (
                        user.id !== currentUser.id ?
                          <li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
                            <small className="users-text"> {user.firstName} {user.lastName}   {user.email}</small>
                            <div className="">
                              <button type="button" className="btn btn-primary btn-custom my-1 btn-sm" onClick={() => handleEdit(user.id)}>Edit</button>
                              <button type="button" className="btn btn-danger btn-custom my-1 btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                            </div>
                          </li> : null
                      )
                    })}
                  </ul>
                </li>

              </ul>
            </div>
            <h1 className="display-5 m-5 fw-bold">Admin Menu</h1>
            <div className="m-4">
              <Charts data={usersLogged} title="Users logged-in last month" stroke="#5F30E2" />
            </div>
            <div className="m-4">
              <Charts data={data} title="Users registered last month" stroke="#FF0000" />
            </div>

            <div className="conditionalList">
              <ul className="list-group">
                {users.map((user, index) => {
                  return (
                    user.id !== currentUser.id ?
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
                        <small className="users-text"> {user.firstName} {user.lastName}   {user.email}</small>
                        <div className="">
                          <button type="button" className="btn btn-primary btn-custom mx-2 my-1 btn-sm" onClick={() => handleEdit(user.id)}>Edit</button>
                          <button type="button" className="btn btn-danger btn-custom mx-2 my-1 btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                      </li> : null
                  )
                })}

              </ul>
            </div>

          </>
          : <div>
            <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark">
              <div className="container-fluid">
                <img className="d-block mx-2" src={Logo} alt="Wispro Logo" width="40" height="40" />
                <div className="" >
                  <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                    <a href="/"><button type="button" className="btn btn-secondary btn-md px-4 gap-3">Go back!</button></a>
                  </ul>
                </div>
              </div>
            </nav>
            <h2 className="my-4">Just Admin admited!</h2>
          </div>
        }
      </div>
    </div>
  );
};

export default AdminPage;

