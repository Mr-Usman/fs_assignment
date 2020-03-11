import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

import API from "../../../utils/api_end_points";

import RenderTable from "./renderTable";
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

const SwapShift = props => {
  const [shift, setShift] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [shiftSwapped, setShiftSwapped] = useState(false);

  useEffect(() => {
    async function fetchSwappedShifts() {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.get(API.getSwapShifts, config);
      //   console.log(res);
      setShift(res.data.swapShift);
      setUserEmail(res.data.email);
    }
    fetchSwappedShifts();
  }, []);

  const swapShift = async day => {
    try {
      const newDay = { ...day, accepted: true };
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.post(API.swapDay, { day: newDay }, config);
      if (res.data) {
        setShiftSwapped(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  if (props.role !== "developer") {
    return <NotFound role={props.role} message="Not Found..." />;
  }

  return (
    <React.Fragment>
      <Navbar role={props.role} />
      <Wrapper>
        <Title>Swap Requests For You!</Title>
        {shift && (
          <RenderTable
            shift={shift}
            userEmail={userEmail}
            swapShift={swapShift}
          />
        )}
      </Wrapper>
      {shiftSwapped && (
        <Jumbotron>
          <p>Shift Has Been Swapped!</p>
        </Jumbotron>
      )}
    </React.Fragment>
  );
};

export default SwapShift;
