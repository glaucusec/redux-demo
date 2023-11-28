import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import axios from "axios"; // Import Axios

import { useSelector } from "react-redux";

function App() {
  const [status, setStatus] = useState();
  const ui = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  useEffect(() => {
    async function sendCartData() {
      setStatus("sending");
      try {
        if (cart.items.length > 0) {
          await axios.put(
            "https://expense-tracker-fire-default-rtdb.firebaseio.com/cart.json",
            cart
          );
        }
        // Use Axios instead of fetch
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    }
    sendCartData();
  }, [cart]);

  return (
    <Layout>
      {status === "success" && (
        <Notification
          status={"success"}
          title={"Success"}
          message={"Sent Cart Data Successfully!"}
        />
      )}
      {status === "sending" && (
        <Notification title={"Sending"} message={"Sending Cart Data ...!"} />
      )}
      {status === "failed" && (
        <Notification status={"error"} title={"Failed"} message={"Sent Cart Data Failed!"} />
      )}
      {ui.cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
