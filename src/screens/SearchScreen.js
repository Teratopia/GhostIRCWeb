import React, { Component } from 'react';
//import constyles from '../styles/constyles';
//import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewSideView : false
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
            {this.state.viewSideView ?
                <Col style={{backgroundColor : 'blue'}}>
                    foo
                </Col>
            :null}
            
            <Col xs={12} 
            //style = {{height:"100%"}}
            >
                        <GoogleMapReact
                        style={{height : '90vh'}}
                        bootstrapURLKeys={{ key: 'AIzaSyB-N2bitfPMd84UXUTcAgIF0F4VICsWoGs' }}
                        defaultCenter={{
                            lat: 45.523208,
                            lng: -122.689243
                        }}
                        defaultZoom={16}
                        >
                            <FontAwesomeIcon 
                                icon={faGhost} 
                                color="black"
                                lat={45.523228}
                                lng={-122.689243}
                                size="2x"
                            />

                        </GoogleMapReact>
            </Col>
            </Row>
        </Container>
    };
}

export default SearchScreen;
