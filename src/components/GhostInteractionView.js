import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Card } from 'react-bootstrap';
import moment from 'moment';
import ChatCardResponseListView from './ChatCardResponseListView';
import ChatCardCreationView from './ChatCardCreationView';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GhostInteractionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createNewCardMode: false
        }
        /*
        this.state = {
            currentChatCard: null,
            allChatCards: null,
            newChatCardText: null,
            newResponseText: null,
            chatCardHistory: [],
            responseRequestBeingHandled : null
        }
        */
        this.responseRowClickHandler = this.responseRowClickHandler.bind(this);
        this.endCardCreation = this.endCardCreation.bind(this);
        this.handleForwardClick = this.handleForwardClick.bind(this);
        this.handleBackwardClick = this.handleBackwardClick.bind(this);
        this.submitNewCard = this.submitNewCard.bind(this);
    }

    submitNewCard(text){
        this.setState({createNewCardMode : false});
        this.props.submitNewCard(text);
    }

    handleBackwardClick() {
        if(this.props.chatCardHistory.length > 1){
            console.log('this.props.chatCardHistory = ', this.props.chatCardHistory);
                this.props.socket.emit('getChatCardById',
                    { chatCardId: this.props.chatCardHistory[this.props.chatCardHistory.length - 2] })
        }
    }

    handleForwardClick() {
        console.log('handleforwardClick this.props.currentChatCard = ', this.props.currentChatCard);
        if (this.props.ghost.moderatorIds.includes(this.props.user._id) &&
            this.props.currentChatCard.responseRequests.length > 0) {
            /*
            console.log('this.props.currentChatCard.responseRequests[0]._id = ', this.props.currentChatCard.responseRequests[0]._id);
                this.props.socket.emit('getChatCardById',
            { chatCardId: this.props.currentChatCard.responseRequests[0]._id }
            )
            */
           this.setState({ createNewCardMode: true });
            this.props.setResponseRequestBeingHandled(this.props.currentChatCard.responseRequests[0]);
        } else if (this.props.currentChatCard.responses.length > 0) {
            console.log('this.props.currentChatCard.responses[0]._id = ', this.props.currentChatCard.responses[0]._id);

            this.props.socket.emit('getChatCardById',
                { chatCardId: this.props.currentChatCard.responses[0].destinationCCId }
            )
        }
    }


    responseRowClickHandler(response) {
        console.log('responseRowClickHandler response = ', response);
        if (response.destinationCCId) {
            console.log('responseRowClickHandler 1');
            this.props.socket.emit('getChatCardById', {
                chatCardId: response.destinationCCId
            });
        } else if (this.props.ghost.moderatorIds.includes(this.props.user._id)) {
            this.setState({ createNewCardMode: true });
            this.props.setResponseRequestBeingHandled(response);
        } else {
            console.log('responseRowClickHandler 3');
            //alert user cannot handle requests
        }
        /*
        else if(this.props.ghost.moderatorIds.includes(this.props.user._id)){
            //handle new chat card creation...
            console.log('responseRowClickHandler 2');
            this.props.setResponseRequestBeingHandled(response);
            this.setState({
                currentChatCard : null
            });
        } else {
            console.log('responseRowClickHandler 3');
            //alert user cannot handle requests
        }
        */
    }

    endCardCreation() {
        this.setState({ createNewCardMode: false });
        this.props.setResponseRequestBeingHandled(null);
    }

    componentDidUpdate(prevProps, prevState) {
        /*
        console.log('new state = ', this.state);
        if (this.props.ghost !== prevProps.ghost
            && this.props.ghost && this.props.ghost.baseChatCards
            && this.props.ghost.baseChatCards.length > 0) {
            console.log('props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))] = ', this.props.ghost.baseChatCards[Math.floor(Math.random() * (this.props.ghost.baseChatCards.length - 1))]);
            this.props.socket.emit('getChatCardById', {
                chatCardId: this.props.ghost.baseChatCards[Math.floor(Math.random() * (this.props.ghost.baseChatCards.length - 1))]._id
            });
        }
        */
    }

    componentDidMount() {
        /*
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
        */

        /*
        this.props.socket.on('getAllChatCardForGhostByGhostId', res => {
            console.log('getAllChatCardForGhostByGhostId res = ', res);
            if (res.success) {
                console.log('getAllChatCardForGhostByGhostId success');
                //setAllGhostChatCards(res.chatCards);
            }
        });
        */

        /*
        if (this.props.ghost && this.props.ghost.baseChatCards && this.props.ghost.baseChatCards.length > 0) {
            console.log('props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))] = ', this.props.ghost.baseChatCards[Math.floor(Math.random() * (this.props.ghost.baseChatCards.length - 1))]);
            this.props.socket.emit('getChatCardById', {
                chatCardId: this.props.ghost.baseChatCards[Math.floor(Math.random() * (this.props.ghost.baseChatCards.length - 1))]._id
            });
        }
        */
    }

    componentWillUnmount() {
        //this.props.socket.removeListener('updateGhost');
        //this.props.socket.removeListener('updateChatCard');
        //this.props.socket.removeListener('getAllChatCardForGhostByGhostId');
    }

    render() {
        return <Container

            fluid
            style={{
                height: '90vh',
                maxHeight: '90vh',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '4px'
                //backgroundColor : 'red'
            }}>
            <Row md="auto" style={{
                //backgroundColor : 'blue'
            }}>
                <Col style={{
                    //backgroundColor : 'green'
                }}>

                    {!this.state.createNewCardMode ?
                        <Container fluid style={{
                            //backgroundColor : 'pink', 
                            marginLeft: '0px',
                            marginRight: '0px'
                        }}>
                            <Row style={{
                                ...styles.ghostHeaderRow,
                                //backgroundColor : 'red'
                            }}>
                                <Col>
                                    <Row style={{ ...constyles.genH3Text, fontWeight: '200', justifyContent: 'center', alignItems: 'center', marginBottom: '0px', padding: '0px' }}>
                                        {this.props.ghost.name}
                                    </Row>
                                    <Row style={{ ...constyles.genH6Text, alignItems: 'center', justifyContent: 'center', marginTop: '0px', padding: '0px' }}>
                                        {this.props.ghost.type}
                                    </Row>
                                </Col>
                            </Row>
                            <Row
                                style={{ ...styles.scrollable, height: '40vh' }}>
                                <Col xs={1}
                                    onClick={this.handleBackwardClick}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    {this.props.chatCardHistory.length > 1 ?
                                        <FontAwesomeIcon
                                            style={{ margin: 'auto', justifyContent: 'center' }}
                                            icon={faChevronLeft}
                                        //style={{justifyContent : 'center', alignItems : 'center'}
                                        //color={this.props.currentScreen === 'SEARCH' ? colors.primary : 'black'}
                                        />
                                        : null}
                                </Col>
                                <Col xs={10} style={{ ...constyles.genH3Text }}>
                                    {this.props.currentChatCard.text}
                                </Col>
                                <Col xs={1}
                                    //onClick={}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={this.handleForwardClick}
                                >
                                    { this.props.currentChatCard.responses.length > 0 ? 
                                        <FontAwesomeIcon
                                            style={{ margin: 'auto', justifyContent: 'center' }}
                                            icon={faChevronRight}
                                        //style={{justifyContent : 'center', alignItems : 'center'}
                                        //color={this.props.currentScreen === 'SEARCH' ? colors.primary : 'black'}
                                        />
                                    : null }
                                    
                                </Col>
                            </Row>
                            <Row
                                style={styles.dateRow}>
                                {moment(this.props.currentChatCard.createDate).format("MMM Do YYYY")}
                            </Row>
                            <Row style={{
                                ...styles.scrollable,
                                alignItems: 'flex-start',
                                //backgroundColor : 'orange',
                                marginBottom: '2px'
                            }}>
                                <ChatCardResponseListView
                                    currentChatCard={this.props.currentChatCard}
                                    user={this.props.user}
                                    ghost={this.props.ghost}
                                    postNewResponseRequest={this.props.postNewResponseRequest}
                                    responseRowClickHandler={this.responseRowClickHandler}
                                />
                            </Row>
                        </Container>

                        :
                        <ChatCardCreationView
                            responseRequestBeingHandled={this.props.responseRequestBeingHandled}
                            ghost={this.props.ghost}
                            socket={this.props.socket}
                            endCardCreation={this.endCardCreation}
                            submitNewCard={this.submitNewCard}
                        />


                    }


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
    scrollable: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh',
        'overflow-x': 'hidden',
        //'overflow-x': 'auto',
        //'overflow-y': 'hidden',
        'overflow-y': 'auto',
        //paddingRight: '8px',
        //paddingLeft: '8px',

    },
    dateRow: {
        ...constyles.genH6Text,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        height: '2vh'
    },
    ghostHeaderRow: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colors.secondary,
        borderBottomWidth: '4px',
        height: '8vh'
    }
}

export default GhostInteractionView;
