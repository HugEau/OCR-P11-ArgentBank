import { createStore } from "redux";
import reducer from "./reducer"

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

export const setSignUpModal = (e) => {
    return {
        type: "signUpModal",
        payload: e
    }
}

export const setSuccess = (e) => {
    return {
        type: "success",
        payload: e
    }
}

export const store = createStore(reducer);

store.subscribe(() => {
    sessionStorage.setItem("state", JSON.stringify(store.getState()));
});