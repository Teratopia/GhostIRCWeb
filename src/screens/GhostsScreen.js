import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Badge, Tabs, Tab, Card } from 'react-bootstrap';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GhostInteractionView from '../components/GhostInteractionView';
import MyGhostsChatCardListView from '../components/MyGhostsChatCardListView';
import GhostScreenGhostListView from '../components/GhostScreenGhostListView';
import CreateGhostView from '../components/CreateGhostView';

class GhostsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myGhosts : null,
            friendlyGhosts : null,
            selectedGhost : null,
            routingChatCard : null,
            responseRequestBeingHandled : null,
            chatCards : null,
            newResponseText: null,
            currentChatCard: null,
            chatCardHistory : [],
            creatingNewGhost : false
        }
        this.setGhost = this.setGhost.bind(this);
        this.setRoutingChatCard = this.setRoutingChatCard.bind(this);
        this.confirmRoute = this.confirmRoute.bind(this);
        this.jumpToCardHandler = this.jumpToCardHandler.bind(this);
        this.setResponseRequestBeingHandled = this.setResponseRequestBeingHandled.bind(this);
        this.submitNewCard = this.submitNewCard.bind(this);
        this.postNewResponseRequest = this.postNewResponseRequest.bind(this);
        this.removeResponseRequestBeingHandled = this.removeResponseRequestBeingHandled.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('getUserGhostsByUserId', res => {
            console.log('getUserGhostsByUserId 1, res = ', res);
            if (res.success) {
                console.log('getUserGhostsByUserId success');
                this.setState({myGhosts : res.ghosts});
            } else {
                console.log(res.message);
            }
        });
        this.props.socket.emit('getUserGhostsByUserId', {
            userId : this.props.user._id
        })
        this.props.socket.on('getAllDetailedChatCardsForGhostById', res => {
            console.log('getAllDetailedChatCardsForGhostById res = ', res);
            if (res.success) {
                console.log('getAllDetailedChatCardsForGhostById success');
                this.setState({
                    chatCards: res.chatCards
                });
            }
        });
        //
        this.props.socket.on('updateGhost', res => {
            console.log('updateGhost res = ', res);
            if (res.success) {
                this.setState({selectedGhost : res.ghost});
            } else {
                console.log('update ghost error = ', res.message);
            }
        });
        this.props.socket.on('updateChatCard', res => {
            console.log('updateChatCard res = ', res);
            if (res.success) {
                let updateObj = {
                    newResponseText: null,
                    newChatCardText: null,
                    currentChatCard: res.chatCard
                };
                if (this.state.chatCardHistory.length === 0){
                    updateObj.chatCardHistory = [res.chatCard._id];
                } else if(this.state.chatCardHistory.length > 1 && 
                    this.state.chatCardHistory[this.state.chatCardHistory.length - 2] === res.chatCard._id){
                    let clone = [...this.state.chatCardHistory];
                    clone.splice(this.state.chatCardHistory.length -1, 1);
                    updateObj.chatCardHistory = clone;
                } else if(this.state.chatCardHistory[this.state.chatCardHistory.length - 1] !== res.chatCard._id) {
                    console.log(' on updateChatCard if');
                    updateObj.chatCardHistory = [...this.state.chatCardHistory, res.chatCard._id];
                }
                if(this.state.chatCards && !this.state.chatCards.includes(res.chatCard)){
                    this.props.socket.emit('getAllDetailedChatCardsForGhostById', {ghostId : this.state.selectedGhost._id});
                }
                this.setState(updateObj);
            } else {
                console.log('updateChatCard error = ', res.message);
            }
        });
        this.props.socket.on('createGhost', res => {
            console.log('createGhost res = ', res);
            if(res.success){
                this.setGhost(res.ghost);
                this.props.socket.emit('getUserGhostsByUserId', {
                    userId : this.props.user._id
                })
            }
        })
        if (this.props.ghost && this.props.ghost.baseChatCards && this.props.ghost.baseChatCards.length > 0) {
            console.log('props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))] = ', this.props.ghost.baseChatCards[Math.floor(Math.random() * (this.props.ghost.baseChatCards.length - 1))]);
            this.props.socket.emit('getChatCardById', {
                chatCardId: this.props.ghost.baseChatCards[Math.floor(Math.random() * (this.props.ghost.baseChatCards.length - 1))]._id
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        console.log('ghostScreen prevProps = ', prevProps);
        console.log('ghostScreen current Props = ', this.props);
        console.log('ghostScreen prevState = ', prevState);
        console.log('ghostScreen current State = ', this.state);
    }

    componentWillUnmount() {
        //
        this.props.socket.removeListener('getUserGhostsByUserId');
        //getAllChatCardForGhostByGhostId
        this.props.socket.removeListener('getAllDetailedChatCardsForGhostById');
        this.props.socket.removeListener('updateGhost');
        this.props.socket.removeListener('updateChatCard');
    }

    removeResponseRequestBeingHandled(){
        this.setState({responseRequestBeingHandled : null})
    }

    setGhost(ghost, createNew){
        console.log('setGhost ghost = ', ghost);
        let update = {
            selectedGhost : ghost,
            routingChatCard : null,
            responseRequestBeingHandled : null,
            chatCards : null,
            newResponseText: null,
            currentChatCard: null,
            chatCardHistory : [],
            creatingNewGhost : false
        };
        if(createNew){
            update.creatingNewGhost = true;
        }
        this.setState(update);

        if (ghost && ghost.baseChatCards && ghost.baseChatCards.length > 0) {
            console.log('setGhost if ');
            console.log('ghost.baseChatCards[ Math.floor(Math.random() * (ghost.baseChatCards.length - 1))]._id = ', ghost.baseChatCards[ Math.floor(Math.random() * (ghost.baseChatCards.length - 1))]._id);
            this.props.socket.emit('getChatCardById', {
                chatCardId: ghost.baseChatCards[ Math.floor(Math.random() * (ghost.baseChatCards.length - 1))]._id
            });
        }
        this.render();
    }

    setRoutingChatCard(chatCard){
        if(this.state.routingChatCard === chatCard){
            this.setState({routingChatCard : null});
        } else {
            this.setState({routingChatCard : chatCard});
        }
    }

    jumpToCardHandler(){
        if(this.state.routingChatCard){
            this.props.socket.emit('getChatCardById', {
                chatCardId : this.state.routingChatCard._id
            });
        }
    }

    setResponseRequestBeingHandled(response){
        console.log('setResponseRequestBeingHandled response = ', response);
        this.setState({responseRequestBeingHandled : response});
    }

    submitNewCard(text){
        console.log('submitNewCard text = ', text);
        if(text && this.state.responseRequestBeingHandled){
            var req = {
                ghostId : this.state.selectedGhost._id,
                text : text,
                userId : this.props.user._id,
                responseId : this.state.responseRequestBeingHandled._id,
                originChatCardId : this.state.currentChatCard._id
            };
            console.log('postNewChatCard req = ', req);
            this.props.socket.emit('postNewChatCard', req);
        }
    }

    postNewResponseRequest(text){
        console.log('postNewResponseRequest text = ', text);
        this.props.socket.emit('addResponseRequestToChatCard', {
            chatCardId : this.state.currentChatCard._id,
            text : text,
            userId : this.props.user._id
        });
    }

    confirmRoute(){

    }

    render() {
        
        return <Container fluid style={{height : '90vh', marginBottom : '4px'}}>
            <Row>
                <Col xs={3} >
                    <GhostScreenGhostListView
                        socket={this.props.socket}
                        user={this.props.user}
                        myGhosts={this.state.myGhosts}
                        setGhost={this.setGhost}
                        selectedGhost={this.state.selectedGhost}
                        scrollHeight="73vh"
                    />
                </Col>
                <Col xs={6}>
                        { this.state.selectedGhost && this.state.currentChatCard ? 
                            <GhostInteractionView
                                ghost={this.state.selectedGhost}
                                user={this.props.user}
                                socket={this.props.socket}
                                setGhost={this.setGhost}
                                setResponseRequestBeingHandled={this.setResponseRequestBeingHandled}
                                responseRequestBeingHandled={this.state.responseRequestBeingHandled}
                                currentChatCard={this.state.currentChatCard}
                                allChatCards={this.state.allChatCards}
                                newChatCardText={this.state.newChatCardText}
                                newResponseText={this.state.newResponseText}
                                chatCardHistory={this.state.chatCardHistory}
                                submitNewCard={this.submitNewCard}
                                postNewResponseRequest={this.postNewResponseRequest}
                            />
                        : this.state.creatingNewGhost ? 
                            <CreateGhostView 
                                user={this.props.user}
                                socket={this.props.socket}
                                setGhost={this.setGhost}
                            />
                    : null}
                </Col>
                <Col xs={3}>
                    {
                        this.state.selectedGhost ? 
                        <MyGhostsChatCardListView 
                            user={this.props.user}
                            ghost={this.state.selectedGhost}
                            chatCards={this.state.chatCards}
                            socket={this.props.socket}
                            routingChatCard={this.state.routingChatCard}
                            setRoutingChatCard={this.setRoutingChatCard}
                            confirmRoute={this.confirmRoute}
                            isRouting={this.state.responseRequestBeingHandled}
                            scrollHeight="73vh"
                        />
                        : null
                    }
                    
                </Col>
            </Row>
        </Container>
    };
}

const styles = {
    ghostCard : { 
        //width: '18rem', 
        marginTop : '8px', 
        marginRight : '8px',
        cursor: 'pointer' 
    }
}

export default GhostsScreen;
