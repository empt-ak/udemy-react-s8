import {useRef, useState} from 'react'
import Modal, {Ref} from './Modal.tsx'

export interface TimerChallengeProps {
  title: string
  targetTime: number
}

export const TimerChallenge = (props: TimerChallengeProps) => {
  const timer = useRef<number>()
  const dialog = useRef<Ref>(null)// null is required!
  const [expired, setExpired] = useState<boolean>(false)
  const [running, setRunning] = useState<boolean>(false)


  const handleStart = () => {
    timer.current = setTimeout(() => {
      setExpired(true)
      dialog.current?.showModal()
    }, props.targetTime * 1000)

    setRunning(true)
  }

  const handleStop = () => {
    clearTimeout(timer.current)
  }

  return (
    <>
      <Modal ref={dialog} result={'lost'} targetTime={props.targetTime} />
      <section className="challenge">
        <h2>{props.title}</h2>
        <p className="challenge-time">
          {props.targetTime} second{props.targetTime > 1 ? 's' : ''}
        </p>
        {expired && <p>You lost!</p>}
        <p>
          <button onClick={running ? handleStop : handleStart}>
            {running ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={running ? 'active' : undefined}>
          {running ? 'Time is running' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}


export default TimerChallenge;
