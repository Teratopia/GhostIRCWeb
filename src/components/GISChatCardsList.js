import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import GISChatCardsListCard from './GISChatCardsListCard';


class GISChatCardsList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.selectChatCard = this.selectChatCard.bind(this);
    }

    componentWillUnmount() {

    }

    selectChatCard(chatCard){
        this.props.selectChatCard(chatCard);
    }

    render() {
        if(this.props.chatCards){
            console.log('chatCards in list = ', this.props.chatCards);
            console.log('selectedChatCard in list = ', this.props.selectedChatCard);
            return <Container fluid style={{marginBottom : '40px'}}>
                {this.props.chatCards.map(chatCard => {
                    return <GISChatCardsListCard
                            key={chatCard._id}
                            chatCard={chatCard}
                            selectedChatCardId={this.props.selectedChatCard ? this.props.selectedChatCard._id : null}
                            localSelectedChatCardId={this.props.localSelection ? this.props.localSelection._id : null}
                            onClick={this.selectChatCard}
                            onDoubleClick={this.props.doubleClickCard}
                            />
                })}
            </Container>
        } else {
            return null;
        }
        
    };
}

export default GISChatCardsList;
