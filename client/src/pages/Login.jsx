import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;
const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  width: 25%;
  ${mobile({ width: "75%" })};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  margin: 10px 0px;
  padding: 10px;
  min-width: 40%;
`;

const Button = styled.button`
  background-color: teal;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  padding: 15px 20px;
  margin-bottom: 10px;
  width: 40%;

  &:hover {
    border: 2px solid teal;
    background-color: transparent;
    color: black;
  }
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  cursor: pointer;
  font-size: 12px;
  margin: 5px 0px;
  text-decoration: underline;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    // username !== "" &&
    // password !== "" &&
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <Input placeholder="Email" /> */}
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something Went Wrong Please Retry...</Error>}
          <Link>DO NOT REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
