import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";

import { getDetailImageUrl } from "../helpers/index";

class DetailedProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        };
    }
    componentDidMount() {
        this.getProduct();
    }

    getProduct = async () => {
        const id = this.props.match.params.id;
        console.log(id);
        const response = await axios.post("/products/getProduct", { id });
        console.log(response);
        this.setState({ product: response.data.product });
    };

    renderReadOnly(data) {
        return data.map(({ label, value }, index) => {
            return (
                <Form.Group as={Row} controlId="formPlaintextEmail" key={index}>
                    <Form.Label column sm="2">
                        {label}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control readOnly defaultValue={value} />
                    </Col>
                </Form.Group>
            );
        });
    }

    render() {
        console.log(this.props.match.params.id);
        if (this.state.product === null) {
            return <div>Loading...</div>;
        }
        const data = [
            {
                label: "Name",
                value: this.state.product.name
            },
            {
                label: "Price",
                value: this.state.product.price
            },
            {
                label: "Description",
                value: this.state.product.description
            },
            {
                label: "ProductId",
                value: this.state.product.productId
            }
        ];
        return (
            <div className="container" style={{ marginBottom: "10px" }}>
                <div className="text-center">
                    <img
                        src={getDetailImageUrl(this.state.product.productImage)}
                        alt="img"
                    />
                </div>
                <br />
                <div>{this.renderReadOnly(data)}</div>
                <div className="text-center">
                    <Button variant="danger" onClick={this.deleteProduct}>
                        Delete
                    </Button>
                </div>
            </div>
        );
    }

    deleteProduct = async () => {
        const response = await axios.post("/products/deleteProduct", {
            id: this.state.product._id
        });
        console.log(response, " deleted");
    };
}

export default withRouter(DetailedProduct);
