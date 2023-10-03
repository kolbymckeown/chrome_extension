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
          <Button
            color={'scheme.dusty-rose'}
            bg={'scheme.warm-white'}
            onClick={onClose}
            mr={2}
            _hover={{ bg: 'scheme.light-rose' }}
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button color={'scheme.main-green-blue'} onClick={handleConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
