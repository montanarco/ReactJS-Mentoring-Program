import React from "react";
import CounterButton from "../CounterButton/CounterButton"; // Import the refactored CounterButton component

interface CounterState {
  count: number;
}

interface CounterProps {
  initialValue: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: props.initialValue || 0,
    };
  }

  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  decrement = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Count: {this.state.count}</h2>
        <CounterButton
          onClick={this.decrement}
          text="Decrement"
          style={{ margin: "5px" }}
        />
        <CounterButton
          onClick={this.increment}
          text="Increment"
          style={{ margin: "5px" }}
        />
      </div>
    );
  }
}

export default Counter;