
"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

const MainModal = ({openModal, setOpenModal, children }) => {
 
  return (
    <>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
             {children}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MainModal;