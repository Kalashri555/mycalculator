import "./App.css";
import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";


function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((prev) => prev + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState || preState || "0");
  }, [curState, preState]);

  const operatorType = (e) => {
    if (curState === "") return;

    setTotal(false);
    setOperator(e.target.innerText);

    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }

    let result;

    switch (operator) {
      case "/":
        result =
          parseFloat(curState) === 0
            ? "Error"
            : String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        result = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "X":
        result = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        result = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }

    setInput(result);
    setPreState(result);
    setCurState("");
    setOperator(null);
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    preState
      ? setCurState(String((parseFloat(curState) / 100) * preState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
    setOperator(null);
    setTotal(false);
  };

  const backspace = () => {
    setCurState((prev) => (prev.length > 1 ? prev.slice(0, -1) : ""));
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='screen'>
          <NumericFormat
            value={input}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
        <div className='btn light-gray' onClick={reset}>AC</div>
        <div className='btn light-gray' onClick={percent}>%</div>
        <div className='btn light-gray' onClick={minusPlus}>+/-</div>
        <div className='btn orange' onClick={operatorType}>/</div>

        <div className='btn' onClick={inputNum}>7</div>
        <div className='btn' onClick={inputNum}>8</div>
        <div className='btn' onClick={inputNum}>9</div>
        <div className='btn orange' onClick={operatorType}>X</div>

        <div className='btn' onClick={inputNum}>4</div>
        <div className='btn' onClick={inputNum}>5</div>
        <div className='btn' onClick={inputNum}>6</div>
        <div className='btn orange' onClick={operatorType}>+</div>

        <div className='btn' onClick={inputNum}>1</div>
        <div className='btn' onClick={inputNum}>2</div>
        <div className='btn' onClick={inputNum}>3</div>
        <div className='btn orange' onClick={operatorType}>-</div>

        <div className='btn zero' onClick={inputNum}>0</div>
        <div className='btn' onClick={inputNum}>.</div>
        <div className='btn' onClick={equals}>=</div>
        <div className='btn light-gray' onClick={backspace}>DEL</div>
      </div>
    </div>
  );
}

export default App;
