const initialState = {
    token: null,
    userData: null
}

const storedState = sessionStorage.getItem("state");
const persistedState = storedState ? JSON.parse(storedState) : initialState;

const reducer = (state = persistedState, action) => {
    switch (action.type) {
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