import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

// const store = configureStore({
//   reducer: { counter: counterSlice.reducer },
// });


export default store;
