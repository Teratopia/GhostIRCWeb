import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';

import GISGhostsTabset from '../components/GISGhostsTabset';
import GISDetailsTabset from '../components/GISDetailsTabset';
import GISCreateGhostView from '../components/GISCreateGhostView';
import GISSelectedGhostView from '../components/GISSelectedGhostView';

class GhostsInteractionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ghosts: [],
            ghost: this.props.ghost || null,
            chatCard: null,
            chatCards: null,
            newResponseText: null,
            newChatText: null,
            chatCardHistory: [],
            responseRequest: null,
            befriendedGhosts : []
        }
        this.selectGhost = this.selectGhost.bind(this);
        this.onSubmitNewResponseText = this.onSubmitNewResponseText.bind(this);
        this.onSubmitNewChatCardText = this.onSubmitNewChatCardText.bind(this);
        this.selectResponse = this.selectResponse.bind(this);
        this.goBackInChatCardHistory = this.goBackInChatCardHistory.bind(this);
        this.onCreateGhost = this.onCreateGhost.bind(this);
        this.jumpToSelectedChatCard = this.jumpToSelectedChatCard.bind(this);
        this.routeToSelectedChatCard = this.routeToSelectedChatCard.bind(this);
        this.updateGhostList = this.updateGhostList.bind(this);
        this.updateChatCard = this.updateChatCard.bind(this);

        if(this.props.ghost){
            this.selectGhost(this.props.ghost);
        }
    }

    componentWillMount() {
        this.props.socket.on('getAllUserGhostInformationByUserId', res => {
            console.log('getAllUserGhostInformationByUserId res = ', res);
            if (res.success) {
                this.setState({ ghosts: res.ghosts });
            }
        });
        this.props.socket.on('responseRequestAdded', res => {
            console.log('responseRequestAdded res = ', res);
            let chatCard;
            let ghostsClone = [...this.state.ghosts];
            if (res.success) {
                for (let i = 0; i < res.ghost.chatCards.length; i++) {
                    if (res.ghost.chatCards[i]._id === res.req.originChatCardId) {
                        chatCard = res.ghost.chatCards[i];
                        break;
                    }
                }
                for (let i = 0; i < ghostsClone.length; i++) {
                    console.log('for(let i = 0 ; i < ghostsClone.length ; i++){');
                    if (ghostsClone[i]._id === res.req.ghostId) {
                        console.log('ghostsClone[i]._id === res.req.ghostId');
                        ghostsClone[i] = res.ghost;
                        break;
                    }
                }
            }
            console.log('ghostsClone 2 = ', ghostsClone);
            this.setState({
                ghost: res.ghost,
                chatCard: chatCard,
                chatCards: res.ghost.chatCards,
                ghosts: ghostsClone
            })
        });
        this.props.socket.on('chatCardCreated', res => {
            if (res.success) {
                let updatedGhostsList = this.updateGhostList(res.req.ghostId, res.ghost);
                this.setState({
                    ghost: res.ghost,
                    ghosts: updatedGhostsList,
                    chatCard: res.chatCard,
                    chatCards: res.ghost.chatCards,
                    chatCardHistory: [...this.state.chatCardHistory, res.chatCard]
                });
            }
        });
        this.props.socket.on('createSprite', res => {
            if (res.success) {
                this.selectGhost(res.ghost);
                this.setState({
                    ghosts: [...this.state.ghosts, res.ghost]
                })
            }
        });
        this.props.socket.on('responseRoutedToExistingChatCard', res => {
            console.log('responseRoutedToExistingChatCard res = ', res);
            if (res.success) {
                let destChatCard;
                let originChatCard;
                res.ghost.chatCards.forEach(cc => {
                    if (res.req.destinationCCId === cc._id) {
                        destChatCard = cc;
                    } else if (res.response.originCCId === cc._id) {
                        originChatCard = cc;
                    }
                });
                let updatedGhostsList = this.updateGhostList(res.req.ghostId, res.ghost);
                let cchClone = [...this.state.chatCardHistory];
                cchClone.splice(this.state.chatCardHistory.length - 1, 1);
                cchClone.push(originChatCard);
                cchClone.push(destChatCard);
                this.setState({
                    ghost: res.ghost,
                    ghosts: updatedGhostsList,
                    chatCard: destChatCard,
                    chatCards: res.ghost.chatCards,
                    chatCardHistory: cchClone
                })
            }
        });

        this.props.socket.on('responseRated', res => {
            console.log('responseRated res = ', res);
            let updatedGhostsList = this.updateGhostList(res.req.ghostId, res.ghost);
            let updatedChatCard = this.updateChatCard(res.ghost, this.state.chatCard._id);
            this.setState({
                ghost: res.ghost,
                ghosts: updatedGhostsList,
                chatCard: updatedChatCard,
                chatCards: res.ghost.chatCards
            });
        });

        this.props.socket.on('chatCardRated', async res => {
            console.log('chatCardRated res = ', res);
            let updatedGhostsList = this.updateGhostList(res.req.ghostId, res.ghost);
            let updatedChatCard = null;
            if(this.state.chatCard){
                updatedChatCard = this.updateChatCard(res.ghost, this.state.chatCard._id);
            }
            let cchClone = [...this.state.chatCardHistory];
            for (let i = 0; i < cchClone.length; i++) {
                if (cchClone[i]._id === updatedChatCard._id) {
                    cchClone[i] = updatedChatCard;
                }
            }
            this.setState({
                ghost: res.ghost,
                ghosts: updatedGhostsList,
                chatCard: updatedChatCard,
                chatCards: res.ghost.chatCards,
                chatCardHistory: cchClone
            });
        });

        this.props.socket.on('ghostRated', async res => {
            console.log('chatCardRated res = ', res);
            let updatedGhostsList = this.updateGhostList(res.req.ghostId, res.ghost);
            this.setState({
                ghost: res.ghost,
                ghosts: updatedGhostsList,
            });
        });

        this.props.socket.on('responseDeleted', async res => {
            console.log('responseDeleted res = ', res);
            let updatedGhostsList = this.updateGhostList(res.req.ghostId, res.ghost);
            let updatedChatCard = this.updateChatCard(res.ghost, this.state.chatCard._id);
            let cchClone = [...this.state.chatCardHistory];
            for (let i = 0; i < cchClone.length; i++) {
                if (cchClone[i]._id === updatedChatCard._id) {
                    cchClone[i] = updatedChatCard;
                }
            }
            this.setState({
                ghost: res.ghost,
                ghosts: updatedGhostsList,
                chatCard: updatedChatCard,
                chatCards: res.ghost.chatCards,
                chatCardHistory: cchClone
            });
        });

        this.props.socket.on('chatCardDeleted', async res => {
            console.log('chatCardDeleted res = ', res);
            let updatedGhostsList = this.updateGhostList(res.req.ghostId, res.ghost);
            let updatedChatCard = this.updateChatCard(res.ghost, this.state.chatCard._id);
            let cchClone = [...this.state.chatCardHistory];
            if (cchClone.length === 1) {
                updatedChatCard = cchClone[0];
            } else {
                updatedChatCard = cchClone[cchClone.length - 2];
                res.ghost.chatCards.forEach(card => {
                    if (card._id === updatedChatCard._id) {
                        updatedChatCard = card;
                    }
                });
            }

            this.setState({
                ghost: res.ghost,
                ghosts: updatedGhostsList,
                chatCard: updatedChatCard,
                chatCards: res.ghost.chatCards,
                chatCardHistory: cchClone
            });
        });

        if(!this.props.onSearchScreen){
            console.log('!this.props.onSearchScreen getAllBefriendedGhostsForUser');
            this.props.socket.on('getAllBefriendedGhostsForUser', async res => {
                console.log('getAllBefriendedGhostsForUser res = ', res);
                if(res.success){
                    this.setState({
                        befriendedGhosts : res.ghosts
                    });
                }
            });
            this.props.socket.emit('getAllBefriendedGhostsForUser', {
                userId : this.props.user._id
            });
        }

        this.props.socket.emit('getAllUserGhostInformationByUserId', {
            userId: this.props.user._id
        });

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('GhostInteractionScreen did update, prevProps = ', prevProps);
        console.log('GhostInteractionScreen did update, prevState = ', prevState);
        console.log('GhostInteractionScreen did update, this.props = ', this.props);
        console.log('GhostInteractionScreen did update, this.state = ', this.state);
        if(prevProps.ghost !== this.props.ghost){
            this.selectGhost(this.props.ghost);
        }
        if(prevProps.user !== this.props.user){
            if(!this.props.onSearchScreen){
                console.log('!this.props.onSearchScreen getAllBefriendedGhostsForUser');
                this.props.socket.emit('getAllBefriendedGhostsForUser', {
                    userId : this.props.user._id
                });
            }
    
            this.props.socket.emit('getAllUserGhostInformationByUserId', {
                userId: this.props.user._id
            });
        }
    }

    componentWillUnmount() {
        this.props.socket.removeListener('getUserGhostsByUserId');
        this.props.socket.removeListener('getAllUserGhostInformationByUserId');
        this.props.socket.removeListener('getAllBefriendedGhostsForUser');
    }

    updateGhostList(ghostId, ghost) {
        let ghostsClone = [...this.state.ghosts];
        for (let i = 0; i < ghostsClone.length; i++) {
            if (ghostsClone[i]._id === ghostId) {
                ghostsClone[i] = ghost;
                break;
            }
        }
        return ghostsClone;
    }

    updateChatCard(ghost, chatCardId) {
        let updatedChatCard;
        ghost.chatCards.forEach(chatCard => {
            if (chatCard._id === chatCardId) {
                updatedChatCard = chatCard;
            }
        });
        return updatedChatCard;
    }

    selectGhost(ghost) {
        if (ghost && ghost.baseChatCards && ghost.baseChatCards.length > 0) {

            this.setState({
                ghost: ghost,
                chatCard: ghost.baseChatCards[0],
                chatCardHistory: [ghost.baseChatCards[0]],
                chatCards: ghost.chatCards,
                newResponseText: null,
                newChatText: null,
                responseRequest: null
            });
        }
    }

    onSubmitNewResponseText(chatCardId, text) {
        this.props.socket.emit('addResponseRequestToChatCard', {
            originChatCardId: chatCardId,
            userId: this.props.user._id,
            text: text,
            ghostId: this.state.ghost._id
        });
    }

    onSubmitNewChatCardText(text) {
        console.log('onSubmitNewChatCardText text = ', text);
        //req.ghostId, req.userId, req.text, req.responseId, ghostId
        if (this.state.ghost && this.props.user && text && this.state.responseRequest) {
            this.props.socket.emit('createNewChatCard', {
                ghostId: this.state.ghost._id,
                userId: this.props.user._id,
                text: text,
                responseId: this.state.responseRequest._id
            });
        }
    }

    selectResponse(response) {
        if (response) {
            if (response.destinationCCId) {
                let chatCard;
                this.state.ghost.chatCards.forEach(cc => {
                    if (cc._id === response.destinationCCId) {
                        chatCard = cc;
                    }
                });

                this.setState({
                    chatCard: chatCard,
                    responseRequest: null,
                    chatCardHistory: [...this.state.chatCardHistory, chatCard]
                });
            } else {
                this.setState({
                    chatCard: null,
                    responseRequest: response
                });
            }
        }
    }

    goBackInChatCardHistory() {
        console.log('clickBackCaretHandler 1');
        let cchClone = [...this.state.chatCardHistory];
        console.log('clickBackCaretHandler 2 cchClone = ', cchClone);
        if (cchClone.length >= 1) {
            if (cchClone.length > 1 && this.state.chatCard) {
                cchClone.splice(cchClone.length - 1, 1);
            }
            console.log('clickBackCaretHandler 3 cchClone = ', cchClone);
            console.log('clickBackCaretHandler 3 cchClone[cchClone.length-1] = ', cchClone[cchClone.length - 1]);
            this.setState({
                chatCardHistory: cchClone,
                chatCard: cchClone[cchClone.length - 1]
            });
        }
    }

    onCreateGhost() {
        this.setState({
            ghost: null,
            chatCard: null,
            chatCards: null,
            newResponseText: null,
            newChatText: null,
            chatCardHistory: [],
            responseRequest: null
        });
    }

    jumpToSelectedChatCard(chatCard) {
        this.setState({
            chatCard: chatCard,
            chatCardHistory: [...this.state.chatCardHistory, chatCard]
        })
    }

    routeToSelectedChatCard(chatCard) {
        console.log('routeToSelectedChatCard req = ', {
            responseId: this.state.responseRequest._id,
            destinationCCId: chatCard._id,
            userId: this.props.user._id,
            ghostId: this.state.ghost._id
        });
        this.props.socket.emit('routeResponseToExistingChatCard', {
            responseId: this.state.responseRequest._id,
            destinationCCId: chatCard._id,
            userId: this.props.user._id,
            ghostId: this.state.ghost._id
        });
    }

    render() {
        return <Container fluid style={{ height: '90vh' }}>
            <Row>
                {
                    !this.props.onSearchScreen ?
                    <Col xs={3} style={{ ...styles.scrollableColumn, paddingTop: '12px' }}>
                        <GISGhostsTabset
                            socket={this.props.socket}
                            user={this.props.user}
                            state={this.state}
                            setState={this.setState}

                            ghost={this.state.ghost}
                            ghosts={this.state.ghosts}
                            selectGhost={this.selectGhost}
                            onCreateGhost={this.onCreateGhost}
                            befriendedGhosts={this.state.befriendedGhosts}
                        />
                    </Col>
                    :
                    null
                }
                
                <Col 
                xs={this.props.onSearchScreen ? 12 : 6} 
                style={this.props.onSearchScreen ? {...styles.scrollableColumn, background: 'linear-gradient(to right, rgba(0, 0, 0, 0.0), white)'} : styles.scrollableColumn}
                
                >
                    {
                        this.state.ghost ?
                            <GISSelectedGhostView
                                socket={this.props.socket}
                                user={this.props.user}
                                ghost={this.state.ghost}
                                chatCard={this.state.chatCard}
                                chatCardHistory={this.state.chatCardHistory}
                                onSubmitNewResponseText={this.onSubmitNewResponseText}
                                onSubmitNewChatCardText={this.onSubmitNewChatCardText}
                                selectResponse={this.selectResponse}
                                clickBackCaretHandler={this.goBackInChatCardHistory}
                                clickForwardCaretHandler={this.selectResponse}
                                onSearchScreen={this.props.onSearchScreen}
                                nullifySelectedGhost={this.props.nullifySelectedGhost}
                            />
                            :
                            <GISCreateGhostView
                                socket={this.props.socket}
                                user={this.props.user}
                                state={this.state}
                                setState={this.setState}
                            />
                    }
                </Col>
                {
                    !this.props.onSearchScreen ? 
                    <Col xs={3} style={{ ...styles.scrollableColumn, paddingTop: '12px' }}>
                        <GISDetailsTabset
                            user={this.props.user}
                            chatCards={this.state.chatCards}
                            selectedChatCard={this.state.chatCard}
                            jumpToSelectedChatCard={this.jumpToSelectedChatCard}
                            routeToSelectedChatCard={this.routeToSelectedChatCard}
                        />
                    </Col>
                    :
                    null
                }
                
            </Row>
        </Container>
    };
}

const styles = {
    sideColumn: {
        paddingTop: '12px'
    },
    scrollableColumn: {
        'height': '90vh',
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
    }
}

export default GhostsInteractionScreen;
