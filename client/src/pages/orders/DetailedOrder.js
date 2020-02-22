import React from "react";
import axios from "axios";

class DetailedOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null
        };
    }

    componentDidMount() {
        this.getOrderDetails();
    }

    getOrderDetails = async () => {
        const orderId = this.props.match.params.orderId;
        const resposne = await axios.post("/orders/getOrderDetails", {
            orderId
        });
        console.log(resposne);
        this.setState({ order: resposne.data.order });
    };

    renderOrderDetails() {
        const { order } = this.state;
        if (order === null || order === undefined) {
            return <div>Loading...</div>;
        }
        const products = order.orderDetails;
        return products.map(({ productId, quantity }, index) => {
            return (
                <div key={index} style={{}}>
                    Name : {productId.name}
                    Price: {productId.price}
                    Quantity: {quantity}
                    <br />
                </div>
            );
        });
    }

    renderTotalCost() {
        const { order } = this.state;
        if (order === null || order === undefined) {
            return <div>Loading...</div>;
        }
        return <div>Total cost = {order.cost}</div>;
    }

    render() {
        return (
            <div>
                DetailedOrder
                {this.renderOrderDetails()}
                <br />
                {this.renderTotalCost()}
            </div>
        );
    }
}

export default DetailedOrder;
