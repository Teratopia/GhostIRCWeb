import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
//import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';



class UniversalHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillUnmount() {

    }

    render() {
        return <Container fluid style={{height : '5vh'}}>
            <Row>
                <Col xs={5} style={{backgroundColor : 'yellow'}}>

                </Col>
                <Col style={constyles.genH3Text}>
                    GhostIRC
                </Col>
                <Col xs={5} style={{backgroundColor : 'yellow'}}>
                
                </Col>
            </Row>
        </Container>
    };
}

export default UniversalHeader;
