import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Row, Container, Col, Card } from 'react-bootstrap';
import { faEnvelope, faFlag, faPenNib, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

class GISChatCardsListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upvoteString: null,
            downvoteString: null,
            totalsString: null,
            voteTotals: 0,
            numEdits: 0,
            numFlags: 0
        }
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
            totalsString : abbreviateNumber(upvotes - downvotes),
            voteTotals : upvotes - downvotes,
            numEdits: edits,
            numFlags: flags,
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return <Card
            key={this.props.chatCard._id}
            onClick={() => { this.props.onClick(this.props.chatCard) }}
            style={this.props.chatCard
                && this.props.chatCard._id === this.props.selectedChatCardId ?
                { ...styles.chatCardCard, backgroundColor: colors.primaryFaded }
                : this.props.localSelectedChatCardId
                 && this.props.localSelectedChatCardId === this.props.chatCard._id ? 
                { ...styles.chatCardCard, backgroundColor: colors.tertiaryFaded }
                : styles.chatCardCard}>
            <Container>
                <Row>
                    <Col style={this.props.localSelectedChatCardId
                                && this.props.localSelectedChatCardId === this.props.chatCard._id ? 
                                styles.floatLeftHeaderExpanded 
                                : styles.floatLeftHeader}
                    >
                        {this.props.chatCard.text}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row style={constyles.centerContainer}>
                            <FontAwesomeIcon
                                style={styles.iconStyle}
                                icon={faEnvelope}
                                color={colors.primary}
                            />
                            <span style={styles.detailText}>
                                {this.props.chatCard.responseRequests.length}
                            </span>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={constyles.centerContainer}>
                            <FontAwesomeIcon
                                style={styles.iconStyle}
                                icon={this.state.voteTotals >= 0 ? faArrowUp : faArrowDown}
                                color={colors.tertiary}
                            />
                            <span style={styles.detailText}>
                                {this.state.voteTotals}
                            </span>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={constyles.centerContainer}>
                            <FontAwesomeIcon
                                style={styles.iconStyle}
                                icon={faPenNib}
                                color={colors.tertiary}
                            />
                            <span style={styles.detailText}>
                                {this.props.chatCard.bibliography.length}
                            </span>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Card>
    };
}

const styles = {
    floatLeftHeader: {
        ...constyles.genH3Text,
        fontWeight: '200',
        justifyContent: 'flex-start',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    floatLeftHeaderExpanded: {
        ...constyles.genH3Text,
        fontWeight: '200',
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
    floatRightIcons: {
        ...constyles.genH5Text,
        fontWeight: '200',
        justifyContent: 'flex-end',
        textAlign: 'right',
        alignItems: 'center',
        marginTop: '7px',
        marginBottom: '7px'
    },
    chatCardCard: {
        marginTop: '8px',
        marginRight: '8px',
        cursor: 'pointer'
    },
    iconStyle : {
        marginRight : '4px',
        marginLeft : '4px'
    },
    detailText : {
        ...constyles.centerContainer, 
        ...constyles.genH5Text, 
    },

}

export default GISChatCardsListCard;
