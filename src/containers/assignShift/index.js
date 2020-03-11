import React, { Component, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Col, Row, Jumbotron, Table } from "react-bootstrap";
import axios from "axios";
import NotFound from "../../components/NotFound";
import Navbar from "../../components/Navbar";

import API from "../../utils/api_end_points";

import AssignTable from "./renderTable";

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
class AssignShift extends Component {
  constructor(props) {
    super(props);
    const user = this.props.location.state;
    this.state = {
      days: [
        {
          id: 1,
          day: "Monday",
          startTime: new Date(),
          endTime: new Date()
        },
        {
          id: 2,
          day: "Tuesday",
          startTime: new Date(),
          endTime: new Date()
        },
        {
          id: 3,
          day: "Wednesday",
          startTime: new Date(),
          endTime: new Date()
        },
        {
          id: 4,
          day: "Thursday",
          startTime: new Date(),
          endTime: new Date()
        },
        {
          id: 5,
          day: "Friday",
          startTime: new Date(),
          endTime: new Date()
        }
      ],
      user,
      shiftAssign: false
    };
  }
  onSubmit = async e => {
    try {
      e.preventDefault();
      const { days, user } = this.state;
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.post(
        API.assignTiming,
        {
          weekShift: days,
          _id: user._id
        },
        config
      );
      this.setState(() => ({
        shiftAssign: true
      }));
    } catch (e) {
      console.log(e.message);
      this.setState(() => ({
        shiftAssign: false
      }));
    }
  };

  onChange = (id, time, date) => {
    const { days } = this.state;
    if (time === "startTime") {
      const dayObject = days.filter(day => day.id === id)[0];
      dayObject["startTime"] = date;
      const index = days.indexOf(dayObject);
      let newDays = days;
      newDays[index] = dayObject;
      this.setState({ days: newDays });
    } else {
      const dayObject = days.filter(day => day.id === id)[0];
      dayObject["endTime"] = date;
      const index = days.indexOf(dayObject);
      let newDays = days;
      newDays[index] = dayObject;
      this.setState({ days: newDays });
    }
  };

  render() {
    const { user, days, shiftAssign } = this.state;
    if (this.props.role !== "manager") {
      return <NotFound role={this.props.role} message="Not Found..." />;
    }
    return (
      <React.Fragment>
        <Navbar role={this.props.role} />
        <Wrapper>
          <Title>Assign Shift To ({user.email})</Title>
          <AssignTable
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            days={days}
          />
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              {shiftAssign && (
                <Jumbotron>
                  <p>Shift Assigned To User.</p>
                </Jumbotron>
              )}
            </Col>
            <Col md={2}></Col>
          </Row>
        </Wrapper>
      </React.Fragment>
    );
  }
}
export default AssignShift;
