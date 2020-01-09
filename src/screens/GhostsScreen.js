import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Badge, Tabs, Tab, Card } from 'react-bootstrap';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GhostInteractionView from '../components/GhostInteractionView';

class GhostsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myGhosts : null,
            friendlyGhosts : null,
            selectedGhost : null
        }
        this.setGhost = this.setGhost.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('getUserGhosts', res => {
            console.log('getUserGhosts 1, res = ', res);
            if (res.success) {
                console.log('getUserGhosts success');
                this.setState({myGhosts : res.ghosts});
            } else {
                console.log(res.message);
            }
        });
        this.props.socket.emit('getUserGhosts', {
            userId : this.props.user._id
        })
    }

    setGhost(ghost){
        this.setState({selectedGhost : ghost});
    }

    componentWillUnmount() {
        this.props.socket.removeListener('getUserGhosts');
    }

    render() {
        
        return <Container fluid style={{height : '90vh'}}>
            <Row>
                <Col 
                    //large={3}
                    //md={3}
                    //sm={4}
                    xs={3}
                
                >
                    
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" style={{marginTop : '12px'}}>
                        <Tab eventKey="profile" title="MY GHOSTS" style={{marginTop : '12px'}}>
                            { this.state.myGhosts ? 
                                <Container>
                                    <Container fluid style={{paddingRight : 6, paddingLeft : 0}}>
                                        <Button style={{backgroundColor : colors.primary}} size="lg" block>
                                            Make A New Ghost!
                                        </Button>
                                    </Container>
                                    
                                    {this.state.myGhosts.map(ghost => {
                                        return <Card 
                                            key={ghost._id}
                                            onClick={()=>{this.setState({selectedGhost : ghost})}}
                                            style={this.state.selectedGhost && ghost._id === this.state.selectedGhost._id ? {...styles.ghostCard, backgroundColor : colors.primaryFaded} : styles.ghostCard}>
                                        <Container>
                                            <Row>
                                                <Col style={{...constyles.genH3Text, fontWeight : '200', justifyContent : 'flex-start', textAlign : 'left'}}>
                                                    {ghost.name}
                                                </Col>
                                                <Col style={{...constyles.genH5Text, fontWeight : '200', justifyContent : 'flex-end', textAlign : 'right', alignItems : 'center', marginTop : '7px', marginBottom : '7px'}}>
                                                <FontAwesomeIcon 
                                                icon={faEnvelope}
                                                style={{marginRight : 6, marginTop : 6}}
                                                color={colors.primary}
                                                />
                                                    {ghost.type}
                                                </Col>
                                            </Row>
                                        </Container>
                                      </Card>
                                    })}
                                </Container>
                            : null }
                        </Tab>
                        <Tab eventKey="home" title="FRIENDLY GHOSTS" style={{marginTop : '12px'}}>
                            a To me, fair friend, you never can be old, For as you were when first your eye I ey'd, Such seems your beauty still. Three winters cold, Have from the forests shook three summers' pride, Three beauteous springs to yellow autumn turn'd, In process of the seasons have I seen, Three April perfumes in three hot Junes burn'd, Since first I saw you fresh, which yet are green. Ah! yet doth beauty like a dial-hand, Steal from his figure, and no pace perceiv'd;
                        </Tab>
                    </Tabs>
                </Col>
                <Col 
                    //large={9}
                    //md={9}
                    //sm={8}
                    xs={9}>
                        { this.state.selectedGhost ? 
                            <GhostInteractionView
                                ghost={this.state.selectedGhost}
                                user={this.props.user}
                                socket={this.props.socket}
                                setGhost={this.state.setGhost}
                            />
                        : null }
                </Col>
                
            </Row>
        </Container>
    };
}

const styles = {
    ghostCard : { 
        width: '18rem', 
        marginTop : '8px', 
        cursor: 'pointer' 
    }
}

export default GhostsScreen;
