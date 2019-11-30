import React, { Component } from 'react';
import './App.css';
import Main from './components/main';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//App Component
class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <Main />
        </BrowserRouter>
        </div>
          );
  }

  // componentDidMount() {
  //   let url = 'http://ec2-52-53-153-16.us-west-1.compute.amazonaws.com/v1/books?authors=J.K.%20Rowling-Mary%20GrandPr';
  //       fetch(url)
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log(data)
  //         const a=[]
  //         for (var i in data){
  //         a.push(data[i])
  //       }
  //       console.log(a)
  //       this.setState({ books: a })
  //       })
  //       .catch(console.log)
  //     }


}
//http://ec2-52-53-153-16.us-west-1.compute.amazonaws.com/v1/books
//Export the App component so that it can be used in index.js
export default App;
