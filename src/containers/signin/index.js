import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Redirect, Router, withRouter } from "react-router-dom";
import { Form, Button, Jumbotron } from "react-bootstrap";

import API from "../../utils/api_end_points";

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Container = styled.div`
  width: 50em;
  height: 20em;
  border: 1px solid black;
  color: #edd0ce;
  margin: 0 auto;
  padding: 3em;
`;

const Signin = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logginedIn, setLogginedIn] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      props.history.push("/alldevelopers");
    }
  });

  const submitForm = async e => {
    try {
      e.preventDefault();
      const res = await axios.post(API.signin, { email, password });
      const user = {
        token: res.data.token,
        email: res.data.email,
        role: res.data.role,
        status: true
      };
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "manager") {
        props.history.push("/alldevelopers");
      } else {
        props.history.push("/tasks");
      }
    } catch (e) {
      console.log(e.message);
      setHasError(true);
    }
  };
  return (
    <Wrapper>
      <Title>Sign In</Title>
      <Container>
        <Form onSubmit={submitForm}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          {hasError && (
            <Form.Group>
              <p style={{ color: "red" }}>Invalid User Name or Password! </p>
            </Form.Group>
          )}
          <Form.Group>
            <Button variant="primary" type="submit">
              signin
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default Signin;
