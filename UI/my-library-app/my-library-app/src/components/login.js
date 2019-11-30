import React, {Component} from 'react';
import firebase from 'firebase';
import { withRouter} from 'react-router-dom';


import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
    apiKey: "AIzaSyBERSrGrsIlY6-MVZziFr5r1Tc4E8_zmEQ",
    authDomain: "sjsulibrary-b819a.firebaseapp.com",
    projectId: "sjsulibrary-b819a",
    databaseURL:"https://sjsulibrary-b819a.firebaseio.com/"
})

class Login extends Component {
    state={isSignedIn : false,alreadyExist:false}
    uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return true;
          }
        },
        
        signInFlow: 'popup',
        signInOptions: [
        
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID

        ],
    };

    componentWillMount = () =>{
        var currentProp = this;
        firebase.auth().onAuthStateChanged(user=>{
            this.setState({isSignedIn : !!user });
            
            if(this.state.isSignedIn){
                // currentProp.setState({isAdmin:user.isAdmin})
                // console.log('isAdmin',user.isAdmin)
                

                
        firebase.database().ref().child("users").orderByChild("email").equalTo(firebase.auth().currentUser.email).on("value", function(snapshot) {
            var retVal=snapshot.exists()
            // console.log('retval',retVal)
            currentProp.setState({alreadyExist: retVal})
            var uid=firebase.auth().currentUser.uid;
            var x=firebase.database().ref('users').child(uid).once('value').then(function(snapshot) {
                var username =snapshot.val().username;
                var email=snapshot.val().email;
                var isAdmin=snapshot.val().isAdmin;
                // alert('isadmin info',isAdmin)
                localStorage.setItem("isAdmin", isAdmin);
                localStorage.setItem("uid", uid);
                
                // ...
              });
            // console.log('x')

            if (!retVal){
                writeUserData(firebase.auth().currentUser.uid,firebase.auth().currentUser.displayName,firebase.auth().currentUser.email,firebase.auth().currentUser.photoURL)
                            }
            });

        }      
        });

        // var database = firebase.database();
        function writeUserData(userId, name, email, imageUrl) {
            // console.log('in writing shit')
            firebase.database().ref('users').child(userId).set({
            username: name,
            email: email,
            profile_picture : imageUrl,
            isAdmin:0
          });
        }    
    // console.log(this.state.)
    }

    // Query query = FirebaseDatabase.getInstance().getReference().child("users").orderByChild("username").equalTo("usernameToCheckIfExists");
    // query.addListenerForSingleValueEvent(new ValueEventListener() {
    //      @Override
    //      public void onDataChange(DataSnapshot dataSnapshot) {
    //        if (dataSnapshot.getChildrenCount() > 0) {
    //            // 1 or more users exist which have the username property "usernameToCheckIfExists"
    //         }
    //       }
   
    //      @Override
    //      public void onCancelled(DatabaseError databaseError) {
   
    //      }
    //  });



    render(){
        var action;

        if(this.state.isSignedIn) {
            // console.log(firebase.auth().currentUser.displayName);
            this.props.history.goBack();
        } else {
            action =    <StyledFirebaseAuth 
                            uiConfig={this.uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
        }

        return(
            <div className="Login">
            {
                action
            }
            </div>
        )
    }
}

export default withRouter(Login);