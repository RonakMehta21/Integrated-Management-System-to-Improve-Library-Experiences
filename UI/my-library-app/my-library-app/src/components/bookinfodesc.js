import React, { Component } from "react";
// import {Button,Jumbotron } from 'reactstrap';
import { Link } from "react-router-dom";
import firebase from "firebase";
// import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../css/bookinfodesc.css";
// import Jumbotron from 'react-bootstrap/Jumbotron'
import Paper from "@material-ui/core/Paper";
import {Row,Col} from 'react-bootstrap/';
import Tweets from './Tweets';
import Googlebooks from './Googlebooks'

class BookInfoDesc extends Component {
  //  constructor(props){
  //    super(props)
  //  }
  state = { isLoggedIn: false, book: [], button: "" };
  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoggedIn: !!user });
    });
  };

  handleClick(e, id, title2) {
    console.log("func called", id, title2, this.state.isLoggedIn);
    if (this.state.isLoggedIn) {
      var domain = "http://lmp.nupursjsu.net/v1/";
      var user = firebase.auth().currentUser.uid;
      var url = "/request/" + user + "/" + id;
      // var type="Type"
      // console.log(user)

      //  user=1
      var userInfo =
        "?Status=Approved,Issued&Book_Id=" + id + "&User_Id=" + user;
      console.log(userInfo);
      url = domain + "requests" + userInfo;
      axios.get(url).then(data => {
        // console.log('data',data.data.length)
        var alreadyTaken = 0;
        if (data.data.length > 0) {
          alreadyTaken = 1;
        }
        console.log("already taken", alreadyTaken);
        if (alreadyTaken) {
          alert("only one book person sorry");
        } else {
          var userInfo = {
            Type: "issue",
            bookID: id,
            title: title2,
            userId: user
          };
          axios.post(domain + "requests", userInfo).then(res => {
            console.log(res);
            console.log(res.data);
            window.location.reload(false);
          });
        }
      });
    }
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          "margin-left": "5%",
          "margin-right": "5%",
          "margin-top": "5%"
        }}
      >
        <div class="w-100">
          {this.props.books.map((book, index) => (
            <div>
              <Paper>
                <Row>
                  <Col className='col-md-4'>
                <h1>{book.title}</h1>
                <b>Author: </b>{" "}
                <Link to={`/search/?title=&authors=${book.authors}&language=`}>
                  {" "}
                  {book.authors}
                </Link>
                <p>
                  <b>Rating:</b>
                  {book.average_rating}
                </p>
                <p>
                  <b>BookID:</b>
                  {book.bookID}
                </p>
                <p>
                  <img src={book.image}></img>
                </p>
                <p>
                  <b>Year Published</b>
                  {book.year}
                </p>
                <p>
                  <b>ISBN:</b>
                  {book.isbn}
                </p>
                <p>
                  <b>Publisher:</b>
                  {book.publisher}
                </p>
                <p>
                  <b>Count:</b>
                  {book.count}
                </p>
                <Button
                  variant="outlined"
                  style={{ color: "#0000ff" }}
                  onClick={e =>
                    this.handleClick(e, `${book.bookID}`, `${book.title}`)
                  }
                >
                  {this.props.button}
                </Button>
                {/* <p>{this.state.toggleState}</p>   */}
                </Col>
                <Col className='col-md-4'>
                <Tweets string={book.title} />
                  {/* <GoodReadSearch searchText={book.title}/> */}
                  </Col>
                <Col className='col-md-4'>
                  <Googlebooks googlebooktitle={book.title} />
                  </Col>
                </Row>
              </Paper>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(BookInfoDesc);
