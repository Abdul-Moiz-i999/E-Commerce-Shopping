import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  background-color: coral;
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: 100%;
  ${mobile({ display: "none" })};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transition: all 1.5s ease;
  transform: translateX(${({ slideIndex }) => slideIndex * -100}vw);
`;

const Slide = styled.div`
  align-items: center;
  background-color: #${({ bg }) => bg};
  display: flex;
  height: 100vh;
  width: 100vw;
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const Image = styled.img`
  height: 80%;
  width: 100%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;
const Desc = styled.p`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  margin: 50px 0px;
`;
const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  padding: 10px;
`;

const Arrow = styled.div`
  align-items: center;
  display: flex;
  background-color: #fff7f7;
  border-radius: 50%;
  cursor: pointer;
  justify-content: center;
  position: absolute;
  margin: auto;
  opacity: 0.5;
  top: 0;
  bottom: 0;
  left: ${({ direction }) => direction === "left" && "10px"};
  right: ${({ direction }) => direction === "right" && "10px"};
  height: 50px;
  width: 50px;
  z-index: 2;
`;

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);

  //  This handles the slider on the screen
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id} bg={item.bg}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOP NOW </Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
}

export default Slider;
