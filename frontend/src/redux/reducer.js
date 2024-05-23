const initialState = {
    token: null,
    userData: null,
    signUpModal: false,
    loginError: null,
    success: null
}

const storedState = sessionStorage.getItem("state");
const persistedState = storedState ? JSON.parse(storedState) : initialState;

const reducer = (state = persistedState, action) => {
    switch (action.type) {
        case "signUpModal":
            return { 
                ...state,
                signUpModal: action.payload
            }
        case "loginError":
            return { 
                ...state,
                loginError: action.payload
            }
        case "success":
            return { 
                ...state,
                success: action.payload
            }
        case "connexionToken":
            return { 
                ...state,
                token: action.payload
            }
        case "userData":
            return { 
                ...state,
                userData: action.payload
            }
        case "signOut":
            return initialState
        default:
            return state;
    }
}

export default reducer;