import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
//import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';



class MapMarkerIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillUnmount() {

    }

    render() {
        return <Container>
            {this.props.text}
        </Container>
    };
}

export default MapMarkerIcon;
