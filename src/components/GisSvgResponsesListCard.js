import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Row, Container, Col, Card } from 'react-bootstrap';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GisSvgResponsesListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return <Card
        key={this.props.response._id}
        onClick={() => { this.props.onClick(this.props.response) }}
        style={!this.props.response.destinationCCId ? 
         { ...styles.responseCard, backgroundColor: colors.secondaryFaded }
          : styles.responseCard}>
        <Container>
            <Row>
                <Col style={styles.floatLeftHeader}>
                    {this.props.response.text}
                </Col>
                <Col style={styles.floatRightIcons}>
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            style={{ marginRight: 6, marginTop: 6 }}
                            color={colors.secondary}
                        />

                        <FontAwesomeIcon
                            icon={faArrowUp}
                            style={{ marginRight: 6, marginTop: 6 }}
                            color={colors.secondary}
                        />
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
    responseCard: {
        marginBottom: '8px',
        cursor: 'pointer'
    },

}

export default GisSvgResponsesListCard;
