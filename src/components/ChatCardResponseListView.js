import React, { Component } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Card, Form } from 'react-bootstrap';
import moment from 'moment';

class ChatCardResponseListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newRequestText: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('new state = ', this.state);
        if(prevState.newRequestText !== this.state.newRequestText && !this.state.newRequestText){
            this.render();
        }
    }

    render() {
        if (this.props.ghost.moderatorIds.includes(this.props.user._id)) {
            return <Container fluid>
                <Row>
                    <Col style={{
                        //backgroundColor : 'pink', 
                        padding: '0px',
                        margin: '0px'
                    }}>
                        <Row style={{
                            //marginBottom : '8px', 
                            justifyContent: 'center'
                        }} xs="12">
                            <Col>
                                <Form.Group xs="12" controlId="newResponseRequestTextInput" style={{
                                    //backgroundColor : 'purple', 
                                    marginBottom: '0px'
                                }}>
                                    <Form.Control
                                        style={{
                                            //backgroundColor : 'red', 
                                            marginBottom: '0px'
                                        }}
                                        type="text"
                                        placeholder="Write your own!"
                                        onChange={e => this.setState({newRequestText : e.target.value})}
                                        defaultValue={this.state.newRequestText}
                                        value={this.state.newRequestText}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {this.state.newRequestText && this.state.newRequestText.length > 0 ?
                            <Row noGutters={true}
                                style={{
                                    padding: '0px',
                                    margin: '0px',
                                    marginTop: '8px',
                                    width: '100%',
                                    //backgroundColor : 'yellow'
                                }}>
                                <Col style={{
                                    marginRight: '4px',
                                    marginLeft: '0px',
                                    paddingLeft: '0px',
                                    //backgroundColor : 'red'
                                }}>
                                    <Button
                                        style={{ backgroundColor: colors.secondary, color: 'white' }}
                                        block
                                        onClick={() => { this.setState({newRequestText : ''}) }}>
                                        Cancel
                            </Button>
                                </Col>
                                <Col style={{
                                    marginLeft: '4px',
                                    marginRight: '0px',
                                    paddingRight: '0px',
                                    //backgroundColor : 'blue'
                                }}>
                                    <Button
                                        style={{ backgroundColor: colors.primary, color: 'white' }}
                                        block
                                        onClick={() => { this.props.postNewResponseRequest(this.state.newRequestText) }}>
                                        Submit!
                            </Button>
                                </Col>
                            </Row>
                            : null}
                    </Col>
                </Row>


                {this.props.currentChatCard ?
                    this.props.currentChatCard.responseRequests.map(response => {
                        return <Row key={response._id}>
                            <Card
                                //onClick={() => { this.setState({ selectedGhost: ghost }) }}
                                style={{ ...styles.cardContainer, backgroundColor: colors.secondaryFaded }}
                            >
                                <Container>
                                    <Row>
                                        <Col style={{ ...constyles.genH3Text, fontWeight: '200', justifyContent: 'flex-start', textAlign: 'left' }}>
                                            {response.text}
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Row>
                    })
                    : null}
                {this.props.currentChatCard ?
                    this.props.currentChatCard.responses.map(response => {
                        return <Row key={response._id}>
                            <Card
                                //onClick={() => { this.setState({ selectedGhost: ghost }) }}
                                style={styles.cardContainer}
                            >
                                <Container>
                                    <Row>
                                        <Col style={{ ...constyles.genH3Text, fontWeight: '200', justifyContent: 'flex-start', textAlign: 'left' }}>
                                            {response.text}
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Row>
                    })
                    : null}

            </Container>
        } else {
            return <Container fluid>
                <Row>
                    <Col style={{
                        //backgroundColor : 'pink', 
                        padding: '0px',
                        margin: '0px'
                    }}>
                        <Row style={{
                            //marginBottom : '8px', 
                            justifyContent: 'center'
                        }} xs="12">
                            <Col>
                                <Form.Group xs="12" controlId="newResponseRequestTextInput" style={{
                                    //backgroundColor : 'purple', 
                                    marginBottom: '0px'
                                }}>
                                    <Form.Control
                                        style={{
                                            //backgroundColor : 'red', 
                                            marginBottom: '0px'
                                        }}
                                        type="text"
                                        placeholder="Write your own!"
                                        onChange={e => this.setState({newRequestText : e.target.value})}
                                        defaultValue={this.state.newRequestText}
                                        value={this.state.newRequestText}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {this.state.newRequestText && this.state.newRequestText.length > 0 ?
                            <Row noGutters={true}
                                style={{
                                    padding: '0px',
                                    margin: '0px',
                                    marginTop: '8px',
                                    width: '100%',
                                    //backgroundColor : 'yellow'
                                }}>
                                <Col style={{
                                    marginRight: '4px',
                                    marginLeft: '0px',
                                    paddingLeft: '0px',
                                    //backgroundColor : 'red'
                                }}>
                                    <Button
                                        style={{ backgroundColor: colors.secondary, color: 'white' }}
                                        block
                                        onClick={() => { this.setState({newRequestText : ''}) }}>
                                        Cancel
                            </Button>
                                </Col>
                                <Col style={{
                                    marginLeft: '4px',
                                    marginRight: '0px',
                                    paddingRight: '0px',
                                    //backgroundColor : 'blue'
                                }}>
                                    <Button
                                        style={{ backgroundColor: colors.primary, color: 'white' }}
                                        block
                                        onClick={() => { this.props.postNewResponseRequest(this.state.newRequestText) }}>
                                        Submit!
                            </Button>
                                </Col>
                            </Row>
                            : null}
                    </Col>
                </Row>
                {this.props.currentChatCard ?
                    this.props.currentChatCard.responses.map(response => {
                        return <Row key={response._id}>
                            <Card
                                //onClick={() => { this.setState({ selectedGhost: ghost }) }}
                                style={styles.cardContainer}
                            >
                                <Container>
                                    <Row>
                                        <Col style={{ ...constyles.genH3Text, fontWeight: '200', justifyContent: 'flex-start', textAlign: 'left' }}>
                                            {response.text}
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Row>
                    })
                    : null}
                {this.props.currentChatCard ?
                    this.props.currentChatCard.responseRequests.map(response => {
                        return <Row key={response._id}>
                            <Card
                                //onClick={() => { this.setState({ selectedGhost: ghost }) }}
                                style={{ ...styles.cardContainer, backgroundColor: colors.secondaryFaded }}
                            >
                                <Container>
                                    <Row>
                                        <Col style={{ ...constyles.genH3Text, fontWeight: '200', justifyContent: 'flex-start', textAlign: 'left' }}>
                                            {response.text}
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Row>
                    })
                    : null}
            </Container>
        }

    }
}

const styles = {
    cardContainer: {
        //width: '18rem',
        width: '100%',
        marginTop: '8px',
        cursor: 'pointer'
    }
}

export default ChatCardResponseListView;