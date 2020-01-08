import React, { Component } from 'react';
//import constyles from '../styles/constyles';
//import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }


    componentWillUnmount() {

    }

    render() {
        return <Container>
            {this.props.user.username}
        </Container>
    };
}

export default SearchScreen;
