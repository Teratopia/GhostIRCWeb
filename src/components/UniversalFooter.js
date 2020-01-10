import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
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
        return <Container fluid style={{
            borderTop : '1px solid '+colors.secondary,
            
            //height : '3vh'
            //backgroundColor : 'yellow'
        }}>
            <Row>
                <Col xs={5}>

                </Col>
                <Col style={{...constyles.genH5Text, marginTop : '6px'}}>
                    Legal Lorem Ipsum
                </Col>
                <Col xs={5}>
                
                </Col>
            </Row>
        </Container>
    };
}

export default UniversalFooter;
