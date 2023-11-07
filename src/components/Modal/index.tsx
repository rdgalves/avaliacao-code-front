import React from 'react';
import './Modal.css';
import Titulo from '../Titulo';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <Titulo>Gerenciar Projetos</Titulo>
          <span className="close" onClick={onClose}>&times;</span>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
