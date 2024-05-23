import { createStore } from "redux";
import reducer from "./reducer"

export const store = createStore(reducer);

store.subscribe(() => {
    sessionStorage.setItem("state", JSON.stringify(store.getState()));
});