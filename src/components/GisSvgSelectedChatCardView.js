import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form, Modal } from 'react-bootstrap';
import { faAngleLeft, faAngleRight, faArrowUp, faArrowDown, faFlag, faPenNib, faEdit, faArrowCircleUp, faArrowCircleDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';
import DeleteChatCardModal from '../modals/DeleteChatCardModal';
import AddBibliographyModal from '../modals/AddBibliographyModal';

function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b", "t"];
        var suffixNum = Math.floor(("" + value).length / 3);
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
}

class GisSvgSelectedChatCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upvoteString: null,
            downvoteString: null,
            numEdits: 0,
            numFlags: 0,
            hasUpvoted : false,
            hasDownvoted : false,
            showDeleteModal : false,
            showBibliographyModal : false
        }
        this.clickBackCaretHandler = this.clickBackCaretHandler.bind(this);
        this.clickForwardCaretHandler = this.clickForwardCaretHandler.bind(this);
        this.clickUpvoteHandler = this.clickUpvoteHandler.bind(this);
        this.clickDownvoteHandler = this.clickDownvoteHandler.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    componentDidMount() {
        let downvotes = 0;
        let upvotes = 0;
        let edits = 0;
        let flags = 0;
        let hasUpvoted = false;
        let hasDownvoted = false;
        if (this.props.chatCard) {
            this.props.chatCard.chatCardRatings.forEach(rating => {
                rating.isDownvote ? downvotes++ : upvotes++;
                if(rating.userId === this.props.user._id){
                    rating.isDownvote ? hasDownvoted = true : hasUpvoted = true;
                }
            });
            this.props.chatCard.flags.forEach(flag => {
                flag.flagType === 'FLAG' ? flags++ : edits++;
            });
        }
        this.setState({
            upvoteString: abbreviateNumber(upvotes),
            downvoteString: abbreviateNumber(downvotes),
            numEdits: edits,
            numFlags: flags,
            hasUpvoted : hasUpvoted,
            hasDownvoted : hasDownvoted
        });
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.componentDidMount();
        }
    }

    componentWillUnmount() {

    }

    clickBackCaretHandler() {
        this.props.clickBackCaretHandler();
    }

    clickForwardCaretHandler() {
        this.props.clickForwardCaretHandler();
    }

    clickUpvoteHandler() {
        this.props.socket.emit('rateChatCard', {
            userId : this.props.user._id,
            chatCardId : this.props.chatCard._id,
            isUpvote : true,
            isDownvote : false,
            ghostId : this.props.chatCard.ghostId
        });
    }

    clickDownvoteHandler() {
        this.props.socket.emit('rateChatCard', {
            userId : this.props.user._id,
            chatCardId : this.props.chatCard._id,
            isUpvote : false,
            isDownvote : true,
            ghostId : this.props.chatCard.ghostId
        });
    }

    confirmDelete() {
        console.log('confirmDelete 1');
        this.props.socket.emit('deleteChatCard', {
            userId : this.props.user._id,
            chatCardId : this.props.chatCard._id,
            ghostId : this.props.chatCard.ghostId
        });
        this.setState({
            showDeleteModal : false
        });
    }

    render() {
        return <Container fluid>
            <Row className="show-grid" float="center" style={styles.topRow}>
                <Col xs={1} style={constyles.centerContainer} onClick={this.clickBackCaretHandler}>
                    { this.props.chatCardHistory.length > 1 ? 
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            color={colors.secondary}
                            size="2x"
                            style={styles.caretStyle}
                        />
                    : null }
                </Col>
                <Col xs={10}>

                    <Container style={{ ...constyles.centerContainer, ...constyles.genH3Text, fontWeight: '200' }}>
                        {this.props.chatCard ? this.props.chatCard.text : null}
                    </Container>

                </Col>
                <Col xs={1} style={constyles.centerContainer} onClick={this.clickForwardCaretHandler}>
                    {   this.props.chatCard.responses.length > 0 || 
                        this.props.chatCard.responseRequests.length > 0 ?
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            color={colors.secondary}
                            size="2x"
                            style={styles.caretStyle}
                        />
                    : null }
                    
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    {
                        this.props.user._id === this.props.chatCard.creatorId ?
                        this.props.ghost.baseChatCardIds.includes(this.props.chatCard._id) ?
                        <Row style={{...constyles.centerContainer, justifyContent : 'flex-start', ...constyles.genH4Text, textAlign : 'right'}}>
                            <FontAwesomeIcon
                                icon={faArrowUp}
                                color={colors.primary}
                                style={{...styles.detailIcon}}
                            />
                            <span style={styles.detailText}>
                                {this.state.upvoteString}
                            </span>
                            <FontAwesomeIcon
                                icon={faArrowDown}
                                color={colors.danger}
                                style={{...styles.detailIcon}}
                            />
                            <span style={styles.detailText}>
                                {this.state.downvoteString}
                            </span>
                        </Row>
                        :
                        <Row style={{...constyles.centerContainer, justifyContent : 'flex-start', ...constyles.genH4Text, textAlign : 'right'}}>
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{...styles.detailIcon, cursor: 'pointer'}}
                                color={colors.secondary}
                                onClick={() => { this.setState({ showDeleteModal : true }) }}
                            />
                            <FontAwesomeIcon
                                icon={faArrowUp}
                                color={colors.primary}
                                style={{...styles.detailIcon}}
                            />
                            <span style={styles.detailText}>
                                {this.state.upvoteString}
                            </span>
                            <FontAwesomeIcon
                                icon={faArrowDown}
                                color={colors.danger}
                                style={{...styles.detailIcon}}
                            />
                            <span style={styles.detailText}>
                                {this.state.downvoteString}
                            </span>
                        </Row>
                        :
                        <Row style={{...constyles.centerContainer, justifyContent : 'flex-start', ...constyles.genH4Text, textAlign : 'right'}}>
                            <FontAwesomeIcon
                                icon={this.state.hasUpvoted ? faArrowCircleUp : faArrowUp}
                                color={this.state.hasUpvoted ? colors.primary : colors.secondary}
                                style={{...styles.detailIcon, cursor: 'pointer'}}
                                onClick={this.clickUpvoteHandler}
                            />
                            <span style={styles.detailText}>
                                {this.state.upvoteString}
                            </span>
                            <FontAwesomeIcon
                                icon={this.state.hasDownvoted ? faArrowCircleDown : faArrowDown}
                                color={this.state.hasDownvoted ? colors.danger : colors.secondary}
                                style={{...styles.detailIcon, cursor: 'pointer'}}
                                onClick={this.clickDownvoteHandler}
                            />
                            <span style={styles.detailText}>
                                {this.state.downvoteString}
                            </span>
                        </Row>
                    }
                    
                </Col>
                <Col xs={6}>
                    <Container style={{ ...constyles.centerContainer, ...constyles.genH6Text, fontWeight: '100' }}>
                        {this.props.chatCard ?
                            moment(this.props.chatCard.createDate).format("MMM Do YYYY")
                            : null}
                    </Container>
                </Col>
                <Col xs={3}>
                    <Row style={{...constyles.centerContainer, justifyContent : 'flex-end', ...constyles.genH4Text, textAlign : 'right'}}>
                        <FontAwesomeIcon
                            icon={faEdit}
                            color={colors.secondary}
                            style={styles.detailIcon}
                        />
                        <span style={styles.detailText}>
                        {this.state.numEdits}
                        </span>
                        <FontAwesomeIcon
                            icon={faFlag}
                            color={colors.secondary}
                            style={styles.detailIcon}
                        />
                        <span style={styles.detailText}>
                            {this.state.numFlags}
                        </span>
                        <FontAwesomeIcon
                            icon={faPenNib}
                            color={colors.secondary}
                            style={{...styles.detailIcon, cursor: 'pointer'}}
                            onClick={() => this.setState({ showBibliographyModal : true })}
                        />
                        <span style={styles.detailText}>
                        {this.props.chatCard.bibliography.length}
                        </span>
                    </Row>
                </Col>
            </Row>

            <DeleteChatCardModal
                showDeleteModal={this.state.showDeleteModal}
                hideDeleteModal={() => { this.props.setState({ showDeleteModal : false }) }}
                confirmDelete={this.confirmDelete}
            />

            <AddBibliographyModal
                showModal={this.state.showBibliographyModal}
                hideModal={() => this.setState({ showBibliographyModal : false })}
            />

        </Container>


    };
}

const styles = {
    topRow: {
        paddingTop: '24px',
        paddingBottom: '24px'
    },
    detailIcon : {
        marginLeft : '4px', 
        marginRight : '4px',
        //cursor: 'pointer'
    },
    detailText : {
        ...constyles.centerContainer, 
        ...constyles.genH4Text, 
        textAlign : 'left', 
        marginRight : '8px'
    },
    caretStyle : {
        cursor: 'pointer'
    }
}

export default GisSvgSelectedChatCardView;
