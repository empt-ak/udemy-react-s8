import {useRef, useState} from 'react'

const Player = () => {
  const playerName = useRef<HTMLInputElement>(null)
  // cannot be ('') as it evaluates to true so h2 fails
  const [name, setName] = useState<string | null>(null)


  const handleClick = () => {
    setName(playerName.current!.value)
  }

  return (
    <section id="player">
      <h2>Welcome {name ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  )
}


export default Player
