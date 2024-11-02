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
import { CourseResponse } from '../../../types/coursesProps';
import { useDeleteCourse } from '../../hooks/courses';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseResponse;
}
const ModalCourseDelete = ({ isOpen, onClose, course }: ModalProps) => {
  if (course === null) {
    return <></>;
  }
  const { mutate: deleteCourseMutate } = useDeleteCourse();
  const handleDeleteCourse = (userUid: string, courseId: string) => {
    deleteCourseMutate({ userUid, courseId });
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
                Confirme a exclusão da matéria {course.name}.
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
              onPress={() => handleDeleteCourse(course.user_uid, course.id)}
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
