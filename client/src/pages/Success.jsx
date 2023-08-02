import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethod";

function Success() {
  const location = useLocation();
  const { stripeData: data, cart } = location;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  //   console.log(location);
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {orderId
        ? `Order has successfully been Created. Your order Number is ${orderId}`
        : `Successful. Your Order is being Prepared.`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
}

export default Success;
