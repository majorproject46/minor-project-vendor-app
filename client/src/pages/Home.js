import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends React.Component {
    componentDidMount = async () => {
        const response = await axios.post("/orders/getOrders");
        console.log(response);
    };
    render() {
        return (
            <div>
                Home Page
                <br />
                <Link to="/products/home"> Products</Link>
                <br />
                <Link to="/apartment/linkApartment"> Link Apartment</Link>
                <br />
                <Link to="/orders/listApartments"> Orders</Link>
            </div>
        );
    }
}

export default Home;
