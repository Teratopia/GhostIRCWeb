import React, { Component } from 'react';
import colors from '../styles/colors';
import { Button, Modal } from 'react-bootstrap';


class DeleteChatCardModal extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return <Modal show={this.props.showDeleteModal} onHide={this.props.hideDeleteModal}>
        <Modal.Header closeButton>
        <Modal.Title>Delete Chat Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                Deleting a chat card also deletes all of your ecto points, responses, and ratings associated with the chat card. It does not delete other users' responses or ratings, though it does dissociate them from the chat card. Deletion cannot be undone!
            </div>
            <div style={{marginTop : '12px'}}>
                Are you sure you want to delete this chat card?
            </div>
            </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor : colors.secondary}} onClick={this.props.hideDeleteModal}>
            Close
        </Button>
        <Button style={{backgroundColor : colors.danger}} onClick={this.props.confirmDelete}>
            Delete Chat Card
        </Button>
        </Modal.Footer>
    </Modal>
    }
}

export default DeleteChatCardModal;