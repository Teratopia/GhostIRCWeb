import React, { Component, useImperativeHandle } from 'react';
//import constyles from '../styles/constyles';
//import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import GhostsScreen from './GhostsScreen';
import UniversalFooter from '../components/UniversalFooter';
import UniversalHeader from '../components/UniversalHeader';
import GhostsInteractionScreen from './GhostsInteractionScreen';


class NavigationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //currentScreen: 'GHOSTS',
            currentScreen: 'LOGIN',
            user: null,
            pnToken: 'test',
        }
        this.setUser = this.setUser.bind(this);
        this.setCurrentScreen = this.setCurrentScreen.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('updateUser', res => {
            console.log('updateUser res = ', res);
            this.setUser(res.user);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('NavigationScreen this.state = ', this.state);
        console.log('NavigationScreen prevState = ', prevState);
        if(prevState.currentScreen !== this.state.currentScreen){
            console.log('componentDidUpdate if');
            this.render();
        }
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
        this.props.socket.removeListener('updateUser');
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
                console.log('render 1');
                mainView = <SearchScreen
                    socket={this.props.socket}
                    user={this.state.user}
                    setUser={this.setUser}
                    setCurrentScreen={this.setCurrentScreen}
                    currentScreen={this.state.currentScreen}
                    pnToken="test"
                />
                break;
            case 'GHOSTS':
                console.log('render 2');
                mainView = <GhostsInteractionScreen
                    socket={this.props.socket}
                    user={this.state.user}
                    setCurrentScreen={this.setCurrentScreen}
                    currentScreen={this.state.currentScreen}
                    pnToken="test"
                />
        }
        

        return <Container fluid style={{height:"100vh"}}>
            <UniversalHeader 
                currentScreen={this.state.currentScreen}
                setCurrentScreen={this.setCurrentScreen}
            />
            {mainView}
            <UniversalFooter />
        </Container>

        

    };
}

export default NavigationScreen;
