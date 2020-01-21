import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';

import GisSgvHeader from './GisSgvHeader';
import GisSvgSelectedChatCardView from '../components/GisSvgSelectedChatCardView';
import GisSvgResponseView from '../components/GisSvgResponseView';
import GisSvgResponsesList from './GisSvgResponsesList';
import GisSgvCreateChatCardView from './GisSgvCreateChatCardView';

class GISSelectedGhostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterString : null
        }
        this.onSubmitNewResponseText = this.onSubmitNewResponseText.bind(this);
        this.selectResponse = this.selectResponse.bind(this);
        this.onSubmitNewChatCardText = this.onSubmitNewChatCardText.bind(this);
        this.clickBackCaretHandler = this.clickBackCaretHandler.bind(this);
        this.clickForwardCaretHandler = this.clickForwardCaretHandler.bind(this);
        this.setFilterString = this.setFilterString.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('GISSelectedGhostView componentDidUpdate');
        if(this.props.chatCard !== prevProps.chatCard
            || this.props.ghost !== prevProps.ghost){
                this.setState({
                    filterString : null
                });
                this.render();
            }
    }

    componentWillUnmount() {

    }

    onSubmitNewResponseText(text) {
        this.props.onSubmitNewResponseText(this.props.chatCard._id, text);
    }

    onSubmitNewChatCardText(text){
        this.props.onSubmitNewChatCardText(text);
    }

    selectResponse(response){
        this.props.selectResponse(response);
    }

    clickBackCaretHandler() {
        this.props.clickBackCaretHandler();
    }

    clickForwardCaretHandler() {
        let response;
        if(this.props.ghost.moderatorIds.includes(this.props.user._id)
         && this.props.chatCard.responseRequests.length > 0){
            response = this.props.chatCard.responseRequests[0];
        } else if(this.props.chatCard.responses.length > 0){
            response = this.props.chatCard.responses[0];
        }
        if(response){
            this.props.clickForwardCaretHandler(response);
        }
    }

    setFilterString(string){
        this.setState({
            filterString : string
        });
    }

    render() {
        return <Container fluid style={{ height: '90vh' }}>
            <GisSgvHeader
                ghost={this.props.ghost}
                socket={this.props.socket}
                user={this.props.user}
                onSearchScreen={this.props.onSearchScreen}
                nullifySelectedGhost={this.props.nullifySelectedGhost}
            />
            {
                this.props.chatCard ?
                    <Container fluid>

                        <GisSvgSelectedChatCardView
                            chatCard={this.props.chatCard}
                            clickForwardCaretHandler={this.clickForwardCaretHandler}
                            clickBackCaretHandler={this.clickBackCaretHandler}
                            chatCardHistory={this.props.chatCardHistory}
                            ghost={this.props.ghost}
                            socket={this.props.socket}
                            user={this.props.user}
                        />

                        <GisSvgResponseView
                            chatCard={this.props.chatCard}
                            onSubmitNewText={this.onSubmitNewResponseText}
                            filterString={this.state.filterString}
                            setFilterString={this.setFilterString}
                            
                        />
                
                        <GisSvgResponsesList
                            responses={ 
                                this.props.ghost.moderatorIds.includes(this.props.user._id) ? 
                                this.props.chatCard.responseRequests : 
                                this.props.chatCard.responses 
                            }
                            selectResponse={this.selectResponse}
                            filterString={this.state.filterString}
                            ghost={this.props.ghost}
                            socket={this.props.socket}
                            user={this.props.user}
                        />

                        <GisSvgResponsesList
                            responses={ 
                                this.props.ghost.moderatorIds.includes(this.props.user._id) ? 
                                this.props.chatCard.responses : 
                                this.props.chatCard.responseRequests 
                            }
                            selectResponse={this.selectResponse}
                            filterString={this.state.filterString}
                            ghost={this.props.ghost}
                            socket={this.props.socket}
                            user={this.props.user}
                        />

                    </Container>
                    :
                    <GisSgvCreateChatCardView
                        onSubmitNewText={this.onSubmitNewChatCardText}
                        onCancel={this.clickBackCaretHandler}
                    />
            }


        </Container>
    };
}

export default GISSelectedGhostView;
