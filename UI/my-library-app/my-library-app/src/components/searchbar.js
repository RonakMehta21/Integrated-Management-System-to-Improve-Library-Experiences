import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const SearchBar = props => {
  return (
    <Form>
      <FormGroup>
        <Label for="title">Book</Label>
        <Input
          type="text"
          name="title"
          id="bookname"
          placeholder="search book name"
        />
      </FormGroup>

      <FormGroup>
        <Label for="AuthorName">Author</Label>
        <Input
          type="text"
          name="authors"
          id="authorname"
          placeholder="search author name"
        />
      </FormGroup>

      {/* <FormGroup>
        <Label for="AuthorName">LanguageCode</Label>
        <Input type="text" name="language" id="language" placeholder="Language Code" />
      </FormGroup> */}
      <Button>Submit</Button>
    </Form>
  );
};

export default SearchBar;
