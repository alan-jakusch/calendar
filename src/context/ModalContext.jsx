import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("");

  const openModal = (modalContent, modalTitle) => {
    setContent(modalContent);
    setTitle(modalTitle);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, content, openModal, closeModal, title }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
