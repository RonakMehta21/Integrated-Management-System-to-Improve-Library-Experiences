import React, { Component } from 'react';
import axios from 'axios';
import TweetsDisplay from './TweetsDisplay'

class Tweets extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <TweetsDisplay tweets={this.state.displaytweet}/>
            </div>
        );
    }
    state = {
        displaytweet: []
    }
    componentWillMount() {
        const bookTitle=this.props.string
        console.log(bookTitle)
        let url = 'http://0.0.0.0:80/v1/tweets/'+bookTitle
        console.log(url)
        axios.get(url)
            .then(res => {
                console.log("Book tweets", res);
                
                const a = []
            
                for (var i=0;i<5;i++){
                    a.push(res.data.statuses[i].text)
                }
                console.log(a)
                this.setState({ displaytweet : a})
                console.log(a,this.state.displaytweet)
            }).catch(console.log);

    }
}

export default Tweets;