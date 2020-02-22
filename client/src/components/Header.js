import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";

import { userLogout } from "../actions/index";

class Header extends React.Component {
    renderAuthStatus() {
        if (this.props.auth != null) {
            return (
                <Nav>
                    <Nav.Link onClick={() => this.props.userLogout()}>
                        Logout
                    </Nav.Link>
                </Nav>
            );
        }
        return (
            <Nav>
                <Link
                    style={{
                        color: "white",
                        textDecoration: "none",
                        marginTop: "7px",
                        marginRight: "5px"
                    }}
                    to="/login"
                >
                    Login
                </Link>
                <Link
                    style={{
                        color: "white",
                        textDecoration: "none",
                        marginTop: "7px",
                        marginRight: "5px"
                    }}
                    to="/signup"
                >
                    SignUp
                </Link>
            </Nav>
        );
    }

    render() {
        return (
            <div>
                <Navbar
                    collapseOnSelect
                    expand="sm"
                    className="bg-primary"
                    bg="primary"
                    variant="dark"
                >
                    <Navbar.Brand>
                        <NavLink
                            to="/"
                            activeStyle={{
                                color: "white",
                                textDecoration: "none"
                            }}
                        >
                            Vendor App
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to="/home" style={{ color: "white" }}>
                                Home
                            </NavLink>
                        </Nav>
                        {this.renderAuthStatus()}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(
    mapStateToProps,
    {
        userLogout
    }
)(Header);
