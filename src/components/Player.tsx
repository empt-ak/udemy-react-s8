import {useState} from 'react'

const Player = () => {
  const [name, setName] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  return (
    <section id="player">
      <h2>Welcome {submitted ? name : 'unknown entity'}</h2>
      <p>
        <input type="text" value={name} onChange={(e) => {
          if(name && submitted) {
            setSubmitted(false)
          }
          setName(e.currentTarget.value)
        }}/>
        <button onClick={() => {
          setSubmitted(true)
        }}>Set Name</button>
      </p>
    </section>
  )
}


export default Player
