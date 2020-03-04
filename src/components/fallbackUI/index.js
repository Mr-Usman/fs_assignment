import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const FallBack = () => {
  return (
    <Wrapper>
      <Title>Please Wait...</Title>
    </Wrapper>
  );
};

export default FallBack;
