import React from "react";
import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fcf5f5;
  height: 60vh;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })};
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border: 1px solid lightgray;
  height: 40px;
  width: 50%;
  ${mobile({ width: "80%" })};
`;
const Input = styled.input`
  flex: 8;
  border: none;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  background-color: teal;
  border: none;
  color: white;
`;

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get Timely Updates from your favourite Products.</Desc>
      <InputContainer>
        <Input placeholder="Your Email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
