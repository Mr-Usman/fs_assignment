import React from "react";
import styled from "styled-components";

import Navbar from "../Navbar";

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const NotFound = ({ role }) => {
  return (
    <React.Fragment>
      <Navbar role={role} />
      <Wrapper>
        <Title>Not Found...</Title>
      </Wrapper>
    </React.Fragment>
  );
};

export default NotFound;
