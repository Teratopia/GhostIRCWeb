import React, { Component } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            username: null,
            password: null,
            confPassword: null,
            isSigningUp: false,
            code: null,
            confCode: null

        }
        this.loginButtonHandler = this.loginButtonHandler.bind(this);
        this.signUpButtonHandler = this.signUpButtonHandler.bind(this);
        this.submitButtonHandler = this.submitButtonHandler.bind(this);
        this.socket = this.props.socket;
    }

    componentDidMount() {
        this.props.socket.on('loginUser', res => {
            console.log('login 1, res = ', res);
            if (res.success) {
                console.log('login success, res = ', res);
                this.props.setUser(res.user);
                this.props.setCurrentScreen('SEARCH');
            } else {
                console.log(res.message);
            }
        });
        this.props.socket.on('requestEmailVerification', res => {
            if (res.success) {
                console.log('res.code = ', res.code);
                this.setState({ code: res.code });
            } else {
                console.log(res.message);
            }
        });
    }

    componentDidUpdate() {
        //console.log('setState this.state = ', this.state);
    }

    loginButtonHandler() {
        if (this.state.email && this.state.password) {
            this.props.socket.emit('loginUser', {
                email: this.state.email,
                password: this.state.password,
                pnToken: 'test'
            });
        }
    }

    signUpButtonHandler() {
        if (this.state.isSigningUp) {
            this.setState({
                isSigningUp: false,
                code: null,
                confCode: null,
                confPassword: false,
            });
        } else {
            this.setState({ isSigningUp: true });
            this.props.socket.emit('requestEmailVerification', { email: this.state.email });
        }
    }

    submitButtonHandler() {
        console.log('submitButtonHandler 1');
        if (this.state.email &&
            this.state.username &&
            this.state.password &&
            this.state.code &&
            this.state.password === this.state.confPassword &&
            this.state.code === this.state.confCode) {
                console.log('submitButtonHandler 2');
            this.props.socket.emit('completeUserSignUp', {
                email: this.state.email,
                password: this.state.password,
                pnToken: 'test',
                username: this.state.username
            });
        }

    }

    componentWillUnmount() {
        this.props.socket.removeListener('loginUser');
        this.props.socket.removeListener('requestEmailVerification');
    }

    render() {

        return <Container fluid={true} style={{ 'marginTop': '40px' }}>
            <Row>
                <Col>
                <Row>
                        <FontAwesomeIcon 
                                style={{margin : 'auto', justifyContent : 'center'}}
                                icon={faGhost} 
                                color={colors.secondary}
                            /> 
                </Row>
                <Row xs={12}>
                    <h1 style={{...constyles.genH1Text, textAlign : 'center', margin : 'auto', justifyContent : 'center'}}>GhostIRC</h1>
                </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={4} />
                <Col>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            onChange={e => { this.setState({ email: e.target.value }) }}
                            value={this.email}
                        />
                    </Form.Group>
                </Col>
                <Col xs={4} />
            </Row>
            {this.state.isSigningUp ?
                <Row>
                    <Col xs={4} />
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                onChange={e => { this.setState({ username: e.target.value }) }}
                                value={this.username}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={4} />
                </Row>
                : null}

            <Row>
                <Col xs={4} />
                <Col>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            onChange={e => { this.setState({ password: e.target.value }) }}
                            value={this.password}
                        />
                    </Form.Group>
                </Col>
                <Col xs={4} />
            </Row>
            {this.state.isSigningUp ?
                <Row>
                    <Col xs={4} />
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Re-enter Password"
                                onChange={e => { this.setState({ confPassword: e.target.value }) }}
                                value={this.confPassword}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={4} />
                </Row>
                : null}
            {this.state.isSigningUp ?
                <Row>
                    <Col xs={4} />
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Verification Code</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Re-enter Password"
                                onChange={e => { this.setState({ confCode: e.target.value }) }}
                                value={this.confCode}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={4} />
                </Row>
                : null}
            <Row>
                <Col xs={4} />
                {
                    !this.state.isSigningUp ?
                        <Col>
                            <Button
                                block
                                onClick={this.loginButtonHandler}>
                                Log In
                                </Button>

                            <Button
                                block
                                onClick={this.signUpButtonHandler}>
                                Sign Up
                                </Button>
                        </Col>
                        :
                        <Col>
                            <Button block
                                onClick={this.submitButtonHandler}>
                                Submit
                                </Button>

                            <Button
                                block
                                onClick={this.signUpButtonHandler}>
                                Cancel
                                </Button>
                        </Col>
                }
                <Col xs={4} />
            </Row>
        </Container>
        //return <h1>test</h1>
        /*
        return <div style={styles.centerContainer}>
            <h1 style={constyles.genH1Text}>GhostIRC</h1>
            <div
                style={{ margin: 'auto', textAlign: 'center' }}
                onSubmit={this.handleSubmit}>
                <div style={styles.textInputLabel}>Email:</div>
                <input
                    style={constyles.genTextInput}
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange} />
                <div style={styles.textInputLabel}>Password:</div>
                <input
                    style={constyles.genTextInput}
                    type="text"
                    value={this.state.password}
                    onChange={this.handleChange} />
                <button
                    style={constyles.inactiveButton}
                    onclick="activateLasers()">
                    Log In
                </button>
                <button
                    style={constyles.inactiveButton}
                    onclick="activateLasers()">
                    Sign Up
                </button>
            </div>
        </div>
        */



    };
}

var styles = {
    textInputLabel: {
        ...constyles.genH5Text,
        color: colors.secondary
    },
    centerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    }
}

export default LoginScreen;
