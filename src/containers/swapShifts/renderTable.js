import React from "react";
import { Table, Form, Jumbotron } from "react-bootstrap";

const RenderTable = ({ swappedList }) => {
  return (
    <React.Fragment>
      <Form.Group>
        <Jumbotron>{swappedList}</Jumbotron>
      </Form.Group>
    </React.Fragment>
  );
};

export default RenderTable;
