import React, { Component } from 'react';
import '../App.css';
// import {BrowserRouter} from 'react-router-dom';
import BookInfoDesc from './bookinfodesc';
import NavbarHome from './navbar';
import Leftbar from './leftbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import PrimarySearchAppBar from './appbar'




class BookInfo extends Component {

	render() {
	  return (
		<div>
		   {/* <NavbarHome/> */}
		   <PrimarySearchAppBar/>
		  <Row className="row">
			{/* <Leftbar className='col-md-3'/> */}
		  <BookInfoDesc books={this.state.books} button={this.state.button} className='col-md-9' />
		  </Row> 
		  </div>
			);
	}
	state = {
	  books: [],button:'',isLoggedIn:false
	}
  
	componentWillMount() {
		firebase.auth().onAuthStateChanged(user=>{
			this.setState({isLoggedIn : !!user });   
		});

		
}
}
  export default BookInfo;