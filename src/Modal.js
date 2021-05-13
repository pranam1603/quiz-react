import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { closeModal, correct, questions, isModalOpen } = useGlobalContext()
  return (
    <div
      className={`${isModalOpen ? 'modal-container isOpen' : 'modal-container'
        }`}
    >
      <div className="modal-content">
        <h2>Congrats</h2>
        <p>
          you answered {((correct / questions.length) * 100).toFixed(0)}% of questions correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  )
}

export default Modal
