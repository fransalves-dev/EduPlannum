import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
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
import { FilesRequest } from '../../../types/filesProps';
import { FolderResponse } from '../../../types/foldersProp';
import { UserContext } from '../../context/UserContext';
import { useCreateFile } from '../../hooks/files';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder: FolderResponse;
}
const ModalFileAdd = ({ isOpen, onClose, folder }: ModalProps) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return;
  }
  if (folder === null) {
    return;
  }
  const { mutate: createFileMutate } = useCreateFile();
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [typeLocation, setTypeLocation] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const handleCreateFile = () => {
    if (name != '' && link != '') {
      const newFile: FilesRequest = {
        name: name,
        folder_id: folder.id,
        folder_name: folder.name,
        type: type,
        typeLocation: typeLocation,
        link: link,
        id_storage: null,
        user_uid: user.uid,
      };
      createFileMutate(newFile);
      setName('');
      setType('');
      setTypeLocation('');
      setLink('');
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
                Novo Arquivo
              </Text>
              <Box>
                <FontAwesomeIcon
                  icon={faFile}
                  size={30}
                  style={{ color: '#8a2be2' }}
                />
              </Box>
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
              Nome do arquivo
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
              Tipo do conteúdo
            </Text>
            <Select onValueChange={(text) => setType(text)}>
              <SelectTrigger borderColor="#8a2be2" h={50} bgColor="#EFE3FB">
                <SelectInput
                  fontFamily="Inter Regular"
                  value={type}
                  placeholder="Selecione o tipo de conteúdo"
                  color="#8a2be2"
                  placeholderTextColor="#8a2be2"
                />
                <SelectIcon marginRight={10}>
                  <FontAwesomeIcon
                    icon={faChevronDown}
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
                  <SelectItem label="Apresentação" value="Apresentação" />
                  <SelectItem label="Documento" value="Documento" />
                  <SelectItem label="Plano de Estudo" value="Plano de Estudo" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>
          <VStack marginBottom={25}>
            <Text fontSize={20} fontFamily="Inter Regular" color="#212121">
              Tipo do arquivo
            </Text>
            <Select onValueChange={(text) => setTypeLocation(text)}>
              <SelectTrigger borderColor="#8a2be2" h={50} bgColor="#EFE3FB">
                <SelectInput
                  fontFamily="Inter Regular"
                  value={typeLocation}
                  placeholder="Selecione como o arquivo será guardado"
                  color="#8a2be2"
                  placeholderTextColor="#8a2be2"
                />
                <SelectIcon marginRight={10}>
                  <FontAwesomeIcon
                    icon={faChevronDown}
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
                  <SelectItem label="Link" value="Link" />
                  <SelectItem
                    label="Exportar arquivo"
                    value="Export"
                    isDisabled={true}
                  />
                </SelectContent>
              </SelectPortal>
            </Select>
          </VStack>
          <VStack marginBottom={25}>
            <Text fontSize={20} fontFamily="Inter Regular" color="#212121">
              Link do arquivo
            </Text>
            <Input bgColor="#EFE3FB" h={50} padding={10} borderColor="#8a2be2">
              <InputField
                paddingLeft={8}
                type="text"
                value={link}
                onChangeText={(text) => setLink(text)}
                placeholder="Digite o nome do arquivo"
                fontFamily="Inter Regular"
                color="#8a2be2"
                placeholderTextColor="#8a2be2"
              />
            </Input>
          </VStack>
        </ModalBody>
        <ModalFooter marginVertical={20}>
          <Button size="md" bgColor="#212121" onPress={handleCreateFile}>
            <ButtonText>Criar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalFileAdd;
