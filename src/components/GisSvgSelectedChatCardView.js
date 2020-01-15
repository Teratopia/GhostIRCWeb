import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import { faAngleLeft, faAngleRight, faArrowUp, faArrowDown, faFlag, faPenNib, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

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
            numFlags: 0
        }
        this.clickBackCaretHandler = this.clickBackCaretHandler.bind(this);
        this.clickForwardCaretHandler = this.clickForwardCaretHandler.bind(this);
    }

    componentDidMount() {
        let downvotes = 0;
        let upvotes = 0;
        let edits = 0;
        let flags = 0;
        if (this.props.chatCard) {
            this.props.chatCard.ratings.forEach(rating => {
                rating.isDownvote ? downvotes++ : upvotes++;
            });
            this.props.chatCard.flags.forEach(flag => {
                flag.flagType === 'FLAG' ? flags++ : edits++;
            })
        }
        this.setState({
            upvoteString: abbreviateNumber(upvotes),
            downvoteString: abbreviateNumber(downvotes),
            numEdits: edits,
            numFlags: flags
        });
    }

    componentWillUnmount() {

    }

    clickBackCaretHandler() {
        this.props.clickBackCaretHandler();
    }

    clickForwardCaretHandler() {
        this.props.clickForwardCaretHandler();
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
                    <Row style={{...constyles.centerContainer, justifyContent : 'flex-start', ...constyles.genH4Text, textAlign : 'right'}}>
                        <FontAwesomeIcon
                            icon={faArrowUp}
                            color={colors.secondary}
                            style={styles.detailIcon}
                        />
                        <span style={styles.detailText}>
                            {this.state.upvoteString}
                        </span>
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            color={colors.secondary}
                            style={styles.detailIcon}
                        />
                        <span style={styles.detailText}>
                            {this.state.downvoteString}
                        </span>
                    </Row>
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
                            style={styles.detailIcon}
                        />
                        <span style={styles.detailText}>
                        {this.props.chatCard.bibliography.length}
                        </span>
                    </Row>
                </Col>
            </Row>
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
        marginRight : '4px'
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
