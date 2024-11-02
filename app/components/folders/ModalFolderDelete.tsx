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
import React, { useContext } from 'react';
import { FolderResponse } from '../../../types/foldersProp';
import { UserContext } from '../../context/UserContext';
import { useDeleteFolder } from '../../hooks/folders';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder: FolderResponse;
}
const ModalFolderDelete = ({ isOpen, onClose, folder }: ModalProps) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return;
  }
  if (folder === null) {
    return;
  }
  const { mutate: deleteFolderMutate } = useDeleteFolder();
  const handleDeleteFolder = (
    userUid: string,
    courseId: string,
    folderId: string
  ) => {
    deleteFolderMutate({ userUid, courseId, folderId });
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
                Confirme a exclusão da pasta {folder.name}.
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
                handleDeleteFolder(folder.user_uid, folder.course_id, folder.id)
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
export default ModalFolderDelete;
