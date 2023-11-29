import axios from "axios";
import { uiActions } from "./ui";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("https://redux-ccf54-default-rtdb.firebaseio.com/cart.json");
      return response.data;
    };

    try {
      const cartdata = await fetchData();
      //   console.log(cartdata)
      dispatch(
        cartActions.replaceCart({
          items: cartdata.items || [],
          totalQuantity: cartdata.totalQuantity,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: "failed",
          title: "Failed",
          message: " fetching  cart data failed...",
        })
      );
    }
  };
};
