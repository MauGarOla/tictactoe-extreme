import mgoLogo from '/mgo.svg'
import { useState } from "react"

const Turns = {
  x: "X",
  o: "O"
}

const TurnsSquares = ({ isSelected, symbol }: {
    isSelected: boolean;
    symbol: string;
    }) => {
  return (
    <span className={isSelected ? "turn-square is-selected" : "turn-square"}>{symbol}</span>
  )
}

const Square = ({ children, updateBoard, index }: {
  children: string;
  updateBoard: any;
  index: number;
  }) => {

  const handelClick = () => {
    updateBoard(index)
  }

  return (
    <figure onClick={handelClick} className='square'>
      {children}
    </figure>
  )
}



const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const checkWinner = (boardToCheck: any) => {
  for (const combo in winnerCombos) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[b] === boardToCheck[a] &&
      boardToCheck[c] === boardToCheck[a]
    ) {
      return boardToCheck[a]
    }
  }
}


function App() {
  const [ board, setBoard ] = useState(Array(9).fill(null));

  const [ turn, setTurn ] = useState(Turns.x)

  const [ winner, setWinner] = useState(null)
  
  const updateBoard = (index: number) => {

    if (board[index] || winner) return

    const newBoard = [...board] 
    newBoard[index] = turn
    setBoard(newBoard)

    setTurn(prevTurn=> prevTurn === Turns.x ? Turns.o : Turns.x )
    
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  return (

    <main className='game'>
      <section className='header'>
        <img src={mgoLogo} alt="MauGarOla logo" className='personalLogo'/>
        <h1 className='title'>Tic-Tac-Toe!<br/><strong>Extreme</strong></h1>
      </section>
      <section className='board'>
          {board.map((_, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}>
                  {board[index]}
              </Square>
            )
          }
          )}
      </section>
      <section className='turns'>
        <TurnsSquares isSelected={turn === Turns.x} symbol={Turns.x} />
        <TurnsSquares isSelected={turn === Turns.o} symbol={Turns.o} />
      </section>
      <figure className={winner ? "winner" : "no-winner"}>{`The winner is ${winner}`}</figure>
    </main>
  )
}

export default App
