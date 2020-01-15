import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Row, Container, Col, Card } from 'react-bootstrap';
import { faEnvelope, faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GISGhostsListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasResponseRequests : false,
            hasFlags : false
        }
    }

    componentDidMount() {
        if(this.props.ghost && this.props.ghost.chatCards){
            let hasResponseRequestsFlag = false;
            let hasFlagsFlag = false;
            this.props.ghost.chatCards.forEach(chatCard => {
                if(!this.state.hasResponseRequests 
                    && chatCard.responseRequests 
                    && chatCard.responseRequests.length > 0){
                    hasResponseRequestsFlag = true;
                }
                if(!this.state.hasFlags 
                    && chatCard.chatCardFlags 
                    && chatCard.chatCardFlags.length > 0){
                    hasFlagsFlag = true;
                }
            })
            this.setState({
                hasResponseRequests : hasResponseRequestsFlag,
                hasFlags : hasFlagsFlag
            })
        }
    }

    componentWillUnmount() {

    }

    render() {
        return <Card
        key={this.props.ghost._id}
        onClick={() => { this.props.onClick(this.props.ghost) }}
        style={this.props.selectedGhostId
         && this.props.ghost._id === this.props.selectedGhostId ? 
         { ...styles.ghostCard, backgroundColor: colors.primaryFaded }
          : styles.ghostCard}>
        <Container>
            <Row>
                <Col style={styles.floatLeftHeader}>
                    {this.props.ghost.name}
                </Col>
                <Col style={styles.floatRightIcons}>
                    {
                        this.state.hasResponseRequests ? 
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ marginRight: 6, marginTop: 6 }}
                            color={colors.primary}
                        />
                        : null
                    }
                    {
                        this.state.hasFlags ? 
                        <FontAwesomeIcon
                            icon={faFlag}
                            style={{ marginRight: 6, marginTop: 6 }}
                            color={colors.danger}
                        />
                        : null
                    }
                    
                    {this.props.ghost.type}
                </Col>
            </Row>
        </Container>
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
    ghostCard: {
        marginTop: '8px',
        marginRight: '8px',
        cursor: 'pointer'
    },

}

export default GISGhostsListCard;
