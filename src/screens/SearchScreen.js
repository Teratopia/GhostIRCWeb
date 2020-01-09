import React, { Component } from 'react';
//import constyles from '../styles/constyles';
//import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapMarkerIcon from '../components/MapMarkerIcon';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewSideView : false,
            myGhosts : null,
            myGhostLocations : null,
            selectedGhost : null
        }
        this.mapMarkerClickHandler = this.mapMarkerClickHandler.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('getUserGhosts', res => {
            console.log('getUserGhosts 1, res = ', res);
            if (res.success) {
                console.log('getUserGhosts success');
                let allLocs = [];
                res.ghosts.forEach(ghost => {
                    ghost.locations.forEach(location => {
                        allLocs.push(location);
                    })
                })
                this.setState({ myGhosts : res.ghosts,
                                myGhostLocations : allLocs
                            });
            } else {
                console.log(res.message);
            }
        });
        this.props.socket.emit('getUserGhosts', {
            userId : this.props.user._id
        })
    }

    mapMarkerClickHandler(position){
        console.log('mapMarkerClickHandler position = ', position);
        this.state.myGhosts.forEach(ghost => {
            if(position.ghostId === ghost._id){
                console.log('selected ghost = ', ghost);
                this.setState({selectedGhost : ghost});
            }
        })
    }

    componentWillUnmount() {
        this.props.socket.removeListener('getUserGhosts');
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
            
            <Col xs={12}>
                        <GoogleMapReact
                        style={{height : '90vh'}}
                        bootstrapURLKeys={{ key: 'AIzaSyB-N2bitfPMd84UXUTcAgIF0F4VICsWoGs' }}
                        defaultCenter={{
                            lng: -122.689243,
                            lat: 45.523208
                        }}
                        defaultZoom={16}
                        >

                                <FontAwesomeIcon 
                                                icon={faGhost} 
                                                color="black"
                                                lng={-122.0840178}
                                                lat={37.522}
                                                size="2x"
                                            />
                            

                            { this.state.myGhostLocations ? 
                                    this.state.myGhostLocations.map(position => {
                                            return <FontAwesomeIcon 
                                                style={{cursor: 'pointer'}}
                                                onClick={()=>{this.mapMarkerClickHandler(position)}}
                                                icon={faGhost} 
                                                color="black"
                                                lng={position.location.coordinates[0]}
                                                lat={position.location.coordinates[1]}
                                                size="2x"
                                                key={position._id}
                                            />
                                    })
                            : null }

                        </GoogleMapReact>
            </Col>
            </Row>
        </Container>
    };
}

export default SearchScreen;
