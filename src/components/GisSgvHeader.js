import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

class GisSgvHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalEcto: 0
        }
    }

    componentDidMount() {
        if (this.props.ghost) {
            if (this.props.ghost.scores
                && this.props.ghost.scores.upvotes
                && this.props.ghost.scores.downvotes) {
                this.setState({
                    totalEcto: this.props.ghost.scores.upvotes - this.props.ghost.scores.downvotes
                })
            }
        }
    }

    componentWillUnmount() {

    }

    render() {
        return <Row style={{ marginTop: '12px', borderBottom : '1px solid '+colors.secondaryFaded}}>
            <Col xs={2}>
                <Container style={constyles.genH6Text}>
                    Ecto
                </Container>
                <Container style={constyles.genH4Text}>
                    {this.state.totalEcto}
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
            <Col xs={2} style={{...constyles.centerContainer, fontSize : '24px'}}>
                <FontAwesomeIcon
                    style={{...constyles.centerContainer, marginRight : '8px'}}
                    icon={faArrowUp}
                    color={colors.secondary}
                />
                <FontAwesomeIcon
                    style={constyles.centerContainer}
                    icon={faArrowDown}
                    color={colors.secondary}
                />
            </Col>
        </Row>
    };
}

export default GisSgvHeader;
