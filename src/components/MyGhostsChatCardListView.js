import React, { Component } from 'react';
//import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Col, Tab, Tabs, Container } from 'react-bootstrap';
import ChatCardRowCard from './ChatCardRowCard'

class MyGhostsChatCardListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    componentDidMount() {
        this.props.socket.emit('getAllDetailedChatCardsForGhostById', {ghostId : this.props.ghost._id});
    }

    componentDidUpdate(previousProps, previousState){
        console.log('MyGhostsChatCardListView chatCards new = ', this.props.chatCards)
        if(previousProps.ghost._id !== this.props.ghost._id){
            this.props.socket.emit('getAllDetailedChatCardsForGhostById', {ghostId : this.props.ghost._id});
        }
        console.log('this.props.isRouting = ', this.props.isRouting);
    }

    componentWillUnmount() {

    }

    render() {
        return <Tabs defaultActiveKey="cards" style={{marginTop : '1rem'}}>
        <Tab eventKey="cards" title="CARDS">
            { this.props.chatCards  ?
                <Container style={{ padding : '8px' }}>
                        { this.props.isRouting ? 
                            <Button 
                                disabled={!this.props.routingChatCard}
                                onClick={this.props.confirmRoute}
                                block
                                style={{backgroundColor : colors.tertiary}} 
                                size="lg"
                                >
                                Confirm Route
                            </Button>
                            :
                            <Button 
                                onClick={this.props.jumpToCardHandler}
                                block
                                style={{backgroundColor : colors.primary}} 
                                size="lg"
                                >
                                Jump To Card
                            </Button>
                        }
                    </Container>
            : null}
            { this.props.chatCards 
            //&& this.state.chatCards.length > 0 
            ? 
                <Row style={{
                    maxHeight : this.props.scrollHeight,
                    'overflowY': 'auto'
                    }}>
                    <Col>                                        
                    {

                    this.props.chatCards.map((chatCard, idx) => {
                        return <ChatCardRowCard 

                            key={'key'+idx}

                            onPress={this.props.setRoutingChatCard}
                            isActive={this.props.routingChatCard && this.props.routingChatCard._id === chatCard._id}

                            style={{margin : '8px', marginRight : '0px'}}
                            user={{_id: "5e0fac9ae3b020157cefef94"}}
                            ghost={{moderatorIds: ["5e0fac9ae3b020157cefef94"], _id: "5e14171630c03e851925cb67"}}
                            chatCard={chatCard}
                        />
                    })

                    }
                    </Col>
                </Row>
            : null }
        </Tab>
        <Tab eventKey="achievements" title="ACHIEVEMENTS">
            a To me, fair friend, you never can be old, For as you were when first your eye I ey'd, Such seems your beauty still. Three winters cold, Have from the forests shook three summers' pride, Three beauteous springs to yellow autumn turn'd, In process of the seasons have I seen, Three April perfumes in three hot Junes burn'd, Since first I saw you fresh, which yet are green. Ah! yet doth beauty like a dial-hand, Steal from his figure, and no pace perceiv'd;
        </Tab>
    </Tabs>
    };
}

export default MyGhostsChatCardListView;
