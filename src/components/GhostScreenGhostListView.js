import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Badge, Tabs, Tab, Card } from 'react-bootstrap';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GhostInteractionView from '../components/GhostInteractionView';
import MyGhostsChatCardListView from '../components/MyGhostsChatCardListView';

class GhostsScreenGhostListView extends Component {
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

        return <Tabs defaultActiveKey="myGhosts" style={{ marginTop: '1rem' }}>
            <Tab eventKey="myGhosts" title="MY GHOSTS">
                <Container fluid style={{ padding: 8 }}>
                    <Button 
                    onClick={()=>this.props.setGhost(null, true)}
                    style={{ backgroundColor: colors.primary }} size="lg" block>
                        Make A New Ghost!
                    </Button>
                </Container>

                {this.props.myGhosts ?
                    <Row style={{
                        maxHeight: this.props.scrollHeight,
                        'overflowY': 'auto'
                    }}>
                        <Col>


                            {this.props.myGhosts.map(ghost => {
                                return <Card
                                    key={ghost._id}
                                    onClick={() => { this.props.setGhost(ghost) }}
                                    style={this.props.selectedGhost
                                     && ghost._id === this.props.selectedGhost._id ? 
                                     { ...styles.ghostCard, backgroundColor: colors.primaryFaded }
                                      : styles.ghostCard}>
                                    <Container>
                                        <Row>
                                            <Col style={{ ...constyles.genH3Text, fontWeight: '200', justifyContent: 'flex-start', textAlign: 'left' }}>
                                                {ghost.name}
                                            </Col>
                                            <Col style={{ ...constyles.genH5Text, fontWeight: '200', justifyContent: 'flex-end', textAlign: 'right', alignItems: 'center', marginTop: '7px', marginBottom: '7px' }}>
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                    style={{ marginRight: 6, marginTop: 6 }}
                                                    color={colors.primary}
                                                />
                                                {ghost.type}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>
                            })}
                        </Col>
                    </Row>
                    : null}
            </Tab>
            <Tab eventKey="friendlyGhosts" title="FRIENDLY GHOSTS">
                a To me, fair friend, you never can be old, For as you were when first your eye I ey'd, Such seems your beauty still. Three winters cold, Have from the forests shook three summers' pride, Three beauteous springs to yellow autumn turn'd, In process of the seasons have I seen, Three April perfumes in three hot Junes burn'd, Since first I saw you fresh, which yet are green. Ah! yet doth beauty like a dial-hand, Steal from his figure, and no pace perceiv'd;
                        </Tab>
        </Tabs>

    };
}

const styles = {
    ghostCard: {
        //width: '18rem', 
        marginTop: '8px',
        marginRight: '8px',
        cursor: 'pointer'
    },
    overflow: {
        maxHeight: '48rem',

        cursor: 'pointer'
    }
}

export default GhostsScreenGhostListView;
