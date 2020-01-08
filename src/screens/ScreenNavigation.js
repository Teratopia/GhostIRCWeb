import React, { Component, useImperativeHandle } from 'react';
//import constyles from '../styles/constyles';
//import colors from '../styles/colors';
//import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';



class NavigationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 'LOGIN',
            user: null,
            pnToken: 'test',
        }
        this.setUser = this.setUser.bind(this);
        this.setCurrentScreen = this.setCurrentScreen.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        console.log('NavigationScreen this.state = ', this.state);
    }

    setUser(user){
        this.setState({user : user});
    }
    setCurrentScreen(screenName){
        this.setState({currentScreen : screenName});
    }

    componentWillUnmount() {
        this.props.socket.removeListener('loginUser');
        this.props.socket.removeListener('requestEmailVerification');
    }

    render() {
        switch(this.state.currentScreen) {
            case 'SEARCH':
                return <SearchScreen
                    socket={this.props.socket}
                    user={this.state.user}
                    setUser={this.setUser}
                    setCurrentScreen={this.setCurrentScreen}
                    pnToken="test"
                />
            default:
                return <LoginScreen
                    socket={this.props.socket}
                    setUser={this.setUser}
                    setCurrentScreen={this.setCurrentScreen}
                    pnToken="test"
                />
        }
    };
}

export default NavigationScreen;
