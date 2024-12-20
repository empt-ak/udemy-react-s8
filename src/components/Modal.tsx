import {ComponentRef, forwardRef, useImperativeHandle, useRef} from 'react'

export interface ModalProps {
  result: 'won' | 'lost'
  targetTime: number
}


type Handle = {
  showModal: () => void
}

export type ModalRef = ComponentRef<typeof Modal>

// required for react <19
const Modal = forwardRef<Handle, ModalProps>((props, ref) => {
 const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      showModal: () => dialog.current?.showModal()
    }
  })

  return (
    <dialog ref={dialog} className="result-modal">
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
  )
})


export default Modal
