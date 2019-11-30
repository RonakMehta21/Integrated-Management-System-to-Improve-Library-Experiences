import React, { Component } from "react";
import axios from "axios";
import GoogleBooksDisplay from './GoogleBooksDisplay';

class Googlebooks extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <GoogleBooksDisplay googlebooks={this.state.googlebook}/>
            </div>
        )
    }
    state = {
        googlebook: []
    }
    componentWillMount() {
        const bookTitle=this.props.googlebooktitle
        console.log(bookTitle)
        let url = 'http://0.0.0.0:80/v1/googlebooks/'+bookTitle
        console.log("Google URL",url)
        axios.get(url)
            .then(res => {
                console.log("Google Books", res);
                const bookTitle = []
                const bookLink=[]
				for (var i in res.data.items) {
                    //console.log('bhai idhar deekh',res.data.items[i])
                    bookTitle.push(res.data.items[i].volumeInfo.title);
                    bookLink.push(res.data.items[i].volumeInfo.infoLink);
				}
				var c = bookTitle.map(function(e, i) {
                    return [e, bookLink[i]];
                  });
                this.setState({ googlebook: c})
			})
			.catch(console.log)

    }
}

export default Googlebooks;