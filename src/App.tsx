import mgoLogo from '/mgo.svg'

const Turns = {
  x: "X",
  o: "O"
}

const board = Array(9).fill(null)

function App() {
  return (

    <main className='game'>
      <section className='header'>
        <img src={mgoLogo} alt="MauGarOla logo" className='personalLogo'/>
        <h1 className='title'>Tic-Tac-Toe!<br/><strong>Extreme</strong></h1>
      </section>
      <section className='board'>
          {board.map((_, index) => (
            <figure className='square'>
              <span className='symbol'>{index + 1}</span>
            </figure>
          )
            
          )}
      </section>
    </main>
  )
}

export default App
