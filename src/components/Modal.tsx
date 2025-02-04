import {ComponentRef, forwardRef, useImperativeHandle, useRef} from 'react'
import {createPortal} from 'react-dom'

export interface ModalProps {
  targetTime: number
  remainingTime: number
  reset: () => void
}


type Handle = {
  showModal: () => void
}

export type ModalRef = ComponentRef<typeof Modal>

// required for react <19
const Modal = forwardRef<Handle, ModalProps>((props, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const userLost = props.remainingTime <= 0
  const formattedTime = (props.remainingTime / 1000).toFixed(2)
  const score = Math.round((1 - (props.remainingTime / (props.targetTime * 1000))) * 100)

    useImperativeHandle(ref, () => {
    return {
      showModal: () => dialog.current?.showModal()
    }
  })

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score {score}</h2>}
      <p>
        The targetTime was <strong>{props.targetTime}</strong> seconds
      </p>
      <p>
        You stopped the timer with <strong>{formattedTime} seconds left</strong>
      </p>
      <form method="dialog">
        <button onClick={props.reset}>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')!
  )
})


export default Modal
