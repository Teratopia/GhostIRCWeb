import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from "socket.io-client";


import MyGhostsChatCardListView from './components/MyGhostsChatCardListView';
import ScreenNavigation from './screens/ScreenNavigation';
import ChatCardRowCard from './components/ChatCardRowCard';
import { Button, Row, Container, Col, Card } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
    
    this.socket = io('http://127.0.0.1:1212', {jsonp : false});
    this.socket.on('getDetailedChatCardById', res => {
      console.log('getDetailedChatCardById res = ', res);
    })
    this.socket.on('connect', () => {
      console.log('CONNECTION SUCCESSFUL');
      this.render();
      });
      this.socket.emit('getDetailedChatCardById', {
        chatCardId : '5e19147ee97bb79805426e81'
      })
    
  }

  componentDidMount() {
    
  }
  render(){

    return <ScreenNavigation socket={this.socket}/>

    /*
    if(this.socket){
      return  <MyGhostsChatCardListView 
              user={{_id: "5e0fac9ae3b020157cefef94"}}
              ghost={{moderatorIds: ["5e0fac9ae3b020157cefef94"], _id: "5e14171630c03e851925cb67"}}
              socket={this.socket}
            />
    } else {
      return null;
    }
    */
    
    

    /*
    return <Container style={{width : '30%'}}>

    <ChatCardRowCard 
    style={{
      margin : 12,
    }}
    
    user={{_id: "5e0fac9ae3b020157cefef94"}}
    ghost={{moderatorIds: ["5e0fac9ae3b020157cefef94"], _id: "5e14171630c03e851925cb67"}}

    chatCard={
      {"_id":"5e1421f169f13685bdbf95d4",
      "ghostId":"5e14171630c03e851925cb67",
      "creatorId":"5e0fac9ae3b020157cefef94",
      "createDate":"2020-01-07T06:15:13.857Z",
      "text":"This is a test text string that goes on for a few chars etc",
      "responses":[
        {"ratings":[],
        "_id":"5e1424d269f13685bdbf95d5",
        "createDate":"2020-01-07T06:27:30.618Z",
        "originCCId":"5e1421f169f13685bdbf95d4",
        "destinationCCId":null,
        "requesterId":"5e0fac9ae3b020157cefef94",
        "ownerId":null,
        "text":"Test response one","__v":0},
        {"ratings":[],
        "_id":"5e1424d269f13685bdbf95d5",
        "createDate":"2020-01-07T06:27:30.618Z",
        "originCCId":"5e1421f169f13685bdbf95d4",
        "destinationCCId":null,
        "requesterId":"5e0fac9ae3b020157cefef94",
        "ownerId":null,
        "text":"Test response two","__v":0},
        {"ratings":[],
        "_id":"5e1424d269f13685bdbf95d5",
        "createDate":"2020-01-07T06:27:30.618Z",
        "originCCId":"5e1421f169f13685bdbf95d4",
        "destinationCCId":null,
        "requesterId":"5e0fac9ae3b020157cefef94",
        "ownerId":null,
        "text":"Test response three this one is super long in cas we need to hanle long responses","__v":0},
        {"ratings":[],
        "_id":"5e1424d269f13685bdbf95d5",
        "createDate":"2020-01-07T06:27:30.618Z",
        "originCCId":"5e1421f169f13685bdbf95d4",
        "destinationCCId":null,
        "requesterId":"5e0fac9ae3b020157cefef94",
        "ownerId":null,
        "text":"Test response four","__v":0},
        {"ratings":[],
        "_id":"5e1424d269f13685bdbf95d5",
        "createDate":"2020-01-07T06:27:30.618Z",
        "originCCId":"5e1421f169f13685bdbf95d4",
        "destinationCCId":null,
        "requesterId":"5e0fac9ae3b020157cefef94",
        "ownerId":null,
        "text":"Test response five","__v":0},
        {"ratings":[],
        "_id":"5e1424d269f13685bdbf95d5",
        "createDate":"2020-01-07T06:27:30.618Z",
        "originCCId":"5e1421f169f13685bdbf95d4",
        "destinationCCId":null,
        "requesterId":"5e0fac9ae3b020157cefef94",
        "ownerId":null,
        "text":"Test response six","__v":0},
        {"ratings":[],
        "_id":"5e1424d269f13685bdbf95d5",
        "createDate":"2020-01-07T06:27:30.618Z",
        "originCCId":"5e1421f169f13685bdbf95d4",
        "destinationCCId":null,
        "requesterId":"5e0fac9ae3b020157cefef94",
        "ownerId":null,
        "text":"Test response seven","__v":0}
      ],
      "responseRequests":[
          {"ratings":[],
        "_id":"5e1424d269f13685bdbf95d5",
        "createDate":"2020-01-07T06:27:30.618Z",
        "originCCId":"5e1421f169f13685bdbf95d4",
        "destinationCCId":null,
        "requesterId":"5e0fac9ae3b020157cefef94",
        "ownerId":null,
        "text":"Pretty","__v":0}
    ],
      "ratings":[],
      "bibliography":[],
      "flags":[],
      "__v":1}
    }
    />
    
    </Container>
    
   */



    /*
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  };


}

export default App;


/*
CHAT CARDS:

[{"_id":"5e14171630c03e851925cb69","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:28:54.079Z","text":"Do","responses":[{"ratings":[],"_id":"5e14176630c03e851925cb6a","createDate":"2020-01-07T05:30:14.738Z","originCCId":"5e14171630c03e851925cb69","destinationCCId":"5e14176d30c03e851925cb6b","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"Re","__v":0},{"ratings":[],"_id":"5e14182f8c3ef9856ae5b7d7","createDate":"2020-01-07T05:33:35.126Z","originCCId":"5e14171630c03e851925cb69","destinationCCId":"5e1418348c3ef9856ae5b7d8","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"One","__v":0},{"ratings":[],"_id":"5e1419388da2bd85823365e2","createDate":"2020-01-07T05:38:00.664Z","originCCId":"5e14171630c03e851925cb69","destinationCCId":"5e14195aeb484885954b4ce9","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"In","__v":0},{"ratings":[],"_id":"5e1419b03c637785a082c6a4","createDate":"2020-01-07T05:40:00.410Z","originCCId":"5e14171630c03e851925cb69","destinationCCId":"5e1419b83c637785a082c6a5","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"The","__v":0},{"ratings":[],"_id":"5e141b6969f13685bdbf95ce","createDate":"2020-01-07T05:47:21.147Z","originCCId":"5e14171630c03e851925cb69","destinationCCId":"5e141b6e69f13685bdbf95cf","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"Live","__v":0},{"ratings":[],"_id":"5e143004417d670300b4f0ea","createDate":"2020-01-07T07:15:16.652Z","originCCId":"5e14171630c03e851925cb69","destinationCCId":"5e141bbf69f13685bdbf95d1","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"RoutingTestOne","__v":0}],"responseRequests":[{"ratings":[],"_id":"5e14176630c03e851925cb6a","createDate":"2020-01-07T05:30:14.738Z","originCCId":"5e14171630c03e851925cb69","destinationCCId":null,"requesterId":"5e0fac9ae3b020157cefef94","ownerId":null,"text":"Re","__v":0},{"ratings":[],"_id":"5e14182f8c3ef9856ae5b7d7","createDate":"2020-01-07T05:33:35.126Z","originCCId":"5e14171630c03e851925cb69","destinationCCId":null,"requesterId":"5e0fac9ae3b020157cefef94","ownerId":null,"text":"One","__v":0},{"ratings":[],"_id":"5e1419388da2bd85823365e2","createDate":"2020-01-07T05:38:00.664Z","originCCId":"5e14171630c03e851925cb69","destinationCCId":null,"requesterId":"5e0fac9ae3b020157cefef94","ownerId":null,"text":"In","__v":0}],"ratings":[],"bibliography":[],"flags":[],"__v":12},{"_id":"5e14176d30c03e851925cb6b","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:30:21.662Z","text":"Mi","responses":[],"responseRequests":[],"ratings":[],"bibliography":[],"flags":[],"__v":0},{"_id":"5e1418348c3ef9856ae5b7d8","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:33:40.476Z","text":"Two","responses":[{"ratings":[],"_id":"5e1418378c3ef9856ae5b7d9","createDate":"2020-01-07T05:33:43.480Z","originCCId":"5e1418348c3ef9856ae5b7d8","destinationCCId":"5e14183b8c3ef9856ae5b7da","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"Three","__v":0}],"responseRequests":[{"ratings":[],"_id":"5e1418378c3ef9856ae5b7d9","createDate":"2020-01-07T05:33:43.480Z","originCCId":"5e1418348c3ef9856ae5b7d8","destinationCCId":null,"requesterId":"5e0fac9ae3b020157cefef94","ownerId":null,"text":"Three","__v":0}],"ratings":[],"bibliography":[],"flags":[],"__v":2},{"_id":"5e14183b8c3ef9856ae5b7da","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:33:47.162Z","text":"Four","responses":[],"responseRequests":[],"ratings":[],"bibliography":[],"flags":[],"__v":0},{"_id":"5e14193e8da2bd85823365e3","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:38:06.011Z","text":"This","responses":[],"responseRequests":[],"ratings":[],"bibliography":[],"flags":[],"__v":0},{"_id":"5e14195aeb484885954b4ce9","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:38:34.823Z","text":"This","responses":[],"responseRequests":[],"ratings":[],"bibliography":[],"flags":[],"__v":0},{"_id":"5e1419b83c637785a082c6a5","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:40:08.768Z","text":"Cake","responses":[{"ratings":[],"_id":"5e1419c93c637785a082c6a6","createDate":"2020-01-07T05:40:25.281Z","originCCId":"5e1419b83c637785a082c6a5","destinationCCId":"5e1419cc3c637785a082c6a7","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"Is","__v":0}],"responseRequests":[{"ratings":[],"_id":"5e1419c93c637785a082c6a6","createDate":"2020-01-07T05:40:25.281Z","originCCId":"5e1419b83c637785a082c6a5","destinationCCId":null,"requesterId":"5e0fac9ae3b020157cefef94","ownerId":null,"text":"Is","__v":0}],"ratings":[],"bibliography":[],"flags":[],"__v":2},{"_id":"5e1419cc3c637785a082c6a7","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:40:28.769Z","text":"A","responses":[],"responseRequests":[{"ratings":[],"_id":"5e1419cf3c637785a082c6a8","createDate":"2020-01-07T05:40:31.603Z","originCCId":"5e1419cc3c637785a082c6a7","destinationCCId":null,"requesterId":"5e0fac9ae3b020157cefef94","ownerId":null,"text":"Lie","__v":0}],"ratings":[],"bibliography":[],"flags":[],"__v":1},{"_id":"5e141b6e69f13685bdbf95cf","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:47:26.940Z","text":"At","responses":[{"ratings":[],"_id":"5e141bb369f13685bdbf95d0","createDate":"2020-01-07T05:48:35.589Z","originCCId":"5e141b6e69f13685bdbf95cf","destinationCCId":"5e141bbf69f13685bdbf95d1","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"Sydney","__v":0}],"responseRequests":[],"ratings":[],"bibliography":[],"flags":[],"__v":2},{"_id":"5e141bbf69f13685bdbf95d1","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T05:48:47.593Z","text":"Opera","responses":[{"ratings":[],"_id":"5e141bc469f13685bdbf95d2","createDate":"2020-01-07T05:48:52.306Z","originCCId":"5e141bbf69f13685bdbf95d1","destinationCCId":"5e1421f169f13685bdbf95d4","requesterId":"5e0fac9ae3b020157cefef94","ownerId":"5e0fac9ae3b020157cefef94","text":"House","__v":0}],"responseRequests":[],"ratings":[],"bibliography":[],"flags":[],"__v":2},{"_id":"5e14216b69f13685bdbf95d3","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T06:12:59.047Z","text":"Is","responses":[],"responseRequests":[],"ratings":[],"bibliography":[],"flags":[],"__v":0},{"_id":"5e1421f169f13685bdbf95d4","ghostId":"5e14171630c03e851925cb67","creatorId":"5e0fac9ae3b020157cefef94","createDate":"2020-01-07T06:15:13.857Z","text":"Is","responses":[],"responseRequests":[{"ratings":[],"_id":"5e1424d269f13685bdbf95d5","createDate":"2020-01-07T06:27:30.618Z","originCCId":"5e1421f169f13685bdbf95d4","destinationCCId":null,"requesterId":"5e0fac9ae3b020157cefef94","ownerId":null,"text":"Pretty","__v":0}],"ratings":[],"bibliography":[],"flags":[],"__v":1}]

*/