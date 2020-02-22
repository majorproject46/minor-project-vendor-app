import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import _ from "lodash";

import { getThumbnailUrl } from "../helpers/index";

class LinkApartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments: []
        };
    }

    componentDidMount() {
        this.getApartments();
    }

    getApartments = async () => {
        const response = await axios.get("/products/getApartments");
        this.setState({ apartments: response.data.apartments });
    };

    renderApartmentsList() {
        if (this.state.apartments.length === 0) {
            return <div>No Apartments Found</div>;
        }
        return this.state.apartments.map((apartment, index) => {
            return (
                <Link
                    to={`/apartments/join/${apartment._id}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                >
                    <Card bg="light" style={{ width: "100%" }}>
                        <Card.Body>
                            <Card.Title>
                                <img
                                    src={getThumbnailUrl(
                                        apartment.apartmentImage
                                    )}
                                    alt="Apartment"
                                />
                                {apartment.name}
                            </Card.Title>
                            <Card.Text>
                                {_.capitalize(apartment.city)}
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
                <h2 align="center">List of Apartments</h2>
                <div className="container">{this.renderApartmentsList()}</div>
            </div>
        );
    }
}

export default LinkApartment;
