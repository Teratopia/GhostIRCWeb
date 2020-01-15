import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';



class GisSgvCreateChatCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newChatCardText: ''
        }
        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.cancelButtonHandler = this.cancelButtonHandler.bind(this);
        this.submitButtonHandler = this.submitButtonHandler.bind(this);
    }

    componentWillUnmount() {

    }

    textChangeHandler(text) {
        if (text) {
            this.setState({
                newChatCardText: text
            });
        }
    }

    cancelButtonHandler() {
        this.props.onCancel();
    }

    submitButtonHandler() {
        if(this.state.newChatCardText){
            this.props.onSubmitNewText(this.state.newChatCardText);
        }
    }

    render() {
        return <Container fluid>
            <Row>
                <Col>
                    <Form.Group controlId="newResponseRequestTextInput">
                        <Form.Control
                            as="textarea"
                            placeholder="Write your reply!"
                            onChange={e => this.textChangeHandler(e.target.value)}
                            value={this.state.newChatCardText}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button
                        block
                        style={{ backgroundColor: colors.secondary }}
                        onClick={this.cancelButtonHandler}>
                        Cancel
                    </Button>
                </Col>
                <Col>
                    <Button
                        block
                        style={{ backgroundColor: colors.primary }}
                        onClick={this.submitButtonHandler}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
    };
}

export default GisSgvCreateChatCardView;
