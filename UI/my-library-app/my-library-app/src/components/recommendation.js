import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import axios from 'axios';

class Recommendation extends Component {
  render() {
    //  console.log(this.props.books2)
    return (
      <div>
        <center>
          <h1>Recommended Book List</h1>
        </center>
        <Container>
          <Row>
            {this.props.books.map((book, index) => (
              <Col md="auto">
                <CardDeck>
                  <Card style={{ width: "20rem" }}>
                    <CardBody>
                      <CardTitle>{book.title}</CardTitle>
                      <CardText>
                        {/* <p><b>Author:</b>{book.authors}</p> */}
                        <b>Author: </b>{" "}
                        <Link
                          to={`/search/?title=&authors=${book.authors}&language=`}
                        >
                          {" "}
                          {book.authors}
                        </Link>
                        <p>
                          <b>Rating:</b>
                          {book.average_rating}
                        </p>
                        <p>
                          <b>BookID:</b>
                          {book.bookID}
                        </p>
                        <p>
                          <img src={book.image}></img>
                        </p>
                        <p>
                          <b>Year Published:</b>
                          {book.year}
                        </p>
                        <p>
                          <b>Authors:</b>
                          {book.authors}
                        </p>
                        <p>
                          <b>ISBN:</b>
                          {book.isbn}
                        </p>
                        <p>
                          <b>Count:</b>
                          {book.count}
                        </p>
                      </CardText>
                      <Button
                        variant="outlined"
                        style={{ color: "primary" }}
                        href={`/bookinfo/${book.bookID}`}
                      >
                        {" "}
                        Click to View More
                      </Button>
                    </CardBody>
                  </Card>
                </CardDeck>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}
//  export default Recommendation
export default withRouter(Recommendation);
