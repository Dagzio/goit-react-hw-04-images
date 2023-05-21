import { useEffect } from 'react';
import { Backdrop, ModalWindow } from './Modal.styled';

const Modal = ({ closeModal, modalImg }) => {
  useEffect(() => {
    window.addEventListener('keydown', handlePressKey);
    return () => {
      window.removeEventListener('keydown', handlePressKey);
    };
  }, []);

  const handlePressKey = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      closeModal();
    }
  };

  return (
    <Backdrop onClick={handleBackdropClick || handlePressKey}>
      <ModalWindow>
        <img src={modalImg} alt="" />
      </ModalWindow>
    </Backdrop>
  );
};
export default Modal;
