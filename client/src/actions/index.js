import types from "./types";
import axios from "axios";

export const userLogin = credentials => async dispatch => {
    try {
        const response = await axios.post("/auth/userSignIn", credentials);
        console.log(response.data);
        dispatch({
            type: types.USER_LOGIN,
            payload: response.data.userId
        });
    } catch (error) {
        console.log(error);
    }
};

export const getUser = () => async dispatch => {
    try {
        const response = await axios.get("/auth/currentUser");
        if (response.data.userId) {
            dispatch({
                type: types.FETCH_USER,
                payload: response.data.userId
            });
        } else {
            dispatch({
                type: types.FETCH_USER,
                payload: null
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const userLogout = () => async dispatch => {
    try {
        const response = await axios.get("/auth/logout");
        console.log(response);
        dispatch({
            type: types.USER_LOGOUT,
            payload: null
        });
    } catch (error) {
        console.log(error);
    }
};

export const getProducts = () => async dispatch => {
    try {
        const response = await axios.get("/products/getProducts");
        console.log(response);
        dispatch({
            type: types.GET_PRODUCTS,
            payload: response.data.products
        });
    } catch (error) {
        console.log(error);
    }
};
