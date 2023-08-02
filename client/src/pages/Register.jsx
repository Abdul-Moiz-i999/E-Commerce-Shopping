import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;
const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  width: 40%;
  ${mobile({ width: "75%" })};
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 24;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  min-width: 40%;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  background-color: teal;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  padding: 15px 20px;
  width: 40%;

  &:hover {
    border: 2px solid teal;
    background-color: transparent;
    color: black;
  }
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
