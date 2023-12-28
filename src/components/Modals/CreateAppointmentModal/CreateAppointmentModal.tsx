import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import {
  CreateAppointmentModalProps,
// eslint-disable-next-line max-len
} from '@/components/Modals/CreateAppointmentModal/interfaces/create-appointment-modal-props.interface';

export default function CreateAppointmentModal({
  isOpen,
  onClose,
}: CreateAppointmentModalProps) {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Faça agendamento com um barbeiro</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>test</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
