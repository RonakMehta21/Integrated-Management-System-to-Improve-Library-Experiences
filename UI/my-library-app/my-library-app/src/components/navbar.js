import React,{Component} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';

export default class Navbar_home extends Component{
  state={isLoggedIn : false}
  componentWillMount = () =>{

    var database = firebase.database();
    function writeUserData(userId, name, email, imageUrl) {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
      });
    }

    

    firebase.auth().onAuthStateChanged(user=>{
        this.setState({isLoggedIn : !!user });

        writeUserData(firebase.auth().currentUser.email,firebase.auth().currentUser.displayName,firebase.auth().currentUser.email,firebase.auth().currentUser.photoURL)
        
        
        
    });
}

  render(){
    var action;
        if(this.state.isLoggedIn){
            var user=firebase.auth().currentUser;
            action = <NavLink to="/logout">{user.displayName}, Logout</NavLink>;
        }
        else{
            action = <NavLink to="/login">Login</NavLink>;
        }

    return (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">LIMS- Library Management Platform</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/search?title=xxyyzz&authors=zzzyymm&language=abbcc">Search</Nav.Link>
      <Nav.Link href="#pricing">Dummy</Nav.Link>
      <NavDropdown title="Dummy" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Dummy</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Dummy</NavDropdown.Item>
        <NavDropdown.Divider />

      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Item><Nav.Link >{action}</Nav.Link></Nav.Item>
      <Nav.Link eventKey={2} href="#memes">
        Dummy
      </Nav.Link>
    </Nav>
    </Navbar.Collapse>
    </Navbar>
    )
  }
}