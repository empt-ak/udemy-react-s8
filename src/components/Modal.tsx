import {forwardRef} from 'react'

export interface ModalProps {
  result: 'won' | 'lost'
  targetTime: number
}

export type Ref = HTMLDialogElement

// required for react <19
const Modal = forwardRef<Ref, ModalProps>((props, ref) => (
  <dialog ref={ref} className="result-modal">
    <h2>You {props.result}</h2>
    <p>
      The targetTime was <strong>{props.targetTime}</strong> seconds
    </p>
    <p>
      You stopped the timer with <strong>X seconds left</strong>
    </p>
    <form method="dialog">
      <button>Close</button>
    </form>
  </dialog>
))


export default Modal
