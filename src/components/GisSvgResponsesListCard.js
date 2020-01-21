import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Row, Container, Col, Card, Modal, Button } from 'react-bootstrap';
import { faArrowDown, faArrowUp, faArrowCircleDown, faArrowCircleUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GisSvgResponsesListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasUpvoted : false,
            hasDownvoted : false,
            showDeleteModal : false
        }
        this.clickUp = this.clickUp.bind(this);
        this.clickDown = this.clickDown.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    componentDidMount() {
        let hasUpvoted = false;
        let hasDownvoted = false;
        this.props.response.responseRatings.forEach(rating => {
            console.log('componentDidMount rating = ', rating);
            if(rating.userId === this.props.user._id){
                if(rating.isUpvote){
                    hasUpvoted = true;
                }
                if(rating.isDownvote){
                    hasDownvoted = true;
                }
            }
        });
        this.setState({
            hasUpvoted : hasUpvoted,
            hasDownvoted : hasDownvoted
        });
    }

    componentDidUpdate(prevProps) {
        console.log('GisSvgResponsesListCard componentDidUpdate');
        if(prevProps.response !== this.props.response){
            console.log('GisSvgResponsesListCard componentDidUpdate 2 this.props.response = ', this.props.response);
            this.componentDidMount();
        }
    }

    componentWillUnmount() {

    }

    clickUp() {
        console.log('clickUp');
        this.props.socket.emit('rateResponse', {
            userId : this.props.user._id,
            responseId : this.props.response._id,
            isUpvote : true,
            isDownvote : false,
            ghostId : this.props.ghost._id
        });
    }

    clickDown() {
        console.log('clickDown');
        this.props.socket.emit('rateResponse', {
            userId : this.props.user._id,
            responseId : this.props.response._id,
            isUpvote : false,
            isDownvote : true,
            ghostId : this.props.ghost._id
        });
    }

    confirmDelete() {
        this.props.socket.emit('deleteResponse', {
            userId : this.props.user._id,
            responseId : this.props.response._id,
            ghostId : this.props.ghost._id
        });
    }

    render() {
        return <Card
        key={this.props.response._id}
        style={!this.props.response.destinationCCId ? 
         { ...styles.responseCard, backgroundColor: colors.secondaryFaded }
          : styles.responseCard}>
        <Container>
            <Row>
                <Col xs={9} lg={9}
                onClick={() => { this.props.onClick(this.props.response) }} 
                style={styles.floatLeftHeader}>
                    {this.props.response.text}
                </Col>
                {
                    this.props.user._id === this.props.response.requesterId
                    || this.props.ghost.moderatorIds.includes(this.props.user._id) ?
                    <Col xs={3} lg={3} style={styles.floatRightIcons}>
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{ marginRight: 6, marginTop: 6, ...constyles.genH4Text }}
                            color={colors.secondary}
                            onClick={() => { this.setState({ showDeleteModal : true }) }}
                        />
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            style={{ marginRight: 6, marginTop: 6, ...constyles.genH4Text }}
                            color={colors.secondary}
                        />
                        <FontAwesomeIcon
                            icon={faArrowUp}
                            style={{ marginRight: 6, marginTop: 6, ...constyles.genH4Text }}
                            color={colors.secondary}
                        />
                    </Col>
                    :
                    <Col xs={3} lg={3} style={styles.floatRightIcons}>
                    </Col>
                }
                
            </Row>
        </Container>

        <Modal show={this.state.showDeleteModal} onHide={() => { this.setState({ showDeleteModal : false }) }}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Chat Card Response</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Deleting a response also deletes all ecto points, ratings, and chat card paths connected to it. Deletion cannot be undone!
                </div>
                <div style={{marginTop : '12px'}}>
                    Are you sure you want to delete this response?
                </div>
                </Modal.Body>
            <Modal.Footer>
            <Button style={{backgroundColor : colors.secondary}} onClick={() => { this.setState({ showDeleteModal : false }) }}>
                Close
            </Button>
            <Button style={{backgroundColor : colors.danger}} onClick={this.confirmDelete}>
                Delete Response
            </Button>
            </Modal.Footer>
        </Modal>

    </Card>
    };
}

const styles = {
    floatLeftHeader : { 
        ...constyles.genH3Text, 
        fontWeight: '200', 
        justifyContent: 'flex-start', 
        textAlign: 'left' 
    },
    floatRightIcons : { 
        ...constyles.genH5Text, 
        fontWeight: '200', 
        justifyContent: 'flex-end', 
        textAlign: 'right', 
        alignItems: 'center', 
        marginTop: '7px', 
        marginBottom: '7px' 
    },
    responseCard: {
        marginBottom: '8px',
        cursor: 'pointer'
    },

}

export default GisSvgResponsesListCard;
