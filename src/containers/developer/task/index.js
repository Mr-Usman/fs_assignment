import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button, Col, Row, Jumbotron } from "react-bootstrap";
import axios from "axios";

import API from "../../../utils/api_end_points";

import TaskTable from "./renderTable";
import NotFound from "../../../components/NotFound";
import Navbar from "../../../components/Navbar";

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      error: false
    };
  }

  async componentDidMount() {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.get(API.getAllTasks, config);
      this.setState(() => ({
        taskList: res.data
      }));
    } catch (e) {
      console.log(e.message);
      this.setState(() => ({
        error: true
      }));
    }
  }

  render() {
    const { taskList } = this.state;
    if (this.props.role !== "developer") {
      return <NotFound role={this.props.role} />;
    }
    return (
      <React.Fragment>
        <Navbar role={this.props.role} />
        <Wrapper>
          <Title>Your Todo List</Title>
          {taskList && <TaskTable taskList={taskList} />}
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default Task;
