import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";

import { getProducts } from "../actions/index";
import { getThumbnailUrl } from "../helpers/index";

class Products extends React.Component {
    componentDidMount() {
        this.props.getProducts();
    }

    renderProducts() {
        console.log(this.props.products);
        if (this.props.products === null) {
            return <div>Loading</div>;
        }
        if (
            typeof this.props.products === Array &&
            !this.props.products.isEmpty()
        ) {
            return <div>Products Not Added!</div>;
        }
        return this.props.products.map((product, index) => {
            return (
                <Link
                    to={`/products/detail/${product._id}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                >
                    <Card bg="light" style={{ width: "100%" }}>
                        <Card.Body>
                            <Card.Title>
                                <img
                                    src={getThumbnailUrl(product.productImage)}
                                    alt="Product"
                                />
                                {product.name}
                            </Card.Title>
                            <Card.Text>
                                <span style={{ fontSize: "1.5rem" }}>
                                    <b>Rs.{product.price}</b>
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            );
        });
    }

    render() {
        return (
            <div style={{ marginTop: "18px" }}>
                <h2 align="center">Products</h2>

                <div className="container">
                    <h4>Added Products</h4>
                    {this.renderProducts()}
                </div>

                <Link to="/products/addPage" style={{ textDecoration: "none" }}>
                    <Button
                        style={{
                            position: "fixed",
                            bottom: "5%",
                            right: "5%",
                            borderRadius: "25px"
                        }}
                    >
                        Add product
                    </Button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = ({ products }) => {
    return {
        products
    };
};

export default connect(mapStateToProps, { getProducts })(Products);
