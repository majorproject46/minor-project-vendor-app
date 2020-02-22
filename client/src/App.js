import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { getUser } from "./actions/index";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import DetailedProduct from "./pages/DetailedProduct";
import LinkApartment from "./pages/LinkApartment";
import JoinApartment from "./pages/JoinApartment";
import ApartmentOrder from "./pages/orders/ApartmentOrders";
import FlatsList from "./pages/orders/FlatsList";
import DetailedOrder from "./pages/orders/DetailedOrder";

import PrivateRoute from "./helpers/PrivateRoute";

class App extends React.Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={SignUp} />
                        <PrivateRoute path="/home" exact component={Home} />
                        <PrivateRoute
                            path="/products/home"
                            exact
                            component={Products}
                        />
                        <PrivateRoute
                            path="/products/addPage"
                            exact
                            component={AddProduct}
                        />
                        <PrivateRoute
                            path="/products/detail/:id"
                            component={DetailedProduct}
                        />
                        <PrivateRoute
                            path="/apartment/linkApartment"
                            component={LinkApartment}
                        />
                        <PrivateRoute
                            path="/apartments/join/:id"
                            component={JoinApartment}
                        />
                        <PrivateRoute
                            path="/orders/listApartments"
                            component={ApartmentOrder}
                        />
                        <PrivateRoute
                            path="/apartments/listOrders/:id"
                            component={FlatsList}
                        />
                        <PrivateRoute
                            path="/apartments/DetailedFlatOrder/:orderId"
                            component={DetailedOrder}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return { auth: state.auth };
};

export default connect(mapStateToProps, { getUser })(App);
