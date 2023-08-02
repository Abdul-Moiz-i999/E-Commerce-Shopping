import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })};
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  background-color: ${({ type }) =>
    type === "filled" ? "black" : "transparent"};
  border: ${({ type }) => type === "filled" && "none"};
  color: ${(props) => props.type === "filled" && "white"};
  cursor: pointer;
  padding: 10px;
  font-weight: 600;
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })};
`;
const TopText = styled.span`
  cursor: pointer;
  margin: 0 10px;
  text-decoration: underline;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  height: 20px;
  width: 20px;
`;
const ProductSize = styled.span``;
const PriceDetails = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })};
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px " })};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.type === "total" && "24px"};
  font-weight: ${(props) => props.type === "total" && "500"};
  margin: 30px 0;
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  background-color: black;
  color: white;
  font-weight: 600;
  padding: 10px;
  width: 100%;

  &:hover {
    background-color: #fff;
    border: 1px solid black;
    color: black;
    cursor: pointer;
  }
`;

function Cart() {
  const KEY = process.env.REACT_APP_STRIPE_PUBLIC;

  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => setStripeToken(token);
  const navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          // amount: cart.total,
          amount: 500,
        });
        // console.log("here in navigate");
        navigate("/success", {
          state: { stripeData: res.data, products: cart },
        });
      } catch (err) {
        console.log(err);
      }
    };
    // stripeToken && cartRedux.total && makeRequest();
    stripeToken && makeRequest();
    // }, [stripeToken, navigate, cart.total]);
  }, [stripeToken, navigate, cart]);

  return (
    <Container>
      <Navbar />
      <Announcements />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag (2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECK OUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((p) => (
              <Product key={p._id}>
                <ProductDetails>
                  <Image src={p.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {p.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {p._id}
                    </ProductId>
                    <ProductColor color={p.color} />
                    <ProductSize>
                      <b>Size: </b> {p.size}
                    </ProductSize>
                  </Details>
                </ProductDetails>
                <PriceDetails>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{p.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>$ {p.price * p.quantity}</ProductPrice>
                </PriceDetails>
              </Product>
            ))}

            <Hr />

            {/* <Product>
              <ProductDetails>
                <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
                <Details>
                  <ProductName>
                    <b>Product:</b> HAKURA T-SHIRT
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93184930495
                  </ProductId>
                  <ProductColor color="gray" />
                  <ProductSize>
                    <b>Size: </b> M
                  </ProductSize>
                </Details>
              </ProductDetails>
              <PriceDetails>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ 20</ProductPrice>
              </PriceDetails>
            </Product> */}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Ali999 Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your Total is ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
