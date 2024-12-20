import {useRef, useState} from 'react'
import Modal, {ModalRef} from './Modal.tsx'

export interface TimerChallengeProps {
  title: string
  targetTime: number
}

export const TimerChallenge = (props: TimerChallengeProps) => {
  const frequency = 20
  const timer = useRef<number>()
  const dialog = useRef<ModalRef>(null)// null is required!
  const [remainingTime, setRemainingTime] = useState(props.targetTime * 1000)
  const active = remainingTime > 0 && remainingTime < props.targetTime * 1000

  if (remainingTime <= 0) {
    clearInterval(timer.current)
    dialog.current?.showModal()
  }

  const handleStart = () => {
    timer.current = setInterval(() => {
      setRemainingTime(old => old - frequency)
    }, frequency)
  }

  const handleStop = () => {
    clearInterval(timer.current)
    dialog.current?.showModal()
  }

  const handleReset = () => {
    setRemainingTime(props.targetTime * 1000)
  }

  return (
    <>
      <Modal ref={dialog} targetTime={props.targetTime} remainingTime={remainingTime} reset={handleReset}/>
      <section className="challenge">
        <h2>{props.title}</h2>
        <p className="challenge-time">
          {props.targetTime} second{props.targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={active ? handleStop : handleStart}>
            {active ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={active ? 'active' : undefined}>
          {active ? 'Time is running' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}


export default TimerChallenge;
