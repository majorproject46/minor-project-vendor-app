import { combineReducers } from "redux";
import types from "../actions/types";

const authReducer = (state = null, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            return action.payload;
        case types.USER_LOGOUT:
            return action.payload;
        case types.FETCH_USER:
            return action.payload;
        default:
            return state;
    }
};

const productsReducer = (state = null, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    products: productsReducer
});
