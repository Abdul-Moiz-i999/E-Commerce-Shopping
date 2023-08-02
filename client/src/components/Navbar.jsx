import React from "react";
import styled from "styled-components";

import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  border: 0.5px solid lightgray;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })};
`;

const Right = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

const Language = styled.span`
  cursor: pointer;
  font-size: 14px;
  ${mobile({ display: "none" })}
`;

function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  // console.log("This is quantity: " + quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Ali999</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to="/cart" style={{ color: "inherit" }}>
            <MenuItem>
              <Badge
                overlap="rectangular"
                badgeContent={quantity}
                color="primary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
