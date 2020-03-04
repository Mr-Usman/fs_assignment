import React, { useEffect, useState } from "react";
import styled from "styled-components";

import API from "../../utils/api_end_points";
import axios from "axios";

import RenderTable from "./renderTable";
import NotFound from "../../components/NotFound";
import Navbar from "../../components/Navbar";

// import HOC from '../../../HOC';

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const SwapShifts = props => {
  const user = props.location.state;
  const [swappedList, setSwappedList] = useState("");

  useEffect(() => {
    async function fetchlist() {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.post(API.getSwappedList, { user }, config);
      setSwappedList(res.data);
    }
    fetchlist();
  }, []);

  if (props.role !== "manager") {
    return <NotFound role={props.role} />;
  }

  return (
    <React.Fragment>
      <Navbar role={props.role} />
      <Wrapper>
        <Title>`Swapped History of ({user.email})`</Title>
        {swappedList && <RenderTable swappedList={swappedList} />}
      </Wrapper>
    </React.Fragment>
  );
};

export default SwapShifts;
