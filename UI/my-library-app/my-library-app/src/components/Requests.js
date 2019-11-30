import React, { Component } from "react";
import axios from "axios";
import "../App.css";
// import Navbarhome from "./navbar";
import Leftbar from "./leftbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import { CardDeck, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import PrimarySearchAppBar from "./appbar";
// import { Link } from "react-router-dom";

class Requests extends Component {
  state = {
    requests: [],
    loading: true,
    isLoggedIn: false
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  loadReqs() {
    axios
      .get(
        "http://ec2-52-53-153-16.us-west-1.compute.amazonaws.com/v1/requests?Status=Approved&Type=issue"
      )
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
        this.setState({ requests: res.data });
      });
  }
  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoggedIn: !!user });
    });
    
  };

  componentDidMount() {
    this.loadReqs();
  }

  handleClick(event) {
    if (this.state.isLoggedIn) {
      const a = {
        Type: "issue"
      };
      let self = this;
      axios
        .patch(
          "http://ec2-52-53-153-16.us-west-1.compute.amazonaws.com/v1/requests/" +
            event.target.value,
          a
        )
        .then(res => {
          console.log(res);
          self.setState({ loading: true });
          self.loadReqs();
        });
    } else {
      window.location = "/login";
    }
  }

  render() {
    const { loading, requests } = this.state;
    var isAdmin=localStorage.getItem("isAdmin")
    var adminlog=parseInt(isAdmin)
    if(adminlog==0){
      return(
        <Container>
        <h1>you are not authorised to use this webpage   </h1>
        <Link to={'/'}>go back to home page</Link>
      </Container>
      );
    }

    if (loading) {
      return (
        <Container>
          <div class="loading"></div>
        </Container>
      );
    } else {
      return (
        <div>
          <PrimarySearchAppBar />
          <Row>
            <Leftbar />
            <Container>
              {requests.length > 0 &&
                requests.map(request => (
                  <Col md="auto">
                    <CardDeck key={request.Request_id}>
                      <Card>
                        <Card.Body>
                          <Card.Title>{request.title}</Card.Title>
                          <Card.Text>
                            <p>
                              <b>User Id:</b>
                              {request.User_Id}
                            </p>
                            <p>
                              <b>Book Id:</b>
                              {request.Book_Id}
                            </p>
                            <p>
                              <b>Type:</b>
                              {request.Type}
                            </p>
                            <button
                              class="btn btn-primary"
                              onClick={this.handleClick}
                              value={request.Request_id}
                            >
                              issue
                            </button>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </CardDeck>
                  </Col>
                ))}
              {!requests.length && <h4>No Requests</h4>}
            </Container>
          </Row>
        </div>
      );
    }
  }
}
export default withRouter(Requests);
