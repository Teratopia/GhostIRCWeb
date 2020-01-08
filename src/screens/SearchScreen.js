import React, { Component } from 'react';
//import constyles from '../styles/constyles';
//import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';



class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }


    componentWillUnmount() {

    }

    render() {
        return <Container fluid 
        //style={{height : '100%'}}
        >
            <Row>
            <Col style={{backgroundColor : 'blue'}}>
                foo
            </Col>
            <Col xs={10} fluid 
            //style = {{height:"100%"}}
            >
                        <GoogleMapReact
                        style={{height : '90vh'}}
                        bootstrapURLKeys={{ key: 'AIzaSyB-N2bitfPMd84UXUTcAgIF0F4VICsWoGs' }}
                        defaultCenter={{
                            lat: 45.523208,
                            lng: -122.689243
                        }}
                        defaultZoom={11}
                        >


                        </GoogleMapReact>
            </Col>
            <Col style={{backgroundColor : 'blue'}}>
                bar
            </Col>
            </Row>
        </Container>
    };
}

export default SearchScreen;
