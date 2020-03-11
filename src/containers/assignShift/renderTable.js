import React from "react";
import { Form, Button, Col, Row, Jumbotron, Table } from "react-bootstrap";

import RenderRow from "./renderRow";

const AssignTable = ({ days, onSubmit, onChange }) => {
  return (
    <React.Fragment>
      <Form onSubmit={onSubmit}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            <RenderRow onChange={onChange} days={days} />
          </tbody>
        </Table>
        <Form.Group>
          <Button data-testid="submitButton" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </React.Fragment>
  );
};

export default AssignTable;
