import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Box,
  Button,
  ButtonText,
  Image,
  ImageBackground,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import React, { useContext, useEffect, useState } from 'react';
import { FilesResponse } from '../../types/filesProps';
import { RouterProps } from '../../types/routerProps';
import { Background, ChatImage } from '../assets/images';
import CardFile from '../components/files/CardFile';
import ModalFileAdd from '../components/files/ModalFileAdd';
import ModalFileDelete from '../components/files/ModalFileDelete';
import Header from '../components/Header';
import { FileContext } from '../context/FileContext';
import { FolderContext } from '../context/FolderContext';
import { UserContext } from '../context/UserContext';
import { useFiles } from '../hooks/files';

const Files = ({ navigation }: RouterProps) => {
  const { user } = useContext(UserContext);
  const { folderSelected, setFolderSelected } = useContext(FolderContext);
  const { files, setFiles, fileSelected, setFileSelected } =
    useContext(FileContext);

  if (!user) {
    return;
  }
  if (!folderSelected) {
    return;
  }
  const {
    data: fileData,
    error,
    isLoading,
  } = useFiles(user.uid, folderSelected?.id);
  useEffect(() => {
    if (fileData) {
      setFiles(fileData);
    }
  }, [fileData, setFiles]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);
  const handleDelete = (file: FilesResponse) => {
    setFileSelected(file);
    setDeleteModal(true);
  };

  return (
    <ImageBackground source={Background} h="100%">
      <Header
        LeftComponent={
          <>
            <Button
              w={30}
              bg="transparent"
              onPress={() => {
                setFolderSelected(null);
                navigation.navigate('Pastas');
              }}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={30}
                style={{ color: '#8a2be2' }}
              />
            </Button>
            <Text
              fontSize={27}
              fontWeight="bold"
              fontFamily="Inter Bold"
              color="#F5F5DC"
              marginRight={5}
              marginLeft={5}
            >
              {folderSelected?.name}
            </Text>
          </>
        }
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          minHeight: '86%',
        }}
      >
        {files?.length === 0 || files === null ? (
          <Text
            fontSize={20}
            fontFamily="Inter Regular"
            color="#F5F5DC"
            marginLeft={5}
          >
            Nenhum arquivo...
          </Text>
        ) : (
          <Box>
            {files.map((file) => {
              return (
                <CardFile
                  key={file.id}
                  file={file}
                  onDelete={() => handleDelete(file)}
                  onUpdate={() => {}}
                />
              );
            })}
          </Box>
        )}

        <Box marginTop={20}>
          <Box
            marginHorizontal={20}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              marginLeft={15}
              w={69}
              h={69}
              alignItems="center"
              borderRadius={100}
              bgColor="#8a2be2"
              onPress={() => setShowAddModal(true)}
            >
              <ButtonText fontSize={40}>+</ButtonText>
            </Button>

            <Button
              bgColor="transparent"
              h={90}
              onPress={() => navigation.navigate('Chat')}
            >
              <Image source={ChatImage} h={100} w={90} alt="Logo Pequena" />
            </Button>
          </Box>
        </Box>
      </ScrollView>
      <ModalFileAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        folder={folderSelected}
      />
      {fileSelected ? (
        <ModalFileDelete
          isOpen={showDeleteModal}
          onClose={() => setDeleteModal(false)}
          file={fileSelected}
        />
      ) : (
        <></>
      )}
    </ImageBackground>
  );
};

export default Files;
