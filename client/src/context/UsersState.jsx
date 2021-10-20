import React, { useReducer } from 'react';
import { CREATE_USER, CURRENT_USER, LOGOUT_USER, DELETE_USER, SET_EDITING, UPDATE_USER } from '../types';
import UsersReducer from './UsersReducer';
import { usersList } from "../database/users";
import { UsersContext } from './UsersContext';


const UsersState = (props) => {
    const initialState = {
        users: [
            ...usersList
        ],
        isEditing: false,
        currentUser: null,
    }

    const [state, dispatch] = useReducer(UsersReducer, initialState)

    const createUser = (newUser) => {
        dispatch({ type: CREATE_USER, payload: newUser })
    }
    const setCurrentUser = (user) => {
        dispatch({ type: CURRENT_USER, payload: user })
    }
    const logoutUser = (user) => {
        dispatch({ type: LOGOUT_USER })
    }
    const deleteUser = (id) => {
        dispatch({ type: DELETE_USER, payload: id })
    }
    const setEditing = () => {
        dispatch({ type: SET_EDITING })
    }
    const updateUser = (id) => {
        dispatch({ type: UPDATE_USER, payload: id })
    }

    return (
        <UsersContext.Provider value={{
            users: state.users,
            currentUser: state.currentUser,
            isEditing: state.isEditing,
            createUser,
            setCurrentUser,
            logoutUser,
            deleteUser,
            setEditing,
            updateUser
        }}>
            {props.children}
        </UsersContext.Provider>
    );
}

export default UsersState;