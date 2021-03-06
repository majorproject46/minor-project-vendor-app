import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth !== null ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
);

const mapStateToProps = state => {
    console.log(state);
    return { auth: state.auth };
};

export default connect(mapStateToProps)(PrivateRoute);
