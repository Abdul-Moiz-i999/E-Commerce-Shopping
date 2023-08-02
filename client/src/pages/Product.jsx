import { Add, Remove } from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { userRequest } from "../requestMethod";
import { mobile } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ flexDirection: "column", padding: "0px" })};
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  object-fit: cover;
  height: 90vh;
  width: 100%;
  ${mobile({ height: "30%" })};
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })};
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 200;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
  width: 50%;
  ${mobile({ width: "100%" })};
`;

const Filter = styled.div`
  align-items: center;
  display: flex;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 50%;
  cursor: pointer;
  margin: 0px 5px;
  height: 20px;
  width: 20px;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 50%;
  ${mobile({ width: "100%" })};
`;

const AmountContainer = styled.div`
  align-items: center;
  display: flex;
  font-weight: 700;
`;

const Amount = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid teal;
  border-radius: 10px;
  margin: 0px 5px;
  height: 30px;
  width: 30px;
`;
const Button = styled.button`
  background-color: white;
  border: 2px solid teal;
  cursor: pointer;
  font-weight: 500;
  padding: 15px;

  &:hover {
    background-color: #f8f4f4;
  }
`;

function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const handleAmount = (type) => {
    if (type === "inc") setAmount(amount + 1);
    else if (type === "dec") {
      if (amount < 2) return;
      setAmount(amount - 1);
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("/products/find/" + id);
        setProduct(res.data);
        // console.log("******************");
        // console.log(res);
        // console.log("******************");
        console.log("product");
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleCart = () => {
    dispatch(addProduct({ ...product, quantity: amount, color, size }));
  };

  return (
    <Container>
      <Navbar />
      <Announcements />
      <Wrapper>
        <ImgContainer>
          {/* <Image src="https://i.ibb.co/S6qMxwr/jean.jpg" /> */}
          <Image src={product?.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor key={c} color={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product &&
                  product.size?.map((size, index) => (
                    <FilterSizeOption key={index}>{size}</FilterSizeOption>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                style={{ cursor: "pointer" }}
                onClick={() => handleAmount("dec")}
              />
              <Amount>{amount}</Amount>
              <Add
                style={{ cursor: "pointer" }}
                onClick={() => handleAmount("inc")}
              />
            </AmountContainer>
            <Button onClick={handleCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Product;
