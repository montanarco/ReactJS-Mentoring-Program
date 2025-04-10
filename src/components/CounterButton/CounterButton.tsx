import React from "react";

export interface CounterButtonProps {
    onClick: () => void;
    text: string;
    style?: React.CSSProperties; // Optional
  }

  const CounterButton: React.FC<CounterButtonProps> = ({ onClick, text, style }) => {
    return (
      <button onClick={onClick} style={style}>
        {text}
      </button>
    );
  };
  
  export default CounterButton;