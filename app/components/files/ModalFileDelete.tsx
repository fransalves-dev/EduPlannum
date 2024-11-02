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
import { FilesResponse } from '../../../types/filesProps';
import { useDeleteFile } from '../../hooks/files';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: FilesResponse;
}
const ModalFileDelete = ({ isOpen, onClose, file }: ModalProps) => {
  if (file === null) {
    return <></>;
  }
  const { mutate: deleteFileMutate } = useDeleteFile();
  const handleDeleteFile = (
    userUid: string,
    fileId: string,
    folderId: string
  ) => {
    deleteFileMutate({ userUid, fileId, folderId });
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
                Confirme a exclusão do arquivo {file.name}.
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
                handleDeleteFile(file.user_uid, file.id, file.folder_id)
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
export default ModalFileDelete;
