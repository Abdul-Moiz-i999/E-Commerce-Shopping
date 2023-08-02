import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: teal;
  color: white;
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  height: 30px;
  justify-content: center;
`;

function Announcements() {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
}

export default Announcements;
