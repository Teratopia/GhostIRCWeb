import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
//import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';



class UniversalFooter extends Component {
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
                <Col xs={5}>

                </Col>
                <Col style={constyles.genH5Text}>
                    Legal Lorem Ipsum
                </Col>
                <Col xs={5}>
                
                </Col>
            </Row>
        </Container>
    };
}

export default UniversalFooter;
