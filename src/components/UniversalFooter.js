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
        return <Container fluid style={{...constyles.centerContainer,
            borderTop : '1px solid '+colors.secondary,
        }}>
            <Row style={{...constyles.genH5Text, ...constyles.centerContainer}}>
                    Legal Lorem Ipsum
            </Row>
        </Container>
    };
}

export default UniversalFooter;
