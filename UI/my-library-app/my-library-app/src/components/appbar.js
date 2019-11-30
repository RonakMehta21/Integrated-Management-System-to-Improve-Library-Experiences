import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import Nav from 'react-bootstrap/Nav';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';
import {Component} from 'react';
import '../css/bookinfodesc.css';
import { Link } from 'react-router-dom';






export default class ButtonAppBar extends Component{

    state={isLoggedIn : false,classes:''}
    componentWillMount = () =>{
      firebase.auth().onAuthStateChanged(user=>{
          this.setState({isLoggedIn : !!user });
      });
    }
render(){


      

    var action;
        if(this.state.isLoggedIn){
            var user=firebase.auth().currentUser;
            action = <NavLink style={{ color: '#FFF' }}to="/logout">{user.displayName},Logout</NavLink>;
        }
        else{
            action = <NavLink style={{ color: '#FFF' }}to="/login">Login</NavLink>;
        }
  return (
    <div  >
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
         
          <Link style={{ color: '#FFF' }} to={`/`} > <Typography variant="h6"  >Library Management Platform</Typography></Link>
          
            <Button  href="/search?title=xxyyzz&authors=zzzyymm&language=abbcc" variant="outlined" style={{ color: '#FFF' }}>Search</Button>
           <Button variant="outlined" style={{ color: '#FFF' }}>{action}</Button>  
        </Toolbar>
      </AppBar>
    </div>
    )
}
}

