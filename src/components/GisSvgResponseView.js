import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';

class GisSvgResponseView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newRequestText : ''
        }
        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.submitButtonHandler = this.submitButtonHandler.bind(this);
        this.cancelButtonHandler = this.cancelButtonHandler.bind(this);
    }

    textChangeHandler(e){
        console.log('handleTextChange e = ', e);
        console.log('handleTextChange e.nativeEvent = ', e.nativeEvent.text);
        console.log('handleTextChange e.target.value = ', e.target.value);
        this.setState({
            newRequestText : e.target.value
        });
        this.props.setFilterString(e.target.value);
    }

    cancelButtonHandler(){
        this.setState({ 
            newRequestText: '' 
        });
        this.props.setFilterString(null);
    }

    submitButtonHandler(){
        if(this.state.newRequestText){
            this.props.onSubmitNewText(this.state.newRequestText);
        }
    }

    componentWillUnmount() {

    }

    render() {
        return <Row>
            <Col>
                <Form.Group controlId="newResponseRequestTextInput" style={{marginBottom : '8px', marginTop : '4px'}}>
                    <Form.Control
                        type="text"
                        placeholder="Write your own reply!"
                        onChange={e => this.textChangeHandler(e)}
                        value={this.state.newRequestText}
                    />
                </Form.Group>
                {this.state.newRequestText && this.state.newRequestText.length > 0 ?
                    <Row style={{marginBottom: '8px',}}>
                        <Col>
                            <Button
                                block
                                style={{ backgroundColor: colors.secondary}}
                                onClick={this.cancelButtonHandler}>
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                block
                                style={{ backgroundColor: colors.primary}}
                                onClick={this.submitButtonHandler}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                : null}
            </Col>
        </Row>
    };
}

export default GisSvgResponseView;
