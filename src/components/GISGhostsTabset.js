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
            {
                    this.props.befriendedGhosts ? 
                    <GISGhostsList
                        ghosts={this.props.befriendedGhosts}
                        selectedGhostId={this.props.ghost ? this.props.ghost._id : null}
                        selectGhost={this.selectGhost}
                    />
                    : null
                }
                {
                //this.props.befriendedGhosts
                }
            </Tab>
        </Tabs>

    };
}

export default GISGhostsTabset;
