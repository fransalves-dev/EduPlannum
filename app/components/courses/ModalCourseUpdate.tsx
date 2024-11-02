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
import React, { useEffect, useState } from 'react';
import { CourseResponse } from '../../../types/coursesProps';
import { useUpdateCourse } from '../../hooks/courses';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseResponse;
}
const ModalCourseUpdate = ({ isOpen, onClose, course }: ModalProps) => {
  if (course === null) {
    return <></>;
  }
  const [name, setName] = useState<string>(course.name);
  const [dayWeek, setDayWeek] = useState<string>(course.day_week);
  useEffect(() => {
    if (course) {
      setName(course.name);
      setDayWeek(course.day_week);
    }
  }, [course]);
  const { mutate: updateCourseMutate } = useUpdateCourse();
  const handleUpdateCourse = (
    userUid: string,
    courseId: string,
    newName: string,
    newDay: string
  ) => {
    if (name != '' && dayWeek != '') {
      updateCourseMutate({ userUid, courseId, newName, newDay });
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bgColor="white" w="90%">
        <ModalHeader
          marginVertical={25}
          flexDirection="column"
          marginHorizontal={5}
        >
          <Box flexDirection="row" justifyContent="space-between" w="100%">
            <Box flexDirection="row" w={120} alignItems="flex-end">
              <Text fontSize={26} fontFamily="Inter Bold" color="#212121">
                Editar Matéria
              </Text>
              <Box marginLeft={5} marginBottom={8}>
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
          <Center h={2} w="80%" bgColor="#8a2be2" marginTop={20} />
        </ModalHeader>
        <ModalBody>
          <VStack marginBottom={25}>
            <Text fontSize={20} fontFamily="Inter Regular" color="#212121">
              Novo nome
            </Text>
            <Input bgColor="#E4E9DD" h={50} padding={10} borderColor="#545454">
              <InputField
                paddingLeft={8}
                type="text"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Digite o nome da matéria"
                fontFamily="Inter Regular"
                color="#284060"
                placeholderTextColor="#284060"
              />
            </Input>
          </VStack>
          <VStack>
            <Text fontSize={20} fontFamily="Inter Regular" color="#212121">
              Dia da semana
            </Text>
            <Select onValueChange={(text) => setDayWeek(text)}>
              <SelectTrigger borderColor="#545454" h={50} bgColor="#E4E9DD">
                <SelectInput
                  value={dayWeek}
                  placeholder="Selecione um Dia"
                  color="#284060"
                  placeholderTextColor="#284060"
                />
                <SelectIcon marginRight={10}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ color: '#284060' }}
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
          <Button
            size="md"
            bgColor="#212121"
            onPress={() =>
              handleUpdateCourse(course.user_uid, course.id, name, dayWeek)
            }
          >
            <ButtonText>Editar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalCourseUpdate;
