import React, { useState } from "react";
import CounterButton from "../CounterButton/CounterButton"; 

interface CounterProps {
  initialValue: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue }) => {
  const [count, setCount] = useState(initialValue || 0); 

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1); 
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Count: {count}</h2>
      <CounterButton
        onClick={decrement}
        text="Decrement"
        style={{ margin: "5px" }}
      />
      <CounterButton
        onClick={increment}
        text="Increment"
        style={{ margin: "5px" }}
      />
    </div>
  );
};

export default Counter;