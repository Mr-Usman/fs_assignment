import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router-dom";

import API from "../../../utils/api_end_points";
import RenderTable from "./renderTable";
import NotFound from "../../../components/NotFound";
import Navbar from "../../../components/Navbar";
// import SwapShit from "../matchUsers";

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Heading = styled.h4`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;

const Shift = props => {
  const { email } = JSON.parse(localStorage.getItem("user"));
  const [timing, setTiming] = useState([]);
  const [swap, setSwap] = useState([]);
  const [day, setDay] = useState(null);

  useEffect(() => {
    async function getTiming() {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.get(API.userTiming, config);
      console.log(res);
      setTiming(res.data.weekShift);
    }
    getTiming();
  }, []);

  const onDrop = async time => {
    try {
      // const { day } = time;
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const res = await axios.post(API.dropShift, { time }, config);
      setTiming(res.data.currentShift);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSwap = day => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.get(API.getUserWithSameRole, config).then(function(success) {
        if (success.data && success.data.length > 0) {
          setSwap(success.data);
          setDay(day);
          if (success.data && success.data.length > 0) {
            props.history.push("/matchusers", {
              swap: success.data,
              day,
              role: props.role
            });
          } else {
            console.log("swap is 0");
          }
        } else {
          console.log("called ");
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  if (props.role !== "developer") {
    return <NotFound role={props.role} />;
  }

  return (
    <React.Fragment>
      <Navbar role={props.role} />
      <Wrapper>
        <Title>{email}</Title>
        <Heading>Your Shift for this week</Heading>
        {timing.length && (
          <RenderTable onDrop={onDrop} onSwap={onSwap} timing={timing} />
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default Shift;
