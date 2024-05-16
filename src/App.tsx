import mgoLogo from "/mgo.svg";
import { useState } from "react";
import { Square } from "./components/Square";
import { Turns, WinnerCombos } from "./constants.js";

const TurnsSquares = ({
  isSelected,
  symbol,
}: {
  isSelected: boolean;
  symbol: string;
}) => {
  return (
    <span className={isSelected ? "turn-square is-selected" : "turn-square"}>
      {symbol}
    </span>
  );
};

function App() {
  const checkWinner = (boardToCheck: Array<string | null>) => {
    for (const combo of WinnerCombos) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[b] === boardToCheck[a] &&
        boardToCheck[c] === boardToCheck[a]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const checkEndGame = (boardToCheck: Array<string | null>) => {
    return boardToCheck.every((square) => square !== null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.x);
    setWinner(null);
  };

  const [board, setBoard] = useState(Array(9).fill(null));

  const [miniBoard, setMiniBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(Turns.x);

  const [winner, setWinner] = useState<null | boolean>(null);

  const updateBoard = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    setTurn((prevTurn: string): string =>
      prevTurn === Turns.x ? Turns.o : Turns.x
    );

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner((): any => {
        return newWinner;
      });
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="game">
      <section className="header">
        <img src={mgoLogo} alt="MauGarOla logo" className="personalLogo" />
        <h1 className="title">
          Tic-Tac-Toe!
          <br />
          <strong>Extreme</strong>
        </h1>
        <button className="new-game" onClick={resetGame}>
          Reset
        </button>
      </section>
      <section className="board">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turns">
        <TurnsSquares isSelected={turn === Turns.x} symbol={Turns.x} />
        <TurnsSquares isSelected={turn === Turns.o} symbol={Turns.o} />
      </section>
      <figure className={winner !== null ? "end-game" : "in-game"}>
        {winner ? `The winner is ${winner}` : "There is no winner"}
        <button className="new-game" onClick={resetGame}>
          New game
        </button>
      </figure>
    </main>
  );
}

export default App;
