// import React, { ReactNode } from "react";

// interface ModalProps {
//   children: ReactNode;
//   open: boolean;
//   //   onClose: (value: boolean)=>void
// }
// const Modal: React.FC<ModalProps> = ({ children, open }) => {
//   return open ? (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 overflow-hidden ">
//       {children}
//     </div>
//   ) : (
//     <></>
//   );
// };

// export default Modal;

import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, open }) => {
  return open ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 overflow-hidden">
      {/* <div className="bg-white p-6 max-h-[80vh] w-[90%] md:w-auto rounded overflow-y-auto"> */}
        {children}
      {/* </div> */}
    </div>
  ) : null;
};

export default Modal;
