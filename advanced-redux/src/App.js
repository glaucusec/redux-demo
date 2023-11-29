import { useEffect, useState, Fragment } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import axios from "axios";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui";
import { cartActions } from "./store/cart-slice";
import { fetchCartData } from "./store/cart-actions";

import { useSelector } from "react-redux";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const ui = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    async function sendCartData() {
      try {
        dispatch(
          uiActions.showNotification({
            status: "pending",
            title: "Sending",
            message: " Sending cart data...",
          })
        );
        await axios.put("https://redux-ccf54-default-rtdb.firebaseio.com/cart.json", cart);
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: " Cart data send successfully.",
          })
        );

        // Use Axios instead of fetch
      } catch (error) {
        console.error(error);
        dispatch(
          uiActions.showNotification({
            status: "failed",
            title: "Failed",
            message: " Failed sending cart data...",
          })
        );
      }
    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      sendCartData();
    }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {ui.cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
