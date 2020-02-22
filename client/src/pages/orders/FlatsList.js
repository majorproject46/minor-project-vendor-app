import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

class FlatsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null
        };
    }

    componentDidMount() {
        this.getFlatsList();
    }

    getFlatsList = async () => {
        const apartmentId = this.props.match.params.id;
        console.log(apartmentId);
        const resposne = await axios.post("/orders/getOrdersByApartment", {
            apartmentId
        });
        const { orders } = resposne.data;
        console.log(orders);
        if (orders === null || orders === undefined) {
            this.setState({ orders: [] });
        } else this.setState({ orders });
    };

    render() {
        return (
            <div className="container">
                <h4 className="text-center"> Flats List</h4>
                {this.renderFlatsList()}
            </div>
        );
    }

    renderFlatsList() {
        const { orders } = this.state;
        if (orders === null || orders === undefined) {
            return <div>Loading....</div>;
        }
        if (orders.length === 0) {
            return <div>No orders at this point of time.</div>;
        }
        return orders.map((order, index) => {
            const flatId = order.userId.apartmentDetails.flatNo;
            console.log(order.userId.apartmentDetails);
            return (
                <Link
                    to={`/apartments/DetailedFlatOrder/${order._id}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                >
                    <Card bg="light" style={{ width: "100%" }}>
                        <Card.Body>
                            <Card.Title>{flatId}</Card.Title>
                            <Card.Text>Order Of Rs.{order.cost}</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            );
        });
    }
}

export default FlatsList;
