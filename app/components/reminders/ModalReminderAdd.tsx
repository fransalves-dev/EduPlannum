import {
  Box,
  Button,
  ButtonText,
  Center,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, { useContext, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CourseResponse } from '../../../types/coursesProps';
import { ReminderRequest } from '../../../types/remindersProps';
import { UserContext } from '../../context/UserContext';
import { useCreateReminder } from '../../hooks/reminders';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseResponse;
}
const ModalReminderAdd = ({ isOpen, onClose, course }: ModalProps) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return;
  }
  if (course === null) {
    return;
  }
  const { mutate: createReminderMutate } = useCreateReminder();
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
    showTimePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time: Date) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const handleCreateReminder = () => {
    if (name != '' && message != '' && selectedDate && selectedTime) {
      const combinedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        selectedTime.getSeconds()
      );
      const newReminder: ReminderRequest = {
        name: name,
        course_id: course.id,
        course_name: course.name,
        folder_id: 'bR4sIFOGgbvMmstpH10Z',
        folder_name: 'TrabalhosG2',
        file_id: 'T037CGGcFeSx5eaqIL8M',
        file_name: 'Trabalho',
        timeReminder: combinedDateTime,
        message: message,
        user_uid: user.uid,
      };
      createReminderMutate(newReminder);
      setName('');
      setMessage('');
      setSelectedDate(null);
      setSelectedTime(null);
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bgColor="#F5F5DC" w="90%" borderRadius={15}>
        <ModalHeader
          marginVertical={25}
          flexDirection="column"
          marginHorizontal={5}
        >
          <Box flexDirection="row" justifyContent="space-between" w="100%">
            <Box flexDirection="row" alignItems="center">
              <Text fontSize={26} fontFamily="Inter Bold" color="#212121">
                Novo Lembrete
              </Text>
            </Box>
            <Button bg="transparent" onPress={onClose}>
              <ButtonText fontSize={24} color="#212121">
                X
              </ButtonText>
            </Button>
          </Box>
          <Center h={2} w="70%" bgColor="#8a2be2" marginTop={20} />
        </ModalHeader>
        <ModalBody>
          <VStack marginBottom={25}>
            <Text fontSize={20} fontFamily="Inter Regular" color="#212121">
              Nome do lembrete
            </Text>
            <Input bgColor="#EFE3FB" h={50} padding={10} borderColor="#8a2be2">
              <InputField
                paddingLeft={8}
                type="text"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Digite o nome do arquivo"
                fontFamily="Inter Regular"
                color="#8a2be2"
                placeholderTextColor="#8a2be2"
              />
            </Input>
          </VStack>
          <VStack marginBottom={25}>
            <Text fontSize={20} fontFamily="Inter Regular" color="#212121">
              Mensagem
            </Text>
            <Input bgColor="#EFE3FB" h={50} padding={10} borderColor="#8a2be2">
              <InputField
                paddingLeft={8}
                type="text"
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder="Digite a mensagem"
                fontFamily="Inter Regular"
                color="#8a2be2"
                placeholderTextColor="#8a2be2"
              />
            </Input>
          </VStack>
          <VStack>
            <Button onPress={showDatePicker} bgColor="#8a2be2">
              <Text color="white">Escolha data e hora</Text>
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
            />
          </VStack>
        </ModalBody>
        <ModalFooter marginVertical={20}>
          <Button size="md" bgColor="#212121" onPress={handleCreateReminder}>
            <ButtonText>Criar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalReminderAdd;
