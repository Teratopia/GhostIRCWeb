import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Badge, Tabs, Tab, Card } from 'react-bootstrap';

import GISGhostsList from './GISGhostsList';

class GISGhostsTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.selectGhost = this.selectGhost.bind(this);
        this.createGhostButtonHandler = this.createGhostButtonHandler.bind(this);
    }

    selectGhost(ghost){
        this.props.selectGhost(ghost);
    }

    createGhostButtonHandler(){
        this.props.onCreateGhost();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.ghosts !== this.props.ghosts){
            console.log('prevProps.ghosts !== this.props.ghosts');
            this.render();
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {

        return <Tabs defaultActiveKey="myGhosts">
            <Tab eventKey="myGhosts" title="MY GHOSTS">

            <Button 
                size="lg" 
                block 
                style={{backgroundColor : colors.primary, marginTop : '8px'}}
                onClick={this.createGhostButtonHandler}
            >
                Create A Ghost!
            </Button>          

                {
                    this.props.ghosts ? 
                    <GISGhostsList
                        ghosts={this.props.ghosts}
                        selectedGhostId={this.props.ghost ? this.props.ghost._id : null}
                        selectGhost={this.selectGhost}
                    />
                    : null
                }
                
            </Tab>
            <Tab eventKey="friendlyGhosts" title="FRIENDLY GHOSTS">
                a To me, fair friend, you never can be old, For as you were when first your eye I ey'd, Such seems your beauty still. Three winters cold, Have from the forests shook three summers' pride, Three beauteous springs to yellow autumn turn'd, In process of the seasons have I seen, Three April perfumes in three hot Junes burn'd, Since first I saw you fresh, which yet are green. Ah! yet doth beauty like a dial-hand, Steal from his figure, and no pace perceiv'd;
            </Tab>
        </Tabs>

    };
}

export default GISGhostsTabset;
