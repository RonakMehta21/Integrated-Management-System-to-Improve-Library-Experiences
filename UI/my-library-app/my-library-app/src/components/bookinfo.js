import React, { Component } from "react";
import "../App.css";
// import {BrowserRouter} from 'react-router-dom';
import BookInfoDesc from "./bookinfodesc";
// import NavbarHome from './navbar';
// import Leftbar from './leftbar';
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
// import Col from 'react-bootstrap/Col';
import firebase from "firebase";
import { Link } from "react-router-dom";
import PrimarySearchAppBar from "./appbar";
// import { userInfo } from 'os';
import axios from "axios";
// import Books from './books';
import Recommendation from "./recommendation";

class BookInfo extends Component {
  render() {
    // console.log("recommendation", this.state.recommendations)
    // console.log("books", this.state.books)

    return (
      <div>
        {/* <NavbarHome/> */}
        <PrimarySearchAppBar />
        <Row className="row">
          {/* <Leftbar className='col-md-3'/> */}
          {/* <p>{JSON.stringify(this.state.books2[0])}</p> */}
          <BookInfoDesc
            books={this.state.books}
            button={this.state.button}
            className="col-md-9"
          />
        </Row>
        <Recommendation books={this.state.recommendations} />
        {/* <Books books={this.state.books} /> */}
      </div>
    );
  }
  state = {
    books: [],
    button: "",
    isLoggedIn: false,
    recommendations: []
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoggedIn: !!user });
    });
    var domain = "http://lmp.nupursjsu.net/v1/";

    var bookId = window.location.pathname.split("/")[2];

    let url = domain + "books/" + bookId;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        const a = [];
        a.push(data);
        //   console.log(a)
        this.setState({ books: a });

        var button2 = "";

        if (this.state.isLoggedIn) {
          var alreadyTaken = 0;
          var user = firebase.auth().currentUser.uid;
          var userInfo =
            "?Status=Approved,Issued&Book_Id=" + bookId + "&User_Id=" + user;
          // console.log(userInfo)
          var url = domain + "requests" + userInfo;
          // alert(url)

          axios.get(url).then(data => {
            // alert('data',data.data.length)

            if (data.data.length > 0) {
              alreadyTaken = 1;
            }

            if (alreadyTaken) {
              button2 = <p>only one book person sorry</p>;
            }

            // console.log('checking',this.state.books[0].bookID,this.state.books[0].count)
            else if (this.state.books[0].count > 0) {
              button2 = <p>Request book</p>;
            }
            this.setState({ button: button2 });
          });
          // console.log('button',this.state.button,button2,alreadyTaken)
        } else {
          button2 = <Link to="/login">Login to continue</Link>;
          this.setState({ button: button2 });
        }

        // url=domain+'books/'+bookId+'/recommendations'
        // link to instance containing machine learning code
        url =
          "http://18.218.64.73:81/v1/" + "books/" + bookId + "/recommendations";
        // console.log(url)
        axios
          .get(url)
          .then(data => {
            // console.log(firebase.auth().currentUser.displayName);
            console.log("here", data);
            const a = [];
            for (var i in data.data.result) {
              // console.log('iterations',data.data[i],i)
              a.push(data.data.result[i]);
            }
            //   console.log('a',a)
            this.setState({ recommendations: a });
            //   console.log('books2',this.state.books2)
          })
          .catch(console.log);

        // console.log(this.state.button,this.state.books,alreadyTaken)
      })
      .catch(console.log);

    // url='http://ec2-52-53-153-16.us-west-1.compute.amazonaws.com/v1/books/'+bookId+'/recommendations'
    // console.log(url)
    // 	axios.get(url)
    // .then(data => {
    // 	// console.log(firebase.auth().currentUser.displayName);
    // 	console.log('here',data)
    // 	const a=[]
    // 	for (var i in data.data){
    // 	a.push(data.data[i])
    //   }
    //   console.log('a',a)
    //   this.setState({ books2: a })
    //   console.log('books2',this.state.books2)
    //   })
    //   .catch(console.log)
  }
}
export default BookInfo;
