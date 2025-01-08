import { useState, useEffect } from "react";
import * as Logic from "./Logic";
import "./App.css";

function App() {
  const [arr, setArr] = useState(Logic.initialState);

  const reset = () => {
    setArr(Logic.initialState);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Logic.player(arr) === "O" && !Logic.terminal(arr)) {
        setArr(Logic.result(arr, Logic.bestMove(arr)));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [arr]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-['Poppins']">
      <div className="flex flex-col gap-8 justify-center items-center min-h-screen p-4">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-2">
          Tic Tac Toe
        </h1>

        {/* Game Status */}
        <div className="text-xl md:text-2xl font-medium  h-8 mb-2">
          {!Logic.terminal(arr) && (
            <span className="animate-pulse">
              Player {Logic.player(arr)}'s Turn
            </span>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 grid-rows-3 w-80 h-80 md:w-96 md:h-96 bg-opacity-20 bg-white backdrop-blur-md rounded-xl overflow-hidden">
          {arr.map((val, i) => (
            <div
              className={`border border-white/30 cursor-pointer flex justify-center items-center text-4xl md:text-5xl
                  transition-all duration-200 hover:bg-white/10 ${
                    val === "X" ? "text-pink-500" : "text-violet-500"
                  } font-bold`}
              key={i}
              onClick={() =>
                setArr(!Logic.terminal(arr) ? Logic.result(arr, i) : arr)
              }
            >
              {val && <span className="animate-scale-in">{val}</span>}
            </div>
          ))}
        </div>

        {/* Game Result */}
        <div className="text-2xl md:text-3xl font-semibold h-10 text-white">
          {Logic.terminal(arr) && Logic.utility(arr) !== 0 && (
            <div className="animate-bounce">
              The winner is:{" "}
              <span
                className={
                  Logic.utility(arr) === 1 && Logic.terminal(arr)
                    ? "text-pink-500"
                    : "text-violet-500"
                }
              >
                {Logic.utility(arr) === 1
                  ? "X"
                  : Logic.utility(arr) === -1
                  ? "O"
                  : ""}
              </span>
            </div>
          )}
          {Logic.utility(arr) === 0 && Logic.terminal(arr) && (
            <div className="animate-bounce">It's a Tie!</div>
          )}
        </div>

        {/* Reset Button */}
        <button
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold
            transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25
            focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-transparent"
          onClick={reset}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
