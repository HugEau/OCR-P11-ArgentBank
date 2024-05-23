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