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
            ghosts : [],
            ghost : null,
            chatCards : null,
            newResponseText : null,
            newChatText : null,
            chatCardHistory : [],
            responseRequest : null
        }
        this.selectGhost = this.selectGhost.bind(this);
        this.onSubmitNewResponseText = this.onSubmitNewResponseText.bind(this);
        this.onSubmitNewChatCardText = this.onSubmitNewChatCardText.bind(this);
        this.selectResponse = this.selectResponse.bind(this);
        this.goBackInChatCardHistory = this.goBackInChatCardHistory.bind(this);
    }

    componentWillMount(){
        this.props.socket.on('getAllUserGhostInformationByUserId', res => {
            console.log('getAllUserGhostInformationByUserId res = ', res);
            if(res.success){
                this.setState({ghosts : res.ghosts});
            }
        });
        this.props.socket.on('responseRequestAdded', res => {
            console.log('responseRequestAdded res = ', res);
            let chatCard;
            let ghostsClone = [...this.state.ghosts];
            if(res.success){
                for(let i = 0 ; i < res.ghost.chatCards.length ; i++){
                    if(res.ghost.chatCards[i]._id === res.req.originChatCardId){
                        chatCard = res.ghost.chatCards[i];
                        break;
                    }
                }
                for(let i = 0 ; i < ghostsClone.length ; i++){
                    if(ghostsClone[i]._id === res.req.ghostId){
                        ghostsClone[i] = res.ghost;
                        break;
                    }
                }
            }
            this.setState({
                ghost : res.ghost,
                chatCard : chatCard,
                ghosts : ghostsClone
            })
        });
        this.props.socket.on('chatCardCreated', res => {
            if(res.success){
                let ghostsClone = [...this.state.ghosts];
                for(let i = 0 ; i < ghostsClone.length ; i++){
                    if(ghostsClone[i]._id === res.req.ghostId){
                        ghostsClone[i] = res.ghost;
                        break;
                    }
                }
                this.setState({
                    ghost : res.ghost,
                    ghosts : ghostsClone,
                    chatCard : res.chatCard,
                    chatCardHistory : [...this.state.chatCardHistory, res.chatCard]
                });
            }
        });
        this.props.socket.on('createSprite', res => {
            if(res.success){
                this.setState({
                    ghosts : [...this.state.ghosts, res.ghost],
                    ghost : res.ghost,
                    chatCardHistory : [res.ghost.baseChatCards[0]],
                    chatCards : null,
                    newResponseText : null,
                    newChatText : null,
                    responseRequest : null
                });
            }
        });
        
        this.props.socket.emit('getAllUserGhostInformationByUserId', {
            userId : this.props.user._id
        });
        
    }

    componentDidUpdate(prevProps, prevState){
        console.log('GhostInteractionScreen did update, prevProps = ', prevProps);
        console.log('GhostInteractionScreen did update, prevState = ', prevState);
        console.log('GhostInteractionScreen did update, this.props = ', this.props);
        console.log('GhostInteractionScreen did update, this.state = ', this.state);

    }

    componentWillUnmount() {
        this.props.socket.removeListener('getUserGhostsByUserId');
    }

    selectGhost(ghost){
        if(ghost && ghost.baseChatCards && ghost.baseChatCards.length > 0){
            this.setState({
                ghost : ghost,
                chatCard : ghost.baseChatCards[0],
                chatCardHistory : [ghost.baseChatCards[0]],
                chatCards : null,
                newResponseText : null,
                newChatText : null,
                responseRequest : null
            });
        }
    }

    onSubmitNewResponseText(chatCardId, text){
        this.props.socket.emit('addResponseRequestToChatCard', {
            originChatCardId : chatCardId, 
            userId : this.props.user._id, 
            text : text, 
            ghostId : this.state.ghost._id
        });
    }

    onSubmitNewChatCardText(text){
        console.log('onSubmitNewChatCardText text = ', text);
        //req.ghostId, req.userId, req.text, req.responseId, ghostId
        if(this.state.ghost && this.props.user && text && this.state.responseRequest){
            this.props.socket.emit('createNewChatCard', {
                ghostId : this.state.ghost._id,
                userId : this.props.user._id,
                text : text,
                responseId : this.state.responseRequest._id
            });
        }
    }

    selectResponse(response){
        if(response){
            if(response.destinationCCId){
                let chatCard;
                this.state.ghost.chatCards.forEach(cc => {
                    if(cc._id === response.destinationCCId){
                        chatCard = cc;
                    }
                });

                this.setState({
                    chatCard : chatCard,
                    responseRequest : null,
                    chatCardHistory : [...this.state.chatCardHistory, chatCard]
                });
            } else {
                this.setState({
                    chatCard : null,
                    responseRequest : response
                });
            }
        }
    }

    goBackInChatCardHistory() {
        console.log('clickBackCaretHandler 1');
        let cchClone = [...this.state.chatCardHistory];
        console.log('clickBackCaretHandler 2 cchClone = ', cchClone);
        if(cchClone.length >= 1){
            if(cchClone.length > 1){
                cchClone.splice(cchClone.length-1, 1);
            }
            console.log('clickBackCaretHandler 3 cchClone = ', cchClone);
            console.log('clickBackCaretHandler 3 cchClone[cchClone.length-1] = ', cchClone[cchClone.length-1]);
            this.setState({
                chatCardHistory : cchClone,
                chatCard : cchClone[cchClone.length-1]
            });
        }
        
    }

    render() {
        return <Container fluid style={{height : '90vh'}}>
            <Row>
                <Col sx={3}>
                    <GISGhostsTabset
                        socket={this.props.socket}
                        user={this.props.user}
                        state={this.state}
                        setState={this.setState}

                        ghost={this.state.ghost}
                        ghosts={this.state.ghosts}
                        selectGhost={this.selectGhost}
                    />
                </Col>
                <Col xs={6}>
                    {
                        this.state.ghost ? 
                        <GISSelectedGhostView
                            user={this.props.user}
                            ghost={this.state.ghost}
                            chatCard={this.state.chatCard}
                            chatCardHistory={this.state.chatCardHistory}
                            onSubmitNewResponseText={this.onSubmitNewResponseText}
                            onSubmitNewChatCardText={this.onSubmitNewChatCardText}
                            selectResponse={this.selectResponse}
                            clickBackCaretHandler={this.goBackInChatCardHistory}
                            clickForwardCaretHandler={this.selectResponse}
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
                <Col xs={3}>
                    <GISDetailsTabset
                        socket={this.props.socket}
                        user={this.props.user}
                        state={this.state}
                        setState={this.setState}
                    />
                </Col>
            </Row>
        </Container>
    };
}

export default GhostsInteractionScreen;
