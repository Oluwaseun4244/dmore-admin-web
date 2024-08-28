import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  //   onClose: (value: boolean)=>void
}
const Modal: React.FC<ModalProps> = ({ children, open }) => {
  return open ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 overflow-hidden">
      {children}
    </div>
  ) : (
    <></>
  );
};

export default Modal;
