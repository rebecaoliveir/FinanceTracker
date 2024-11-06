import React, { useState } from "react";
import "./calculator.css"

export const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number | string | null>(null);

  const handleInput = (value: string) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
    setResult(null);
  };

  const calculateResult = () => {
    try {
      // Use eval carefully or consider a math library for more safety
      const evalResult = eval(input) as number; 
      setResult(evalResult);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div>{input || "0"}</div>
        <div>{result !== null ? `= ${result}` : ""}</div>
      </div>
      <div className="buttons">
        {["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", ".", "/", "="].map((button) => (
          <button
            key={button}
            onClick={() =>
              button === "=" ? calculateResult() : handleInput(button)
            }
          >
            {button}
          </button>
        ))}
        <button onClick={clearInput}>Clear</button>
      </div>
    </div>
  );
};

export default Calculator;
