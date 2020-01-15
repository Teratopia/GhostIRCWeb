import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import GISGhostsListCard from './GISGhostsListCard';


class GISGhostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.selectGhost = this.selectGhost.bind(this);
    }

    componentWillUnmount() {

    }

    selectGhost(ghost){
        this.props.selectGhost(ghost);
    }

    render() {
        return <Container fluid>
            {this.props.ghosts.map(ghost => {
                return <GISGhostsListCard
                        key={ghost._id}
                        ghost={ghost}
                        selectedGhostId={this.props.selectedGhostId}
                        onClick={this.selectGhost}
                        />
            })}
        </Container>
    };
}

export default GISGhostsList;
