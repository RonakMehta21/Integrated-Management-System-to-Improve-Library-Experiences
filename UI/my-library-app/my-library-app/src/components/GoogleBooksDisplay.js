import React, { Component } from 'react';
import {Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class GoogleBooksDisplay extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3 align='justify'>Google Books</h3>
                {this.props.googlebooks.map((gbook, index) => (
                    <Card>
                        <a href={gbook[1]} target="_blank">{gbook[0]}</a>
                    </Card>
                ))}
            </div>
        );
    }
}

export default GoogleBooksDisplay;