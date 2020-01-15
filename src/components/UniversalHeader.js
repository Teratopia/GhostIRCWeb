import React, { Component } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faGhost, faUserCircle, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class UniversalHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillUnmount() {

    }

    render() {
        return <Container fluid style={{height : '40px', borderBottom : '1px solid '+colors.secondary, paddingTop : '2px'}}>
            <Row>
                <Col xs={2} style={{justifyContent : 'center', alignItems : 'center'}}>
                    <Row style={{marginTop : '3px'}}>

                        <Col 
                            style={{cursor: 'pointer'}}
                            onClick={()=>{this.props.setCurrentScreen('SEARCH')}}>
                            <Row>
                            <FontAwesomeIcon 
                                style={{margin : 'auto', justifyContent : 'center'}}
                                icon={faMap} 
                                color={this.props.currentScreen === 'SEARCH' ? colors.primary : 'black'}
                            /> 
                            </Row>
                            <Row style={{...constyles.genH6Text, textAlign : 'inherit', justifyContent : 'center'}}>
                            MAP
                            </Row>
                        </Col>
                        <Col 
                            style={{cursor: 'pointer'}}
                            onClick={()=>{this.props.setCurrentScreen('GHOSTS')}}>
                            <Row>
                            <FontAwesomeIcon 
                                style={{margin : 'auto', justifyContent : 'center'}}
                                icon={faGhost} 
                                color={this.props.currentScreen === 'GHOSTS' ? colors.primary : 'black'}
                            /> 
                            </Row>
                            <Row style={{...constyles.genH6Text, textAlign : 'inherit', justifyContent : 'center'}}>
                            GHOSTS
                            </Row>
                        </Col>
                        {
/*
                        <Col>
                            <Row>
                            <FontAwesomeIcon 
                                style={{margin : 'auto', justifyContent : 'center'}}
                                icon={faEnvelope} 
                                color={this.props.currentScreen === 'INBOX' ? colors.primary : 'black'}
                            /> 
                            </Row>
                            <Row style={{...constyles.genH6Text, textAlign : 'inherit', justifyContent : 'center'}}>
                            INBOX
                            </Row>
                        </Col>
*/
    }
    <Col>
    </Col>

                    </Row>
                </Col>
                <Col xs={2}>

                </Col>
                <Col style={{...constyles.genH3Text, marginBottom : '20px'}}>
                    GhostIRC
                </Col>
                <Col xs={2}>
                
                </Col>
                <Col xs={2} style={{justifyContent : 'center', alignItems : 'center'}}>
                    <Row style={{marginTop : '3px'}}>

                        <Col>

                        </Col>
                        <Col
                            style={{cursor: 'pointer'}}
                        >
                            <Row>
                            <FontAwesomeIcon 
                                style={{margin : 'auto', justifyContent : 'center'}}
                                icon={faUserCircle} 
                                color={this.props.currentScreen === 'PROFILE' ? colors.primary : 'black'}
                            /> 
                            </Row>
                            <Row style={{...constyles.genH6Text, textAlign : 'inherit', justifyContent : 'center'}}>
                            PROFILE
                            </Row>
                        </Col>
                        <Col
                            style={{cursor: 'pointer'}}
                        >
                            <Row>
                            <FontAwesomeIcon 
                                style={{margin : 'auto', justifyContent : 'center'}}
                                icon={faCog} 
                                color={this.props.currentScreen === 'SETTINGS' ? colors.primary : 'black'}
                            /> 
                            </Row>
                            <Row style={{...constyles.genH6Text, textAlign : 'inherit', justifyContent : 'center'}}>
                            SETTINGS
                            </Row>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Container>
    };
}

export default UniversalHeader;
