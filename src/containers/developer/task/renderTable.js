import React from "react";
import { Form, Button, Col, Row, Jumbotron, Table } from "react-bootstrap";
import RenderRow from "./renderRow";

const TaskTable = ({ taskList }) => {
  return (
    <React.Fragment>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map(task => (
            <RenderRow task={task} />
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default TaskTable;
