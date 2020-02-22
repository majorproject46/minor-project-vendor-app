import React from "react";
import { Form, Button } from "react-bootstrap";
import FormGroup from "../components/FormGroup";
import axios from "axios";
import { withRouter } from "react-router-dom";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isNameValid: null,
            phone: "",
            isPhoneValid: null,
            email: "",
            isEmailValid: null,
            password: "",
            isPasswordValid: null
        };
    }

    onNameChange = newValue => {
        this.setState({ name: newValue, isNameValid: true });
    };

    onPhoneChange = newValue => {
        this.setState({ phone: newValue, isPhoneValid: true });
    };

    onEmailChange = newValue => {
        this.setState({ email: newValue, isEmailValid: true });
    };

    onPasswordChange = newValue => {
        this.setState({ password: newValue, isPasswordValid: true });
    };

    isFormFieldsValid() {
        const {
            isNameValid,
            isPhoneValid,
            isEmailValid,
            isPasswordValid
        } = this.state;
        if (isNameValid && isPhoneValid && isEmailValid && isPasswordValid) {
            return true;
        }
        return false;
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (!this.isFormFieldsValid()) {
            return;
        }
        const { name, phone, email, password } = this.state;
        const data = {
            name,
            phone,
            email,
            password
        };
        console.log(data);
        try {
            const response = await axios.post("/auth/createUser", data);
            const { history } = this.props;
            console.log("props ", this.props);
            console.log(response);
            history.push("/home");
        } catch (error) {
            console.log(error);
        }
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

    render() {
        const data = [
            {
                label: "Full Name",
                type: "text",
                placeholder: "Enter Full Name",
                element: this.state.name,
                valueChange: this.onNameChange,
                isValid: this.state.isNameValid
            },
            {
                label: "Phone Number",
                type: "text",
                placeholder: "Enter Phone Number",
                element: this.state.phone,
                valueChange: this.onPhoneChange,
                isValid: this.state.isPhoneValid
            },
            {
                label: "Email",
                type: "email",
                placeholder: "Enter Email",
                element: this.state.email,
                valueChange: this.onEmailChange,
                isValid: this.state.isEmailValid
            },
            {
                label: "Password",
                type: "password",
                placeholder: "Enter Password",
                element: this.state.password,
                valueChange: this.onPasswordChange,
                isValid: this.state.isPasswordValid
            }
        ];
        return (
            <div className="container " style={{ marginTop: "10px" }}>
                <h2 align="center">SignUp Form</h2>
                <Form onSubmit={this.handleSubmit}>
                    {this.renderFormData(data)}
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(SignUp);
