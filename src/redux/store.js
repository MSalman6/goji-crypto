import { createStore, combineReducers } from "redux";
import navReducer from "./ducks/navReducer";

const reducers = combineReducers({
    navReducer: navReducer
})

export const store = createStore(reducers);