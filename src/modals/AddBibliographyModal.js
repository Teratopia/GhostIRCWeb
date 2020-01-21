import React, { Component } from 'react';
import colors from '../styles/colors';
import { Button, Modal, Row, Col, ButtonGroup, Form } from 'react-bootstrap';


class AddBibliographyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bibliographyType : 'WEBSITE',
            mainInput : ''
        }
        this.onConfirm = this.onConfirm.bind(this);
    }

    onConfirm() {

    }

    render() {
        return <Modal show={this.props.showModal} onHide={this.props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Chat Card Bibliography Citation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <div className="d-flex flex-column">
                            <ButtonGroup className="mt-3">
                                <Button
                                    onClick={() => {this.setState({ bibliographyType : 'WEBSITE' })}}
                                    style={this.state.bibliographyType === 'WEBSITE' ? 
                                    {backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}
                                >Website</Button>
                                <Button
                                    onClick={() => {this.setState({ bibliographyType : 'BOOK' })}}
                                    style={this.state.bibliographyType === 'BOOK' ? 
                                    {backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}
                                >Book</Button>
                                <Button
                                    onClick={() => {this.setState({ bibliographyType : 'JOURNAL' })}}
                                    style={this.state.bibliographyType === 'JOURNAL' ? 
                                    {backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}
                                >Journal</Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>
                                Website URL
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="www.someWebsite.com/relevantPage"
                                onChange={e => { this.setState({ mainInput: e.target.value }) }}
                                value={this.state.mainInput}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{ backgroundColor: colors.secondary }} onClick={this.props.hideModal}>
                    Close
        </Button>
                <Button style={{ backgroundColor: colors.primary }} onClick={this.onConfirm}>
                    Add Citation
        </Button>
            </Modal.Footer>
        </Modal>
    }
}

export default AddBibliographyModal;