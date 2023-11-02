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
            bg={'scheme.dusty-rose'}
            onClick={onClose}
            mr={2}
            variant={'outline'}
            color="white"
            borderColor="scheme.dusty-rose"
            borderWidth={1}
            _hover={{
              bg: 'white',
              borderColor: 'scheme.dusty-rose',
              color: 'scheme.dusty-rose',
              boxShadow: '3px 3px #4c8d99',
            }}
            boxShadow="3px 3px pink"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="scheme.dusty-rose"
            borderColor="scheme.dusty-rose"
            borderWidth={1}
            bg="white"
            _hover={{
              bg: 'scheme.dusty-rose',
              color: 'white',
              boxShadow: '3px 3px #4c8d99',
            }}
            boxShadow="3px 3px pink"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
