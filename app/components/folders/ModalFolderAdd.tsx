import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
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
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, { useContext, useState } from 'react';
import { CourseResponse } from '../../../types/coursesProps';
import { FolderRequest } from '../../../types/foldersProp';
import { UserContext } from '../../context/UserContext';
import { useCreateFolder } from '../../hooks/folders';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseResponse;
}
const ModalFolderAdd = ({ isOpen, onClose, course }: ModalProps) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return;
  }
  if (course == null) {
    return;
  }
  const { mutate: createFolderMutate } = useCreateFolder();
  const [name, setName] = useState<string>('');
  const handleCreateFolder = () => {
    if (name != '') {
      const newFolder: FolderRequest = {
        name: name,
        course_id: course.id,
        course_name: course.name,
        files: [],
        todo: [],
        number_file: 0,
        number_todo: 0,
        user_uid: user.uid,
      };
      createFolderMutate(newFolder);
      setName('');
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bgColor="white" w="90%" borderRadius={15}>
        <ModalHeader marginVertical={25} flexDirection="column">
          <Box flexDirection="row" justifyContent="space-between" w="100%">
            <Box flexDirection="row" w={150} alignItems="flex-end">
              <Text fontSize={26} fontFamily="Inter Bold" color="#212121">
                Nova Pasta
              </Text>
              <Box marginLeft={5} marginBottom={9}>
                <FontAwesomeIcon
                  icon={faFolderOpen}
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
              Nome da Pasta
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
        </ModalBody>
        <ModalFooter marginVertical={20}>
          <Button size="md" bgColor="#212121" onPress={handleCreateFolder}>
            <ButtonText>Criar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalFolderAdd;
