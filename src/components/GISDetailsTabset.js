import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Badge, Tabs, Tab, Card } from 'react-bootstrap';

class GISDetailsTabset extends Component {
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

        return <Tabs defaultActiveKey="chatCards">
            <Tab eventKey="chatCards" title="CHAT CARDS">
                lorem ipsum
                
            </Tab>
            <Tab eventKey="details" title="DETAILS">
                a To me, fair friend, you never can be old, For as you were when first your eye I ey'd, Such seems your beauty still. Three winters cold, Have from the forests shook three summers' pride, Three beauteous springs to yellow autumn turn'd, In process of the seasons have I seen, Three April perfumes in three hot Junes burn'd, Since first I saw you fresh, which yet are green. Ah! yet doth beauty like a dial-hand, Steal from his figure, and no pace perceiv'd;
            </Tab>
        </Tabs>

    };
}

export default GISDetailsTabset;
