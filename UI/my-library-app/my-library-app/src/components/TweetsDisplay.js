import React, { Component } from 'react';
import {Card } from 'react-bootstrap';

class TweetsDisplay extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        var right = 200 + 'px';
        return (
            <div>
                <h3 style={{right: right}}>Recent Tweets</h3>
                {this.props.tweets.map((tweet, index) => (
                    <Card>
                        <p >{tweet}</p>
                    </Card>
                ))}
            </div>
        );
    }
}

export default TweetsDisplay;