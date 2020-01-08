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
        return <Container fluid>
            <Row>

            
            <Col>
roo
            </Col>

            <Col xs={10} fluid style = {{height:"100vh", backgroundColor : 'blue'}}>
                <div style={{height : '5%'}}/>
            <div style={
                //{width : '400px', height : '400px'}
                {width : '100%', height : '90%'}
                }>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyB-N2bitfPMd84UXUTcAgIF0F4VICsWoGs' }}
                    defaultCenter={{
                        lat: 45.523208,
                        lng: -122.689243
                    }}
                    defaultZoom={11}
                    ></GoogleMapReact>
            </div>
            <div style={{height : '5%'}}/>
            </Col>
            
            <Col>
            bar
            </Col>
            </Row>
        </Container>
    };
}

export default SearchScreen;
