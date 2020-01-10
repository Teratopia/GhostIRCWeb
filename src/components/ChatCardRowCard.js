import React, { Component } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Row, Container, Col, Card } from 'react-bootstrap';
import { faArrowUp, faArrowDown, faEdit, faEnvelopeOpenText, faPenNib, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
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

class ChatCardRowCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewDetails: false,
            upvoteNum: '0',
            downvoteNum: '0',
            upvoteSum : '0'
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        let count = 0;
        if(this.props.chatCard.ratings){
            this.props.chatCard.ratings.forEach(rating => {
                rating.isUpvote ? count++ : count--;
            });
        }
        this.setState({upvoteSum : abbreviateNumber(count)});
    }

    componentDidUpdate(previousProps, previousState){
        if(this.props.isActive && !this.state.viewDetails){
            this.setState({
                viewDetails: true
            });
        }
        if(!this.props.isActive && this.state.viewDetails){
            this.setState({
                viewDetails: false
            });
        }
    }

    componentWillUnmount() {

    }

    clickHandler() {
        if (!this.props.overrideOnPress) {
            let numUpvotes = 0;
            let numDownvotes = 0;
            this.props.chatCard.ratings.forEach(rating => {
                rating.isUpvote ? numUpvotes++ : numDownvotes++;
            })

            this.setState({
                viewDetails: !this.state.viewDetails,
                upvoteNum: abbreviateNumber(numUpvotes),
                downvoteNum: abbreviateNumber(numUpvotes),

            });
        }
        if (this.props.onPress) {
            this.props.onPress(this.props.chatCard);
        }
    }

    render() {
        return <Card
            key={this.props.chatCard._id}
            style={
                this.props.isActive ?
                    { ...styles.parentCard, ...this.props.style, backgroundColor: colors.primaryFaded }
                    :
                    { ...styles.parentCard, ...this.props.style }
            }
            onClick={this.clickHandler}
        //onClick={() => { this.setState({ selectedRouteChatCard: chatCard }) }}
        //style={this.state.selectedRouteChatCard && chatCard._id === this.state.selectedRouteChatCard._id ? { ...styles.chatCardContainer, backgroundColor: colors.primaryFaded } : styles.chatCardContainer}
        >
            {!this.state.viewDetails ?
                <div style={{
                    //backgroundColor : 'blue', 
                paddingRight : '15px',
                paddingLeft : '15px',
                width : '100%', 
                'flexDirection' : 'row', 
                display: 'flex', 
                justifyContent : 'space-between'
                }}>
                        <span
                        style={{...styles.headerText,
                             ...constyles.genH4Text,
                              textAlign : 'left', 
                              //backgroundColor : 'red',
                                //width : '100%'
                            }}
                        >
                            {this.props.chatCard.text}
                            </span>
                            
                        {this.props.ghost && this.props.user &&
                         this.props.ghost.moderatorIds.includes(this.props.user._id) ?
                            <span style={{
                                //backgroundColor : 'yellow',
                                'justifyContent' : 'flex-end',
                                alignItems : 'flex-end',
                                //width : '100%',
                                fontAlign : 'right'
                                //marginLeft : 'auto',
                                //marginRight : 'auto'
                            }}
                            
                            >


                                {this.props.chatCard.responseRequests.length > 0 ?
                                    <FontAwesomeIcon
                                        icon={faEnvelopeOpenText}
                                        color={colors.tertiary}
                                        style={styles.iconStyle}
                                    />
                                    : null}
                                {this.props.chatCard.bibliography.length > 0 ?
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        color={colors.dark}
                                        style={styles.iconStyle}
                                    />
                                    : null}
                                {this.props.chatCard.flags.length > 0 ?
                                    <FontAwesomeIcon
                                        icon={faExclamationCircle}
                                        color={colors.dark}
                                        style={styles.iconStyle}
                                    />
                                    : null}
                                
                                    <FontAwesomeIcon
                                        icon={faArrowUp}
                                        color={colors.primary}
                                        style={styles.iconStyle}
                                    />
                                    {this.state.upvoteSum}
                                    </span>
                            
                        : <span 
                            //md="auto"
                            //xs={2}
                                style={styles.headerText}>
                            <FontAwesomeIcon
                                        icon={faArrowUp}
                                        color={colors.primary}
                                        style={styles.iconStyle}
                                    />
                                    {this.state.upvoteSum}
                        </span>}
                </div>
                :
                <Container fluid>
                    <Row>
                        <Col>
                            <Row>
                                <Col style={{...constyles.genH4Text, textAlign : 'left'}}>
                                    {this.props.chatCard.text}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    { this.props.chatCard.responses.length > 0 ?
                    <div style={{
                                height : '1px', 
                                backgroundColor : colors.secondary,
                                marginBottom : '4px'
                            }}>
                    </div>
                    : null }
                    {this.props.chatCard.responses.length > 0 ?
                    <Row>
                        <Col style={{paddingRight : '20px', paddingLeft : '20px'}}>
                            <Row>
                                <Col style={{...styles.headerText, ...constyles.genH6Text, textAlign : 'center'}}>
                                {
                                    this.props.chatCard.responses.length === 1 ? 
                                    '1 Response:'
                                    :
                                    this.props.chatCard.responses.length+' Responses:'
                                }
                                </Col>
                            </Row>
                            {this.props.chatCard.responses.map((resp, idx) => {
                                if(idx < 3){
                                    return <Row key={'respKey'+idx}>
                                        <Col style={{...styles.headerText, ...constyles.genH5Text, textAlign : 'left'}}>
                                            {idx+1}. {resp.text}
                                        </Col>
                                    
                                    </Row>
                                } else if (idx === 3) {
                                    return <Row key={'respKey'+idx}>
                                        <Col style={{...styles.headerText, ...constyles.genH5Text, textAlign : 'left'}}>
                                            ...
                                        </Col>
                                    </Row>
                                } else {
                                    return null;
                                }
                            })}
                        </Col>
                    </Row>
                    : null }
                    { this.props.chatCard.responseRequests.length > 0 ?
                    <div style={{
                                height : '1px', 
                                backgroundColor : colors.secondary,
                                marginBottom : '4px'
                            }}>
                    </div>
                    : null }
                    {this.props.chatCard.responseRequests.length > 0 ?
                    <Row>
                        <Col style={{paddingRight : '20px', paddingLeft : '20px'}}>
                            <Row>
                                <Col style={{...styles.headerText, ...constyles.genH6Text, textAlign : 'center'}}>
                                {
                                    this.props.chatCard.responseRequests.length === 1 ? 
                                    '1 Response Request:'
                                    :
                                    this.props.chatCard.responseRequests.length+' Response Requests:'
                                }
                                </Col>
                            </Row>
                            {this.props.chatCard.responseRequests.map((resp, idx) => {
                                if(idx < 3){
                                    return <Row key={'respKey'+idx}>
                                        <Col style={{...styles.headerText, ...constyles.genH5Text, textAlign : 'left'}}>
                                            {idx+1}. {resp.text}
                                        </Col>
                                    
                                    </Row>
                                } else if (idx === 3) {
                                    return <Row key={'respKey'+idx}>
                                        <Col style={{...styles.headerText, ...constyles.genH5Text, textAlign : 'left'}}>
                                            ...
                                        </Col>
                                    </Row>
                                } else {
                                    return null;
                                }
                            })}
                        </Col>
                    </Row>
                    : null }
                    <div style={{
                                height : '1px', 
                                backgroundColor : colors.secondary,
                                marginBottom : '4px'
                            }}>
                    </div>
                    <Row>
                        <Col>
                            <Row style={styles.centeredRow}>
                                        <FontAwesomeIcon
                                            icon={faArrowUp}
                                            color={colors.primary}
                                            style={styles.iconStyle}
                                        />
                                        {this.state.upvoteNum}
                            </Row>
                        </Col>
                        <Col>
                            <Row style={styles.centeredRow}>
                                        <FontAwesomeIcon
                                            icon={faArrowDown}
                                            color={colors.danger}
                                            style={styles.iconStyle}
                                        />
                                        {this.state.downvoteNum}
                            </Row>
                        </Col>
                        <Col>
                            <Row style={styles.centeredRow}>
                                        <FontAwesomeIcon
                                            icon={faExclamationCircle}
                                            color={colors.dark}
                                            style={styles.iconStyle}
                                        />
                                        {this.props.chatCard.flags.length}
                            </Row>
                        </Col>
                        <Col>
                            <Row style={styles.centeredRow}>
                                        <FontAwesomeIcon
                                            icon={faPenNib}
                                            color={colors.tertiary}
                                            style={styles.iconStyle}
                                        />
                                        {this.props.chatCard.bibliography.length}
                            </Row>
                        </Col>
                        
                        
                    </Row>
          
                </Container>
                }
            

            {
                /*
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Body>This is some text within a card body.</Card.Body>
                */
            }

        </Card>
    };
}

const styles = {
    parentCard: {
        'paddingTop': '4px',
        'paddingBottom': '4px',
        'cursor': 'pointer'
    },
    headerText: {
        'justifyContent': 'flex-start',
        'whiteSpace': 'nowrap',
        'overflow': 'hidden',
        'textOverflow': 'ellipsis'
    },
    headerIcons: {
        'justifyContent': 'flex-end',
        'justifyContent': 'center'
    },
    iconStyle: {
        'marginRight': '2px',
        'marginLeft': '2px'
    },
    centeredRow: {
        'justifyContent': 'center',
        'alignItems': 'center'
    },
    openIconCol : {
        'marginRight' : '14px'
    }
}

export default ChatCardRowCard;
