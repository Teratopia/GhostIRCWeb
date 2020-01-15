//GisSvgResponsesListCard

import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import GisSvgResponsesListCard from './GisSvgResponsesListCard';


class GisSvgResponsesList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.selectResponse = this.selectResponse.bind(this);
    }

    componentWillUnmount() {

    }

    selectResponse(response){
        this.props.selectResponse(response);
    }

    render() {
        if(!this.props.responses || this.props.responses.length === 0){
            return null;
        } else {
            return <Container fluid style={{padding : '0px', marginBottom : '40px'}}>
                {this.props.responses.map(response => {
                    return <GisSvgResponsesListCard
                            key={response._id}
                            response={response}
                            onClick={this.selectResponse}
                            />
                })}
            </Container>
        }
    };
}

export default GisSvgResponsesList;
