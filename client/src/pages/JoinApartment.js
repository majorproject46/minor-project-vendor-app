import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import { getDetailImageUrl } from "../helpers/index";

class JoinApartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartmentDetails: null
        };
    }
    componentDidMount() {
        this.getApartmentDetails();
    }

    getApartmentDetails = async () => {
        const response = await axios.post("/products/getApartmentDetails", {
            id: this.props.match.params.id
        });
        this.setState({ apartmentDetails: response.data.apartmentDetails });
    };

    renderApartmentDetails() {
        if (this.state.apartmentDetails !== null) {
            const {
                name,
                apartmentImage,
                description
            } = this.state.apartmentDetails;
            return (
                <div>
                    <div
                        className="text-center"
                        style={{
                            backgroundColor: "#f1f5e4",
                            paddingTop: "10px",
                            paddingBottom: "10px"
                        }}
                    >
                        <img
                            src={getDetailImageUrl(apartmentImage)}
                            alt="Apartment"
                        />
                    </div>

                    <p>{name}</p>
                    <p>{description}</p>
                    <Button variant="success" onClick={this.linkApartment}>
                        Link Apartment
                    </Button>
                </div>
            );
        }
    }

    linkApartment = async () => {
        const apartmentId = this.props.match.params.id;
        const response = await axios.post("/products/joinApartment", {
            apartmentId
        });
        console.log(response);
    };

    render() {
        return (
            <div style={{ marginTop: "18px" }}>
                <h2 align="center"> Apartment Details</h2>
                {this.renderApartmentDetails()}
            </div>
        );
    }
}

export default JoinApartment;
