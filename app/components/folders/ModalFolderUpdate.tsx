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
import React, { useEffect, useState } from 'react';
import { FolderResponse } from '../../../types/foldersProp';
import { useUpdateFolder } from '../../hooks/folders';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder: FolderResponse;
}
const ModalFolderUpdate = ({ isOpen, onClose, folder }: ModalProps) => {
  if (folder === null) {
    return;
  }
  const { mutate: updateFolderMutate } = useUpdateFolder();
  const [name, setName] = useState<string>(folder.name);
  useEffect(() => {
    if (folder) {
      setName(folder.name);
    }
  }, [folder]);
  const handleUpdateFolder = (
    userUid: string,
    folderId: string,
    newName: string
  ) => {
    if (name != '') {
      updateFolderMutate({ userUid, folderId, newName });
      onClose();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent bgColor="white" w="90%" borderRadius={15}>
        <ModalHeader marginVertical={25} flexDirection="column">
          <Box flexDirection="row" justifyContent="space-between" w="100%">
            <Box flexDirection="row" w={180} alignItems="flex-end">
              <Text fontSize={26} fontFamily="Inter Bold" color="#212121">
                Editar Pasta
              </Text>
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
              Novo nome
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
          <Button
            size="md"
            bgColor="#212121"
            onPress={() => handleUpdateFolder(folder.user_uid, folder.id, name)}
          >
            <ButtonText>Editar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalFolderUpdate;
