import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import { userLogin } from "../actions/index";
import FormGroup from "../components/FormGroup";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isEmailValid: null,
            password: "",
            isPasswordValid: null
        };
    }

    onEmailChange = email => {
        this.setState({ email, isEmailValid: true });
    };

    onPasswordChange = password => {
        this.setState({ password, isPasswordValid: true });
    };

    isFormFieldsValid() {
        const { isEmailValid, isPasswordValid } = this.state;
        if (isEmailValid && isPasswordValid) {
            return true;
        }
        return false;
    }

    onFormSubmit = event => {
        event.preventDefault();
        if (!this.isFormFieldsValid()) {
            return;
        }
        this.props.userLogin({
            email: this.state.email,
            password: this.state.password
        });
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
            <div className="container" style={{ marginTop: "20px" }}>
                <h2 align="center">Login Page</h2>
                <Form onSubmit={this.onFormSubmit}>
                    {this.renderFormData(data)}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return state;
};

export default connect(
    mapStateToProps,
    { userLogin }
)(Login);
