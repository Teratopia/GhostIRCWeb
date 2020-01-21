import React, { Component } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapMarkerIcon from '../components/MapMarkerIcon';
import GhostsInteractionScreen from './GhostsInteractionScreen';
import moment from 'moment';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewSideView: false,
            myGhosts: null,
            myGhostLocations: null,
            selectedGhost: null,
            locationsWithGhosts: []
        }
        this.mapMarkerClickHandler = this.mapMarkerClickHandler.bind(this);
        this.nullifySelectedGhost = this.nullifySelectedGhost.bind(this);
    }

    componentDidMount() {
        /*
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
                this.setState({
                    myGhosts: res.ghosts,
                    myGhostLocations: allLocs
                });
            } else {
                console.log(res.message);
            }
        });
        */
        this.props.socket.on('getAllGhostsWithinRadius', res => {
            console.log('getAllGhostsWithinRadius res = ', res);
            this.setState({
                locationsWithGhosts: res.locationsWithGhosts
            })
        })
        if (navigator.geolocation) {
            console.log('if navigator.geolocation');
            navigator.geolocation.getCurrentPosition(position => {
                this.props.socket.emit('getAllGhostsWithinRadius', {
                    radiusInMeters: 1000,
                    centerLong: position.coords.longitude,
                    centerLat: position.coords.latitude
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        this.props.socket.on('getAllGhostInfoById', res => {
            if(res.success){
                this.setState({
                    selectedGhost : res.ghost
                });
            }
        })
        /*
        this.props.socket.emit('getUserGhosts', {
            userId: this.props.user._id
        });
        */
    }

    mapMarkerClickHandler(ghostLocation) {
        console.log('mapMarkerClickHandler ghostLocation = ', ghostLocation);

        this.props.socket.emit('getAllGhostInfoById', {
            ghostId : ghostLocation.ghost._id
        });

        /*
        this.setState({
            selectedGhost: ghostLocation.ghost
        });
        */
        /*
        console.log('mapMarkerClickHandler position = ', position);
        this.state.myGhosts.forEach(ghost => {
            if(position.ghostId === ghost._id){
                console.log('selected ghost = ', ghost);
                this.setState({selectedGhost : ghost});
            }
        })
        */
    }

    nullifySelectedGhost() {
        this.setState({
            selectedGhost: null
        });
    }


    componentWillUnmount() {
        this.props.socket.removeListener('getUserGhosts');
        this.props.socket.removeListener('getAllGhostsWithinRadius');
    }

    render() {
        return <Container fluid
        //style={{height : '100%'}}
        >
            <Row>
                {this.state.viewSideView ?
                    <Col style={{ backgroundColor: 'blue' }}>
                        foo
                </Col>
                    : null}


                {
                    this.state.selectedGhost ?
                        <Col xs={6}>
                            <GhostsInteractionScreen
                                socket={this.props.socket}
                                user={this.props.user}
                                ghost={this.state.selectedGhost}
                                onSearchScreen={true}
                                pnToken="test"
                                nullifySelectedGhost={this.nullifySelectedGhost}
                            />
                        </Col>
                        :
                        null
                }

                <Col xs={this.state.selectedGhost ? 6 : 12} style={{ position: 'relative' }}>
                    <GoogleMapReact
                        style={{ height: '90vh' }}
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

                        {
                            /*
                        this.state.myGhostLocations ?
                            this.state.myGhostLocations.map(position => {
                                return <OverlayTrigger
                                    key={position._id}
                                    placement={'auto'}
                                    overlay={
                                        <Tooltip id={`tooltip-${position._id}`}>
                                            Tooltip on <strong>{position._id}</strong>.
                                        </Tooltip>
                                    }
                                >

                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { this.mapMarkerClickHandler(position) }}
                                        icon={faGhost}
                                        color="black"
                                        lng={position.location.coordinates[0]}
                                        lat={position.location.coordinates[1]}
                                        size="2x"
                                        key={position._id}
                                    />
                                </OverlayTrigger>
                            })
                            : null
                            */
                            }
                        {this.state.locationsWithGhosts ?
                            this.state.locationsWithGhosts.map(ghostLocation => {
                                return <OverlayTrigger
                                    key={ghostLocation._id}
                                    lng={ghostLocation.location.coordinates[0]}
                                    lat={ghostLocation.location.coordinates[1]}
                                    placement={'auto'}
                                    overlay={
                                        <Popover id="popover-basic">
                                            <Popover.Title as="h3">{ghostLocation.ghost.name} - {ghostLocation.ghost.type}</Popover.Title>
                                            <Popover.Content>
                                            {ghostLocation.ghost.baseChatCards &&
                                            ghostLocation.ghost.baseChatCards.length > 0 ? 
                                            ghostLocation.ghost.baseChatCards[0].text : 
                                            null}
                                            <Row style={{...constyles.genH6Text, ...constyles.centerContainer}}>
                                                {moment(ghostLocation.ghost.createDate).format("MMM Do YYYY")}
                                            </Row>
                                            </Popover.Content>
                                        </Popover>
                                    }
                                >

                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { this.mapMarkerClickHandler(ghostLocation) }}
                                        icon={faGhost}
                                        color={this.state.selectedGhost && ghostLocation.ghost._id === this.state.selectedGhost._id ? 
                                            colors.primary : 
                                            ghostLocation.ghost.moderatorIds.includes(this.props.user._id) ? 
                                            colors.tertiary :
                                            this.props.user.ghostFriendIds.includes(ghostLocation.ghost._id) ? 
                                            'gold' :
                                            colors.dark
                                        }
                                        size="2x"
                                        key={ghostLocation._id}
                                    />
                                </OverlayTrigger>
                            })
                            : null
                        }

                    </GoogleMapReact>
                </Col>
                {this.state.selectedGhost ?
                    <div style={{
                        width: '10%',
                        height: '90vh',
                        'z-index': 10,
                        position: 'absolute',
                        marginLeft: '48.9%',
                        background: "linear-gradient(to left, rgba(0, 0, 0, 0.0), white)"
                    }}>
                    </div>
                    : null}
            </Row>
        </Container>
    };
}

export default SearchScreen;
