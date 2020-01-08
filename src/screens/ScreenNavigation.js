import React, { Component, useImperativeHandle } from 'react';
//import constyles from '../styles/constyles';
//import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import UniversalFooter from '../components/UniversalFooter';
import UniversalHeader from '../components/UniversalHeader';


class NavigationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 'SEARCH',
            //currentScreen: 'LOGIN',
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
        

        if(this.state.currentScreen === 'LOGIN'){
            return <LoginScreen
                    socket={this.props.socket}
                    setUser={this.setUser}
                    setCurrentScreen={this.setCurrentScreen}
                    pnToken="test"
                />
        }

        let mainView;
        switch(this.state.currentScreen) {
            case 'SEARCH':
                mainView = <SearchScreen
                    socket={this.props.socket}
                    user={this.state.user}
                    setUser={this.setUser}
                    setCurrentScreen={this.setCurrentScreen}
                    currentScreen={this.state.currentScreen}
                    pnToken="test"
                />
        }

        return <Container fluid style={{height:"100vh"}}>
            <UniversalHeader 
                currentScreen={this.state.currentScreen}
            />
            {mainView}
            <UniversalFooter />
        </Container>

        

    };
}

export default NavigationScreen;
