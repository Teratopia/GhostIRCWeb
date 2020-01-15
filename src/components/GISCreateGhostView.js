import React, { Component } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, ButtonGroup, Row, Container, Col, Form } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faGhost, faUserCircle, faCog, faThList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class GISCreateGhostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ghostName : '',
            baseChatCardText : '',
            ghostType : 'SPRITE',
            ghostEctoCost : '100',
            ghostTypeDescription : "Sprites are the most common ghosts. They typically appear in one location but they can inhabit many. People can speak with a befriended Sprite from anywhere and can view them on the map, unless they are Shaded.",
            position : null
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({position : position})
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            this.state.ghostType = 'SHADOW';
            this.state.ghostEctoCost = '0';
            this.state.ghostTypeDescription = "Shadows are the rarest and most unique ghost type. They are not attached to a location at all-- they are connected to a single living person. Creating a Shadow means making a one of a kind ghost just for you.";
        }
        this.requestLocationAccess = this.requestLocationAccess.bind(this);
        this.postGhost = this.postGhost.bind(this);
    }

    componentWillUnmount() {

    }

    requestLocationAccess(){
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({position : position})
        });
    }

    postGhost(){
        this.props.socket.emit('createSprite', {
            userId : this.props.user._id,
            name : this.state.ghostName,
            type : this.state.ghostType,
            chatCardText : this.state.baseChatCardText,
            latitude: this.state.position.coords.latitude,
            longitude: this.state.position.coords.longitude,
          });
    }

    render() {
        return <Container fluid style={{height : '90vh'}}>

            <Row>
                <Col>

                <Container fluid style={{...constyles.genH5Text, marginTop : '12px', textAlign : 'center'}}>
                    Name
                </Container>
                <Form.Group xs="12" controlId="ghostNameInput" style={{
                        //width: '100%',
                        //height: '100%',
                        marginTop: '4px'
                    }}>
                        <Form.Control
                            style={{
                                marginBottom: '0px',
                                justifyContent: 'center',
                                textAlign: 'center',
                                width: '100%',
                                //height: '100%',
                                //maxHeight: '100%',
                                fontSize: '24px',
                                fontWeight: '200',
                                //border: '0px',
                                padding : '24px'
                            }}
                            as="input"
                            type="text"
                            placeholder="e.g. Winston"
                            onChange={e => this.setState({ ghostName: e.target.value })}
                            //defaultValue={this.state.newChatCardText}
                            value={this.state.ghostName}

                        />
                </Form.Group>
                <Container fluid style={{...constyles.genH5Text, marginTop : '12px', textAlign : 'center'}}>
                    Ghost Type
                </Container>
                <ButtonGroup style={{marginTop : '4px', alignItems : 'center', justifyContent : 'center', width : '100%'}}>
                    <Button block
                    onClick={()=>this.setState({
                        ghostType : 'SPRITE',
                        ghostEctoCost : '100',
                        ghostTypeDescription : "Sprites are the most common ghosts. They typically appear in one location but they can inhabit many. People can speak with a befriended Sprite from anywhere and can view them on the map, unless they are Shaded."
                    })}
                    style={this.state.ghostType === 'SPRITE' ? {backgroundColor : colors.primary, marginTop : '8px'} : {backgroundColor : colors.secondary, marginTop : '8px'}}
                    >Sprite</Button>
                    <Button block
                    disabled={!this.state.position}
                    onClick={()=>this.setState({
                        ghostType : 'WISP',
                        ghostEctoCost : '500+',
                        ghostTypeDescription : "Will-o'-the-Wisps are rare, elusive ghosts that lead friendly travellers to new locations. Always visible on the map, the Ecto cost of a Wisp varies by the distance of the path it creates."
                    })}
                    style={this.state.ghostType === 'WISP' ? {backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}
                    >Wisp</Button>
                    <Button block
                    disabled={!this.state.position}
                    onClick={()=>this.setState({
                        ghostType : 'CHANNEL',
                        ghostEctoCost : '1000+',
                        ghostTypeDescription : "Channels are not ghosts, per se, more like conduits for interacting with others. Visible on the map unless they are shaded, you may only contribute to a channel when within its radius. The Ecto cost of a channel varies by its diamater."
                })}
                    style={this.state.ghostType === 'CHANNEL' ? {backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}
                    >Channel</Button>
                    <Button block
                    disabled={!this.state.position}
                    onClick={()=>this.setState({
                        ghostType : 'EIDOLON',
                        ghostEctoCost : '10,000',
                        ghostTypeDescription : "Creating an Eidolon is a difficult and venerable task that should not be taken lightly. An Eidolon is akin to a Sprite, but with an important distinction: Eidola represent real figures from history."
                    })}
                    style={this.state.ghostType === 'EIDOLON' ? {backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}
                    >Eidolon</Button>
                    <Button block
                    disabled={!this.state.position}
                    onClick={()=>this.setState({
                        ghostType : 'ESSENCE',
                        ghostEctoCost : '10,000',
                        ghostTypeDescription : "Creating an Essence is a difficult and venerable task that should not be taken lightly. An Essence is akin to a Sprite, but with an important distinction: Essences represent real life entities."
                    })}
                    style={this.state.ghostType === 'ESSENCE' ? {backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}>
                    Essence</Button>
                    <Button block
                    disabled={!this.state.position}
                    onClick={()=>this.setState({
                        ghostType : 'SHADOW',
                        ghostEctoCost : '0',
                        ghostTypeDescription : "Shadows are the rarest and most unique ghost type. They are not attached to a location at all-- they are connected to a single living person. Creating a Shadow means making a one of a kind ghost just for you."
                    
                    })}
                    style={this.state.ghostType === 'SHADOW' ? {backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}
                    >Shadow</Button>
                </ButtonGroup>
                {
                    !this.state.position ? 
                    <Button 
                    block
                    onClick={this.requestLocationAccess}
                    style={{marginTop : '4px'}} variant="link">Some ghost types are only available if location access is enabled. Click here to request location access.</Button>
                    :
                    null
                }
                
                <Container fluid style={{...constyles.genH5Text, marginTop : '4px', textAlign : 'center'}}>
                    Cost: {this.state.ghostEctoCost} Ecto
                </Container>
                <Container fluid style={{...constyles.genH6Text, marginTop : '4px', textAlign : 'center'}}>
                    {this.state.ghostTypeDescription}
                </Container>
                <Container fluid style={{...constyles.genH5Text, marginTop : '12px', textAlign : 'center'}}>
                    Initial Chat Card
                </Container>
                <Form.Group xs="12" controlId="baseChatCardTextInput" style={{
                        width: '100%',
                        //height: '100%',
                        //padding : '20px',
                        marginTop: '4px'
                    }}>
                        <Form.Control
                            style={{
                                //backgroundColor : 'red', 
                                marginBottom: '0px',
                                justifyContent: 'center',
                                //textAlign: 'center',
                                width: '100%',
                                //height: '100%',
                                //maxHeight: '100%',
                                fontSize: '24px',
                                fontWeight: '200',
                                //border: '0px',
                                padding : '24px'
                            }}
                            as="textarea"
                            placeholder="e.g. Hi! I'm Winston, what can I help you with?"
                            onChange={e => this.setState({ baseChatCardText: e.target.value })}
                            //defaultValue={this.state.newChatCardText}
                            value={this.state.baseChatCardText}

                        />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Button block
                            style={{backgroundColor : colors.primary}}
                            onClick={this.postGhost}>
                                SUBMIT
                            </Button>
                        </Col>
                        {
                            /*
<Col>
                            <Button block
                            style={{backgroundColor : colors.secondary}}
                            onClick={()=>this.props.setGhost(null)}>
                                CANCEL
                            </Button>
                        </Col>
                            */
                        }
                        
                    </Row>

                </Col>
            </Row>
        </Container>
    };
}

export default GISCreateGhostView;
