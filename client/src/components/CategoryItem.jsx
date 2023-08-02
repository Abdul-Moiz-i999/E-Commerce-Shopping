import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  ${mobile({ height: "30vh" })};
`;
const Info = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  background-color: white;
  border: none;
  padding: 10px;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.5s ease;

  &:hover {
    background: transparent;
    border: 1px solid white;
    color: white;
  }
`;

function CategoryItem({ item }) {
  return (
    <Container>
      <Link to={`products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button className="categoryButton">SHOW NOW</Button>
        </Info>
      </Link>
    </Container>
  );
}

export default CategoryItem;
