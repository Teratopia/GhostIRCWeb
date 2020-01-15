import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
            <Col xs={8}>
                <Container fluid style={{ ...constyles.genH3Text, paddingTop: '4px' }}>
                    {this.props.ghost ? this.props.ghost.name : null}
                </Container>
            </Col>
            <Col xs={2} style={{...constyles.centerContainer, fontSize : '24px'}}>
                <FontAwesomeIcon
                    style={{ margin: 'auto', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '4px' }}
                    icon={faArrowUp}
                    color={colors.secondary}
                />
                <FontAwesomeIcon
                    style={{ margin: 'auto', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '4px' }}
                    icon={faArrowDown}
                    color={colors.secondary}
                />
            </Col>
        </Row>
    };
}

export default GisSgvHeader;
