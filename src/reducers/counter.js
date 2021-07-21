const intialSate = {
  value: 0
};

const counterReducer = (state = intialSate, action) => {
  switch (action.type) {
    case "INCREMENT":
      console.log("Aici se ajunge: Increment");
      console.log("State: " + String(intialSate.value))
      return { ...state, value: state.value + 1 };
    case "DECREMENT":
      console.log("State: " + String(intialSate.value))
      console.log("Aici se ajunge: Decrement");
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};

export default counterReducer;
