import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import RenderTable from "./renderTable";

import axios from "axios";
import API from "../../../utils/api_end_points";
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

const MatchUsers = props => {
  const list = props.location.state ? props.location.state.swap : null;
  const day = props.location.state ? props.location.state.day : null;
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sendRequest, setSendRequest] = useState(false);

  const allSelectedUsers = id => {
    const selectUsers = [...selectedUsers];
    selectUsers.push(id);
    setSelectedUsers(selectUsers);
  };

  const submittedSelectedUsers = async e => {
    try {
      const { swap, day } = props.location.state;
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.post(
        API.swapShift,
        { userIds: selectedUsers, day },
        config
      );
      if (res.data) {
        setSendRequest(true);
      }
    } catch (e) {
      console.log(e.message);
    }
    e.preventDefault();
  };

  if (props.role !== "developer") {
    return <NotFound role={props.role} message="Not Found..." />;
  }

  return (
    <React.Fragment>
      <Navbar role={props.role} />
      <Wrapper>
        <Title>Swap Shift with following</Title>
        {list && (
          <RenderTable
            list={list}
            allSelectedUsers={allSelectedUsers}
            submittedSelectedUsers={submittedSelectedUsers}
          />
        )}
      </Wrapper>
      {sendRequest && (
        <Jumbotron>
          <p>Request Send To User!</p>
        </Jumbotron>
      )}
    </React.Fragment>
  );
};

export default MatchUsers;
