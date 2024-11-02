import { faBook, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
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
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, { useContext, useState } from 'react';
import { CourseRequest } from '../../../types/coursesProps';
import { UserContext } from '../../context/UserContext';
import { useCreateCourse } from '../../hooks/courses';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalCourseAdd = ({ isOpen, onClose }: ModalProps) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Text>Algo deu errado!</Text>;
  }
  const { mutate: createCourseMutate } = useCreateCourse();
  const [name, setName] = useState<string>('');
  const [dayWeek, setDayWeek] = useState<string>('');
  const handleCreateCourse = () => {
    if (name != '' && dayWeek != '') {
      const newCourse: CourseRequest = {
        name: name,
        day_week: dayWeek,
        folders: [],
        reminders: [],
        number_folder: 0,
        number_reminder: 0,
        user_uid: user.uid,
      };
      createCourseMutate(newCourse);
      setName('');
      setDayWeek('');
      onClose();
    }
    // const newCourse: CourseRequest = {
    //   name: 'Novo Curso',
    //   day_week: 'Segunda-feira',
    //   folders: [],
    //   reminders: [],
    //   number_folder: 0,
    //   number_reminder: 0,
    //   user_uid: user.uid,
    // };
    // createCourseMutate(newCourse);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bgColor="#F5F5DC" w="90%" borderWidth={5} borderRadius={15}>
        <ModalHeader marginVertical={25} flexDirection="column">
          <Box flexDirection="row" justifyContent="space-between" w="100%">
            <Box flexDirection="row" alignItems="flex-end">
              <Text fontSize={26} fontFamily="Inter Bold" color="#212121">
                Nova Matéria
              </Text>
              <Box marginBottom={9}>
                <FontAwesomeIcon
                  icon={faBook}
                  size={30}
                  style={{ color: '#8a2be2' }}
                />
              </Box>
            </Box>
            <Button bg="transparent" onPress={onClose}>
              <ButtonText fontSize={21} color="#212121">
                X
              </ButtonText>
            </Button>
          </Box>
          <Center h={2} w="70%" bgColor="#8a2be2" marginTop={20} />
        </ModalHeader>
        <ModalBody>
          <VStack marginBottom={25}>
            <Text fontSize={20} fontFamily="Inter Regular" color="#212121">
              Nome da Matéria
            </Text>
            <Input bgColor="#EFE3FB" h={50} padding={10} borderColor="#8a2be2">
              <InputField
                paddingLeft={8}
                type="text"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Digite o nome da matéria"
                fontFamily="Inter Regular"
                color="#8a2be2"
                placeholderTextColor="#8a2be2"
              />
            </Input>
          </VStack>
          <VStack>
            <Text fontSize={20} fontFamily="Inter Regular" color="#212121">
              Dia da semana
            </Text>
            <Select onValueChange={(text) => setDayWeek(text)}>
              <SelectTrigger borderColor="#8a2be2" h={50} bgColor="#EFE3FB">
                <SelectInput
                  fontFamily="Inter Regular"
                  value={dayWeek}
                  placeholder="Selecione um Dia"
                  color="#8a2be2"
                  placeholderTextColor="#8a2be2"
                />
                <SelectIcon marginRight={10}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ color: '#8a2be2' }}
                  />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Segunda-Feira" value="Segunda-Feira" />
                  <SelectItem label="Terça-Feira" value="Terça-Feira" />
                  <SelectItem label="Quarta-Feira" value="Quarta-Feira" />
                  <SelectItem label="Quinta-Feira" value="Quinta-Feira" />
                  <SelectItem label="Sexta-Feira" value="Sexta-Feira" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>
        </ModalBody>
        <ModalFooter marginVertical={20}>
          <Button size="md" bgColor="#212121" onPress={handleCreateCourse}>
            <ButtonText>Criar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalCourseAdd;
