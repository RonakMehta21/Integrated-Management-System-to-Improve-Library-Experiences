import React, { Component } from "react";
import "../App.css";
import Books from "./books";
import Leftbar from "./leftbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import PrimarySearchAppBar from "./appbar";
import axios from "axios";

class index extends Component {
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <Row className='row'>
          <Leftbar className='col-md-3' />
          <Books  books={this.state.books} className='col-md-9'/>
        </Row>
      </div>
    );
  }

  state = {
    books: []
  };
  componentDidMount() {
	var domain='http://lmp.nupursjsu.net/v1/'
    axios
      .get(
        domain+'books?title=Death'
      )
      .then(data => {
        const a = [];
        for (var i in data.data) {
          a.push(data.data[i]);
        }
        this.setState({ books: a });
      })
      .catch(console.log);
  }
}

		var isAdmin = localStorage.getItem("isAdmin");
		console.log('admin via local',isAdmin)
		var domain='http://lmp.nupursjsu.net/v1/'
		axios.get(domain+'books?title=Death')
	.then(data => {
		const a=[]
		for (var i in data.data){
		a.push(data.data[i])
	  }
	  this.setState({ books: a })
	  })
	  .catch(console.log)

  export default index;
