import React from "react";

interface CounterState {
  count: number;
}

class Counter extends React.Component<{}, CounterState> {
  constructor(props: { initialValue?: number }) {
    super(props);
    this.state = {
      count: props.initialValue || 0, 
    };
  }

  increment = () => {
    this.setState(
      (prevState) => ({ count: prevState.count + 1 })
    );
  };

  decrement = () => {
    this.setState(
      (prevState) => ({ count: prevState.count - 1 })
    );
  };

  render() {
    return React.createElement(
      "div", 
      { style: { textAlign: "center", marginTop: "20px" } }, 
      React.createElement("h2", {}, `Count: ${this.state.count}`), 
      React.createElement(
        "button",
        { onClick: this.decrement, style: { margin: "5px" } }, 
        "Decrement" 
      ),
      React.createElement(
        "button",
        { onClick: this.increment, style: { margin: "5px" } }, 
        "Increment" 
      )
    );
  }
}

export default Counter;