import React, { Component } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form, Card, Tab, Tabs } from 'react-bootstrap';


class ChatCardCreationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newChatCardText: null
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return <Container>
                <Row style={{ ...styles.ghostHeaderRow,
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
                    style={{
                        justifyContent: 'flex-end',
                        //alignContent : 'center',
                        flexDirection: 'column',
                        height: '10vh',
                        //olor: 'green',
                        //paddingTop : '2vh'
                    }}>
                    <Container style={{ ...constyles.genH6Text, textAlign: 'center' }}>
                        Add {this.props.ghost.name}'s Reply To...
                    </Container>
                </Row>
                <Row
                    style={{
                        justifyContent: 'flex-start',
                        //alignContent : 'center',
                        flexDirection: 'column',
                        height: '20vh',
                        //olor: 'green',
                        //paddingTop : '2vh'
                    }}>
                    <Container style={constyles.genH3Text}>
                        {this.props.responseRequestBeingHandled.text}
                    </Container>

                </Row>
                <Row
                    style={{
                        ...constyles.genH2Text,
                        justifyContent: 'center',
                        //alignContent : 'center',
                        flexDirection: 'column',
                        height: '40vh',
                        //backgroundColor: 'blue',
                        //paddingTop : '2vh'
                    }}>
                    {
                        /*
                        <Container style={constyles.genH3Text}>
                        {this.state.newChatCardText}
                    </Container>
                    */
                    }

                    <Form.Group xs="12" controlId="newResponseRequestTextInput" style={{
                        width: '100%',
                        height: '100%',
                        //padding : '20px',
                        marginBottom: '0px'
                    }}>
                        <Form.Control
                            style={{
                                //backgroundColor : 'red', 
                                marginBottom: '0px',
                                justifyContent: 'center',
                                //textAlign: 'center',
                                width: '100%',
                                height: '100%',
                                maxHeight: '100%',
                                fontSize: '24px',
                                fontWeight: '200',
                                //border: '0px',
                                padding : '24px'
                            }}
                            as="textarea"
                            placeholder="Write your reply!"
                            onChange={e => this.setState({ newChatCardText: e.target.value })}
                            //defaultValue={this.state.newChatCardText}
                            value={this.state.newChatCardText}

                        />
                    </Form.Group>

                </Row>
                <Row
                    style={{
                        ...constyles.genH3Text,
                        justifyContent: 'center',
                        //alignContent : 'center',
                        flexDirection: 'column',
                        height: '8vh',
                        //backgroundColor: 'orange',
                        //paddingTop : '2vh'
                    }}>
                    <Col xs={6}>
                        <Row style={{ marginRight: '4px', marginLeft: '4px' }}>
                            <Button
                                block
                                style={{ backgroundColor: colors.secondary, color: 'white' }}
                                onClick={() => this.props.endCardCreation()}>
                                Cancel
                    </Button>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        <Row style={{ marginRight: '4px', marginLeft: '4px' }}>
                            <Button
                                disabled={!this.state.newChatCardText || this.state.newChatCardText.length ===0}
                                block
                                style={{ backgroundColor: colors.primary, color: 'white' }}
                                onClick={()=>this.props.submitNewCard(this.state.newChatCardText)}>
                                Submit
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
    }
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
    },
    chatCardContainer: {
        //width: '18rem', 
        marginTop: '8px',
        cursor: 'pointer'
    }
}

export default ChatCardCreationView;