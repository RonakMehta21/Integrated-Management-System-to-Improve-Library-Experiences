import React, { Component } from 'react';
import '../App.css';
import Books from './books';
import SearchBar from './searchbar';
// import NavbarHome from './navbar';
// import Leftbar from './leftbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import PrimarySearchAppBar from './appbar'


class search extends Component {
	render() {
	  return (
		<div>
		   {/* <NavbarHome /> */}
		   <PrimarySearchAppBar/>
		   
		  <Row>
			{/* <Leftbar/> */}
			<Col>
			<SearchBar/>
			<Books books={this.state.books} />
			</Col>
		  </Row> 
		</div>
			);
	}
	state = {
	  books: []
	}
  
	componentDidMount() {
		var bookId = window.location.search
		console.log('bookid',bookId)
		
		
		var url2='http://ec2-52-53-153-16.us-west-1.compute.amazonaws.com/v1/books'+bookId;
		
		
	  let url = url2;
	    //   fetch(url)
	    //   .then(res => res.json())
	    //   .then(data => {
	    //     console.log(data)
	    //     const a=[]
	    //     for (var i in data){
	    //     a.push(data[i])
	    //   }
	    //   console.log(a)
	    //   this.setState({ books: a })
	    //   })
	    //   .catch(console.log)
		// }
			axios.get(url)
			.then(data => {
				// console.log(firebase.auth().currentUser.displayName);
				console.log(data)
				const a=[]
				for (var i in data.data){
				a.push(data.data[i])
			  }
			  console.log('a',a)
			  this.setState({ books: a })
			  })
			  .catch(console.log)
			  }
			
  
  
  }
  //http://ec2-52-53-153-16.us-west-1.compute.amazonaws.com/v1/books
  //http://ec2-52-53-153-16.us-west-1.compute.amazonaws.com/v1/books
  //http://ec2-52-53-153-16.us-west-1.compute.amazonaws.com/v1/books/authors?=J.K.%20Rowling-Mary%20GrandPr%C3%A9
  //Export the App component so that it can be used in index.js
  export default search;
