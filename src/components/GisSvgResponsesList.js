//GisSvgResponsesListCard

import React, { Component, useImperativeHandle } from 'react';
import constyles from '../styles/constyles';
import colors from '../styles/colors';
import { Button, Row, Container, Col, Form } from 'react-bootstrap';
import GisSvgResponsesListCard from './GisSvgResponsesListCard';
import stringSimilarity from 'string-similarity';

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

class GisSvgResponsesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredResponses : []
        }
        this.selectResponse = this.selectResponse.bind(this);
        this.filterResponses = this.filterResponses.bind(this);
    }

    componentDidMount() {
        this.setState({
            filteredResponses : this.props.responses
        });
    }

    componentDidUpdate(prevProps, prevState){
        console.log('GisSvgResponsesList componentDidUpdate');
        if(prevProps !== this.props){
            this.setState({
                filteredResponses : this.props.responses
            });
            if(prevProps.filterString !== this.props.filterString){
                this.filterResponses(this.props.filterString);
            }
            this.render();
        }
    }

    filterResponses(filterString){
        console.log('filterString = ', filterString);
        if(!filterString){
            this.setState({
                filteredResponses : this.props.responses
            });
        } else {
            console.log('0 this.props.responses = ', this.props.responses);
            let responsesClone = [...this.props.responses];
            console.log('1 responsesClone = ', responsesClone);
            responsesClone.sort((a, b) => {
                console.log('sort a = ', a.text);
                console.log('stringSimilarity.compareTwoStrings(a, filterString) = ', stringSimilarity.compareTwoStrings(a.text, filterString));
                console.log('sort b = ', b.text);
                console.log('stringSimilarity.compareTwoStrings(b, filterString) = ', stringSimilarity.compareTwoStrings(b.text, filterString));

                return stringSimilarity.compareTwoStrings(b.text, filterString) - stringSimilarity.compareTwoStrings(a.text, filterString);
            });
            console.log('2 responsesClone = ', responsesClone);
            this.setState({
                filteredResponses : responsesClone
            });
        }
    }

    selectResponse(response){
        this.props.selectResponse(response);
    }

    render() {
        if(!this.state.filteredResponses || this.state.filteredResponses.length === 0){
            return null;
        } else {
            return <Container fluid style={{padding : '0px'}}>
                {this.state.filteredResponses.map(response => {
                    return <GisSvgResponsesListCard
                            key={response._id}
                            response={response}
                            onClick={this.selectResponse}
                            ghost={this.props.ghost}
                            socket={this.props.socket}
                            user={this.props.user}
                            />
                })}
            </Container>
        }
    };
}

export default GisSvgResponsesList;
