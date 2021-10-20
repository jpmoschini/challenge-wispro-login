import {
    CREATE_USER,
    CURRENT_USER,
    LOGOUT_USER,
    DELETE_USER,
    SET_EDITING,
    UPDATE_USER
} from "../types";

const UsersReducer = (state, action) => {
    switch (action.type) {
        case CREATE_USER:
            return { ...state, users: [...state.users, action.payload] }
        case CURRENT_USER:
            return { ...state, currentUser: action.payload }
        case LOGOUT_USER:
            return { ...state, currentUser: null }
        case DELETE_USER:
            return { ...state, users: state.users.filter(user => user.id !== action.payload) }
        case SET_EDITING:
            return { ...state, isEditing: !state.isEditing }
        case UPDATE_USER:
            return { ...state, users: state.users.map(user => 
                user.id === action.payload.id? action.payload:user
                )}
        default:
            return state
    }
}

export default UsersReducer;