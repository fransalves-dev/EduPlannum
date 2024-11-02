import {
  Box,
  Button,
  ButtonText,
  Center,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@gluestack-ui/themed';
import React from 'react';
import { ReminderResponse } from '../../../types/remindersProps';
import { useDeleteReminder } from '../../hooks/reminders';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminder: ReminderResponse;
}
const ModalCourseDelete = ({ isOpen, onClose, reminder }: ModalProps) => {
  if (reminder === null) {
    return <></>;
  }
  const { mutate: deleteReminderMutate } = useDeleteReminder();
  const handleDeleteReminder = (
    userUid: string,
    reminderId: string,
    courseId: string
  ) => {
    deleteReminderMutate({ userUid, reminderId, courseId });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bgColor="#C81919" w="90%">
        <ModalHeader marginVertical={10} flexDirection="column">
          <Box flexDirection="row" justifyContent="space-between" w="100%">
            <Box flexDirection="row" alignItems="flex-end">
              <Text fontSize={26} fontFamily="Inter Bold" color="white">
                Confirme a exclusão do lembrete {reminder.name}
              </Text>
            </Box>
          </Box>
        </ModalHeader>
        <ModalFooter>
          <Center flexDirection="row" w="100%" justifyContent="space-between">
            <Button size="md" bgColor="#212121" onPress={onClose}>
              <ButtonText fontFamily="Inter Regular">Cancelar</ButtonText>
            </Button>
            <Button
              size="md"
              bgColor="white"
              onPress={() =>
                handleDeleteReminder(
                  reminder.user_uid,
                  reminder.id,
                  reminder.course_id
                )
              }
            >
              <ButtonText fontFamily="Inter Regular" color="#212121">
                Confirmar
              </ButtonText>
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalCourseDelete;
