import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Card } from 'react-bootstrap';
import moment from 'moment';
import ChatCardResponseListView from './ChatCardResponseListView';

class GhostInteractionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChatCard: null,
            allChatCards: null,
            newChatCardText: null,
            newResponseText: null,
            chatCardHistory: [],
        }
        this.postNewResponseRequest = this.postNewResponseRequest.bind(this);
    }

    postNewResponseRequest(text){
        console.log('postNewResponseRequest text = ', text);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('new state = ', this.state);
    }

    componentDidMount() {
        this.props.socket.on('updateGhost', res => {
            console.log('updateGhost res = ', res);
            if (res.success) {
                this.props.setGhost(res.ghost);
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
                if (!this.state.chatCardHistory[this.state.chatCardHistory.length - 1] === res.chatCard._id) {
                    updateObj.chatCardHistory = [...this.state.chatCardHistory, res.chatCard._id];
                }
                this.setState(updateObj);
            } else {
                console.log('updateChatCard error = ', res.message);
            }
        });

        this.props.socket.on('getAllChatCardForGhostByGhostId', res => {
            console.log('getAllChatCardForGhostByGhostId res = ', res);
            if (res.success) {
                console.log('getAllChatCardForGhostByGhostId success');
                //setAllGhostChatCards(res.chatCards);
            }
        });


        if (this.props.ghost && this.props.ghost.baseChatCards && this.props.ghost.baseChatCards.length > 0) {
            console.log('props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))] = ', this.props.ghost.baseChatCards[Math.floor(Math.random() * (this.props.ghost.baseChatCards.length - 1))]);
            this.props.socket.emit('getChatCardById', {
                chatCardId: this.props.ghost.baseChatCards[Math.floor(Math.random() * (this.props.ghost.baseChatCards.length - 1))]._id
            });
        }
    }

    componentWillUnmount() {
        this.props.socket.removeListener('updateGhost');
        this.props.socket.removeListener('updateChatCard');
        this.props.socket.removeListener('getAllChatCardForGhostByGhostId');
    }

    render() {
        return <Container

            fluid
            style={{
                height: '90vh',
                maxHeight: '90vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Row md="auto">
                <Col>

                    <Row style={styles.ghostHeaderRow}>
                        <Col>
                            <Container style={{ ...constyles.genH2Text, justifyContent: 'center', alignItems: 'center', marginBottom: '0px', paddingBottom: '0px' }}>
                                {this.props.ghost.name}
                            </Container>
                            <Container style={{ ...constyles.genH5Text, justifyContent: 'flex-end', alignItems: 'center', marginTop: '0px' }}>
                                {this.props.ghost.type}
                            </Container>

                        </Col>
                    </Row>
                    {this.state.currentChatCard ?
                        <Container fluid>

                            <Row
                                style={{ ...constyles.genH3Text, ...styles.scrollable, height: '38vh' }}>
                                {this.state.currentChatCard.text}
                            </Row>
                            <Row
                                style={styles.dateRow}>
                                {moment(this.state.currentChatCard.createDate).format("MMM Do YYYY")}
                            </Row>
                            <Row style={styles.scrollable}>
                                <ChatCardResponseListView
                                    currentChatCard={this.state.currentChatCard}
                                    user={this.props.user}
                                    ghost={this.props.ghost}
                                    postNewResponseRequest={this.postNewResponseRequest}
                                />
                            </Row>

                        </Container>
                        : null}


                </Col>
            </Row>
        </Container>
    };
}

const styles = {
    cardContainer: {
        //width: '18rem',
        width: '100%',
        marginTop: '8px',
        cursor: 'pointer'
    },
    scrollable : {
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh',
        'overflow-x': 'hidden',
        'overflow-x': 'auto',
        paddingRight: '8px',
        paddingLeft: '8px',

    },
    dateRow : {
         ...constyles.genH6Text, 
         justifyContent: 'flex-end', 
         alignItems: 'center', 
         flexDirection: 'column', 
         height: '2vh' 
    },
    ghostHeaderRow : { 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomColor: colors.secondary, 
        borderBottomWidth: '4px', 
        height: '8vh' 
    }
}

export default GhostInteractionView;
