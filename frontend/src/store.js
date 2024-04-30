import { createStore } from "redux";

const initialState = {
    connected: false,
    token: null,
    userData: null,
    loginError: null
}

export const setLoginError = (e) => {
    return {
        type: "loginError",
        payload: e
    }
}

export const setConnexionStatus = (e) => {
    console.log(e, "connexionStatus")
    return {
        type: "connexionStatus",
        payload: e
    }
}

export const setConnexionToken = (e) => {
    console.log(e, "connexionToken")
    return {
        type: "connexionToken",
        payload: e
    }
}

export const setUserData = (e) => {
    return {
        type: "userData",
        payload: e
    }
}

export const signOut = () => {
    return {
        type: "signOut",
        payload: null
    }
}

const storedState = sessionStorage.getItem("state");
const persistedState = storedState ? JSON.parse(storedState) : initialState;

const reducer = (state = persistedState, action) => {
    if (action.type === "loginError") {
        return { 
            ...state,
            loginError: action.payload
        }
    }

    if (action.type === "connexionStatus") {
        if (action.payload === false) {
            return {
                ...state,
                connected: action.payload,
            }
        } else if (action.payload === true){
            return { 
                ...state,
                connected: action.payload
            }
        } else {
            return state
        }
    }
    if (action.type === "connexionToken") {
        return { 
            ...state,
            token: action.payload
        }
    }

    if (action.type === "userData") {
        return { 
            ...state,
            userData: action.payload
        }
    }

    if (action.type === "signOut") {
        return initialState
    }

    return state;
}

export const store = createStore(reducer);

store.subscribe(() => {
    sessionStorage.setItem("state", JSON.stringify(store.getState()));
});