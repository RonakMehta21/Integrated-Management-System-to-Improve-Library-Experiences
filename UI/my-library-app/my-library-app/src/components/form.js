import React from 'react'
import Form from 'react-bootstrap/Form';

const form_books = () => {
return(
    <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Author Search String" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
)

};