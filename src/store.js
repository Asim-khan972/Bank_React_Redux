import { applyMiddleware, combineReducers, createStore } from "redux"; 
import accountReducer from "./features/accounts/AccountSlice";
import customerReducer from "./features/customers/CustomerSlice";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer :{
        account : accountReducer, 
        customer : customerReducer
    }
})
export default store;