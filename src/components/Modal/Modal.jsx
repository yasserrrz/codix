import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";


const Modal = ({ isOpen, setIsOpen, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 w-full max-w-lg  shadow-lg"
      >
        
        {children}
      </div>
    </div>
  );
};

export default Modal;
