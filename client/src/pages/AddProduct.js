import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import FormGroup from "../components/FormGroup";

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isNameValid: null,
            price: 0,
            isPriceValid: null,
            productId: "",
            isProductIdvalid: null,
            description: "",
            isDescriptionvalid: null,
            image: null,
            imageName: "Choose file",
            category: ""
        };
    }

    onNameChange = name => {
        this.setState({ name, isNameValid: true });
    };
    onPriceChange = price => {
        if (price === "" || price <= 0) {
            this.setState({ price, isPriceValid: false });
        } else {
            this.setState({ price, isPriceValid: true });
        }
    };
    onProductIdChange = productId => {
        this.setState({ productId, isProductIdvalid: true });
    };
    onDescriptionChange = description => {
        this.setState({ description, isDescriptionvalid: true });
    };

    renderFormData(data) {
        const view = data.map(
            (
                { label, type, placeholder, element, valueChange, isValid },
                index
            ) => {
                return (
                    <FormGroup
                        key={index}
                        label={label}
                        type={type}
                        element={element}
                        valueChange={valueChange}
                        placeholder={placeholder}
                        isValid={isValid}
                    />
                );
            }
        );
        return view;
    }

    onImageChange = event => {
        console.log(event.target.files);
        this.setState({
            image: event.target.files[0],
            imageName: event.target.files[0].name
        });
    };

    onCategoryChange = event => {
        console.log(event.target.value);
        this.setState({ category: event.target.value });
    };

    render() {
        const data = [
            {
                label: "Name",
                type: "text",
                placeholder: "Enter Product Name",
                element: this.state.name,
                valueChange: this.onNameChange,
                isValid: this.state.isNameValid
            },
            {
                label: "price",
                type: "number",
                placeholder: "Enter Price of the Product",
                element: this.state.price,
                valueChange: this.onPriceChange,
                isValid: this.state.isPriceValid
            },
            {
                label: "ProductId",
                type: "text",
                placeholder: "Enter ProductId",
                element: this.state.productId,
                valueChange: this.onProductIdChange,
                isValid: this.state.isProductIdvalid
            },
            {
                label: "Description",
                type: "textarea",
                placeholder: "Description",
                element: this.state.description,
                valueChange: this.onDescriptionChange,
                isValid: this.state.isDescriptionvalid
            }
        ];
        return (
            <div className="container" style={{ marginTop: "18px" }}>
                <h2 align="center">Product Form</h2>
                <Form onSubmit={this.onFormSubmit}>
                    {this.renderFormData(data)}
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Product Image
                        </Form.Label>
                        <Col sm="10">
                            <div>
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="inputGroupFile01"
                                            aria-describedby="inputGroupFileAddon01"
                                            onChange={this.onImageChange}
                                        />
                                        <label className="custom-file-label">
                                            {this.state.imageName}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Category
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                as="select"
                                value={this.state.category}
                                onChange={this.onCategoryChange}
                            >
                                <option>Choose...</option>
                                <option value="Dairy">Dairy Product</option>
                                <option value="Newspaper">Newspaper</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Others">Others</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

    areFormFieldsValid() {
        const {
            isNameValid,
            isPriceValid,
            isDescriptionvalid,
            isProductIdvalid
        } = this.state;
        if (
            isNameValid &&
            isDescriptionvalid &&
            isPriceValid &&
            isProductIdvalid
        ) {
            return true;
        }
        return false;
    }

    onFormSubmit = async event => {
        event.preventDefault();
        if (!this.areFormFieldsValid()) {
            return;
        }
        const formData = new FormData();
        formData.append("image", this.state.image);
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("price", this.state.price);
        formData.append("productId", this.state.productId);
        formData.append("category", this.state.category);
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        const response = await axios.post(
            "/products/addProduct",
            formData,
            config
        );
        console.log(response);
    };
}

export default AddProduct;
