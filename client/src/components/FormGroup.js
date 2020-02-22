import React from "react";
import { Form, Row, Col } from "react-bootstrap";

class FormGroup extends React.Component {
    render() {
        return (
            <Form.Group as={Row}>
                <Form.Label column sm="2">
                    {this.props.label}
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        required
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        value={this.props.element}
                        onChange={event =>
                            this.props.valueChange(event.target.value)
                        }
                        isValid={
                            this.props.isValid === null
                                ? false
                                : this.props.isValid
                        }
                        isInvalid={
                            this.props.isValid === null
                                ? false
                                : !this.props.isValid
                        }
                    />
                </Col>
            </Form.Group>
        );
    }
}

export default FormGroup;
