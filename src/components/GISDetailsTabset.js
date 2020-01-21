import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Badge, Tabs, Tab, Card } from 'react-bootstrap';

import GISChatCardsList from './GISChatCardsList';

class GISDetailsTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatCard : null
        }
        this.selectChatCard = this.selectChatCard.bind(this);
        this.routeOrJumpHandler = this.routeOrJumpHandler.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.chatCard && this.props.chatCards && this.props.chatCards !== prevProps.chatCards){
            let flag = true;
            for(let i = 0 ; i < this.props.chatCards.length ; i++){
                if(this.props.chatCards[i]._id === this.state.chatCard._id){
                    flag = false;
                }
            }
            if(flag){
                this.setState({
                    chatCard : null
                });
            }
        }
    }

    componentWillUnmount() {

    }

    selectChatCard(chatCard){
        if(chatCard !== this.state.chatCard){
            this.setState({
                chatCard : chatCard
            });
        } else {
            this.setState({
                chatCard : null
            });
        }
    }

    routeOrJumpHandler(){
        if(this.state.chatCard){
            if(this.props.selectedChatCard){
                this.props.jumpToSelectedChatCard(this.state.chatCard);
            } else {
                this.props.routeToSelectedChatCard(this.state.chatCard);
            }
        }
    }

    render() {

        return <Tabs defaultActiveKey="chatCards">
            <Tab eventKey="chatCards" title="CHAT CARDS">

                <Button 
                    size="lg" 
                    block 
                    style={{backgroundColor : colors.primary, marginTop : '8px'}}
                    disabled={!this.state.chatCard}
                    onClick={this.routeOrJumpHandler}
                >
                    {
                        this.props.selectedChatCard ? 
                        'Jump To Card'
                        :
                        'Route To Card'
                    }
                    
                </Button>   

                <GISChatCardsList
                    chatCards={this.props.chatCards}
                    selectedChatCard={this.props.selectedChatCard}
                    selectChatCard={this.selectChatCard}
                    doubleClickCard={this.props.jumpToSelectedChatCard}
                    localSelection={this.state.chatCard}
                />
                
            </Tab>
            <Tab eventKey="details" title="DETAILS">
                a To me, fair friend, you never can be old, For as you were when first your eye I ey'd, Such seems your beauty still. Three winters cold, Have from the forests shook three summers' pride, Three beauteous springs to yellow autumn turn'd, In process of the seasons have I seen, Three April perfumes in three hot Junes burn'd, Since first I saw you fresh, which yet are green. Ah! yet doth beauty like a dial-hand, Steal from his figure, and no pace perceiv'd;
            </Tab>
        </Tabs>

    };
}

export default GISDetailsTabset;
