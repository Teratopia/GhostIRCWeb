import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Modal } from 'react-bootstrap';
import { faArrowUp, faArrowDown, faArrowCircleDown, faArrowCircleUp, faPlusSquare, faTimes, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

class GisSgvHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasUpvote : false,
            hasDownvote : false,
            showAddGhostModal : false
        }
        //this.doInit = this.doInit.bind(this);
        this.clickUpvoteHandler = this.clickUpvoteHandler.bind(this);
        this.clickDownvoteHandler = this.clickDownvoteHandler.bind(this);
        this.befriendGhost = this.befriendGhost.bind(this);
        this.unfriendGhost = this.unfriendGhost.bind(this);
    }

    componentDidMount() {
        let hasUpvote = false;
        let hasDownvote = false;
        if(this.props.ghost){
            this.props.ghost.ghostRatings.forEach(rating => {
                if(rating.userId === this.props.user._id){
                    rating.isUpvote ? hasUpvote = true : hasDownvote = true;
                }
            });
        }
        this.setState({
            hasUpvote : hasUpvote,
            hasDownvote : hasDownvote
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.componentDidMount();
        }
    }

    componentWillUnmount() {

    }

   clickUpvoteHandler() {
       console.log('clickUpvoteHandler');
        this.props.socket.emit('rateGhost', {
            userId : this.props.user._id,
            isUpvote : true,
            isDownvote : false,
            ghostId : this.props.ghost._id
        });
    }

    clickDownvoteHandler() {
        console.log('clickDownvoteHandler');
        this.props.socket.emit('rateGhost', {
            userId : this.props.user._id,
            isUpvote : false,
            isDownvote : true,
            ghostId : this.props.ghost._id
        });
    }

    befriendGhost() {
        console.log('befriendGhost req = ', {
            userId : this.props.user._id,
            ghostId : this.props.ghost._id
        });
        this.props.socket.emit('befriendGhost', {
            userId : this.props.user._id,
            ghostId : this.props.ghost._id
        });
        this.setState({
            showAddGhostModal : false
        });
    }

    unfriendGhost() {
        console.log('unfriendGhost req = ', {
            userId : this.props.user._id,
            ghostId : this.props.ghost._id
        });
        this.props.socket.emit('unfriendGhost', {
            userId : this.props.user._id,
            ghostId : this.props.ghost._id
        });
        this.setState({
            showRemoveGhostModal : false
        });
        if(this.props.nullifySelectedGhost){
            this.props.nullifySelectedGhost();
        }
    }

    render() {
        return <Row style={{ marginTop: '12px', borderBottom : '1px solid '+colors.secondaryFaded}}>
            <Col xs={2}>
                <Container style={constyles.genH6Text}>
                    Ecto
                </Container>
                <Container style={constyles.genH4Text}>
                    {this.props.ghost.scores.upvotes - this.props.ghost.scores.downvotes}
                </Container>
            </Col>
            <Col xs={2} style={{...constyles.centerContainer, ...constyles.genH6Text}}>
                {this.props.ghost.type}
            </Col>
            <Col xs={4}>
                <Container fluid style={{ ...constyles.centerContainer, ...constyles.genH3Text}}>
                    {this.props.ghost ? this.props.ghost.name : null}
                </Container>
            </Col>
            <Col xs={2} style={{...constyles.centerContainer, ...constyles.genH6Text}}>
                {moment(this.props.ghost.createDate).format("MMM Do YYYY")}
            </Col>
                {
                    this.props.user._id !== this.props.ghost.creatorId ?
                    <Col xs={2} style={{...constyles.centerContainer, fontSize : '24px'}}>
                        <FontAwesomeIcon
                            style={{...constyles.centerContainer, marginRight : '8px', cursor: 'pointer'}}
                            icon={this.state.hasUpvote ? faArrowCircleUp : faArrowUp}
                            color={this.state.hasUpvote ? colors.primary : colors.secondary}
                            onClick={this.clickUpvoteHandler}
                        />
                        <FontAwesomeIcon
                            style={{...constyles.centerContainer, cursor: 'pointer'}}
                            icon={this.state.hasDownvote ? faArrowCircleDown : faArrowDown}
                            color={this.state.hasDownvote ? colors.danger : colors.secondary}
                            onClick={this.clickDownvoteHandler}
                        />
                        { this.props.user.ghostFriendIds.includes(this.props.ghost._id) ?
                            <FontAwesomeIcon
                                style={{...constyles.centerContainer, marginLeft : '8px', cursor: 'pointer'}}
                                icon={faMinusSquare}
                                color={'gold'}
                                onClick={() => { this.setState({ showRemoveGhostModal : true }) }}
                            />
                        :
                            <FontAwesomeIcon
                                style={{...constyles.centerContainer, marginLeft : '8px', cursor: 'pointer'}}
                                icon={faPlusSquare}
                                color={colors.secondary}
                                onClick={() => { this.setState({ showAddGhostModal : true }) }}
                            />
                        }
                        { this.props.onSearchScreen ? 
                            <FontAwesomeIcon
                                style={{...constyles.centerContainer, marginLeft : '8px', cursor: 'pointer'}}
                                icon={faTimes}
                                color={colors.secondary}
                                onClick={this.props.nullifySelectedGhost}
                            />
                        :
                        null }
                    </Col>
                    :
                    <Col xs={2} style={{...constyles.centerContainer, fontSize : '24px'}}>
                        
{/*
                        <FontAwesomeIcon
                            style={{...constyles.centerContainer, marginRight : '8px'}}
                            icon={faArrowUp}
                            color={colors.secondary}
                        />
                        <FontAwesomeIcon
                            style={{...constyles.centerContainer}}
                            icon={faArrowDown}
                            color={colors.secondary}
                        />
                        
*/}
                        { this.props.onSearchScreen ? 
                            <FontAwesomeIcon
                                style={{...constyles.centerContainer, marginLeft : '8px', cursor: 'pointer'}}
                                icon={faPlusSquare}
                                color={colors.secondary}
                                onClick={() => { this.setState({ showAddGhostModal : true }) }}
                            />
                        :
                        null }
                        { this.props.onSearchScreen ? 
                            <FontAwesomeIcon
                                style={{...constyles.centerContainer, marginLeft : '8px', cursor: 'pointer'}}
                                icon={faTimes}
                                color={colors.secondary}
                                onClick={this.props.nullifySelectedGhost}
                            />
                        :
                        null }
                        
                    </Col>
                }


            <Modal show={this.state.showDeleteModal} onHide={() => { this.setState({ showDeleteModal : false }) }}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Ghost</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Deleting a ghost also deletes all chat cards and responses associated with the ghost. All ratings are dissociated from the ghost, and will no longer contribute to your total ecto score. This may even result in a negative ecto score. To achieve the same result as deletion you may consider 'resting' your ghost, an option available in the details section. Deletion cannot be undone!
                    </div>
                    <div style={{marginTop : '12px'}}>
                        Are you sure you want to delete this ghost?
                    </div>
                    </Modal.Body>
                <Modal.Footer>
                <Button style={{backgroundColor : colors.secondary}} onClick={() => { this.setState({ showDeleteModal : false }) }}>
                    Close
                </Button>
                <Button style={{backgroundColor : colors.danger}} onClick={this.confirmDelete}>
                    Delete Ghost
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={this.state.showAddGhostModal} onHide={() => { this.setState({ showAddGhostModal : false }) }}>
                <Modal.Header closeButton>
                <Modal.Title>Befriend Ghost</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Befriending a ghost from a remote location costs 100 ecto!
                    </div>
                    <div style={{marginTop : '12px'}}>
                        Are you sure you want to befriend this ghost?
                    </div>
                    </Modal.Body>
                <Modal.Footer>
                <Button style={{backgroundColor : colors.secondary}} onClick={() => { this.setState({ showAddGhostModal : false }) }}>
                    Close
                </Button>
                <Button style={{backgroundColor : colors.primary}} onClick={this.befriendGhost}>
                    Befriend Ghost!
                </Button>
                </Modal.Footer>
            </Modal>
            
            <Modal show={this.state.showRemoveGhostModal} onHide={() => { this.setState({ showRemoveGhostModal : false }) }}>
                <Modal.Header closeButton>
                <Modal.Title>Unfriend Ghost</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Unfriending a ghost means you cannot add responses!
                    </div>
                    <div style={{marginTop : '12px'}}>
                        Are you sure you want to unfriend this ghost?
                    </div>
                    </Modal.Body>
                <Modal.Footer>
                <Button style={{backgroundColor : colors.secondary}} onClick={() => { this.setState({ showRemoveGhostModal : false }) }}>
                    Close
                </Button>
                <Button style={{backgroundColor : colors.danger}} onClick={this.unfriendGhost}>
                    Unfriend Ghost
                </Button>
                </Modal.Footer>
            </Modal>

        </Row>
    };
}

export default GisSgvHeader;
