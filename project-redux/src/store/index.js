import redux from "redux";

const counterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case "increment":
      return {
        counter: state.counter + 1,
      };

    case "decrement":
      return {
        counter: state.counter - 1,
      };
    case "increment2":
      return {
        counter: state.counter + 2,
      };

    case "decrement2":
      return {
        counter: state.counter - 2,
      };
    default: {
      return state;
    }
  }
};

const store = redux.createStore(counterReducer);

export default store;
