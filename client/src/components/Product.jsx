import React from "react";
import styled from "styled-components";

// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  align-items: center;
  background-color: #f5fbfd;
  display: flex;
  justify-content: center;
  height: 350px;
  margin: 5px;
  min-width: 280px;
  position: relative;
`;

const Circle = styled.div`
  background-color: white;
  border-radius: 50%;
  position: absolute;
  height: 200px;
  width: 200px;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
const Info = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all 0.5s ease;
  height: 100%;
  width: 100%;
  z-index: 3;

  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  margin: 10px;
  height: 40px;
  width: 40px;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

function Product({ item }) {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
}

export default Product;
