import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {

  return(
    <>
      <p>{props.text}</p>
      <p>Has {props.votes} votes</p>
    </>
  )
    
}

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const [votes, setVotes] = useState(new Uint8Array(6))

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const handleVoteClick = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  let mostPopular = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleNextClick}>Next Anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <Anecdote text={anecdotes[mostPopular]} votes={votes[mostPopular]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)