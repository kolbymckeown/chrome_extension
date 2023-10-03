import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
} from '@chakra-ui/react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  callback: () => void;
  title: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  callback,
  title,
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    callback();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display={'flex'} alignItems={'center'}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Are you sure?</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={onClose} mr={2}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
