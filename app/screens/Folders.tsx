import { faBell, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
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
import { FolderResponse } from '../../types/foldersProp';
import { RouterProps } from '../../types/routerProps';
import { Background, ChatImage } from '../assets/images';
import CardFolder from '../components/folders/CardFolders';
import ModalFolderAdd from '../components/folders/ModalFolderAdd';
import ModalFolderDelete from '../components/folders/ModalFolderDelete';
import ModalFolderUpdate from '../components/folders/ModalFolderUpdate';
import Header from '../components/Header';
import { CourseContext } from '../context/CourseContext';
import { FolderContext } from '../context/FolderContext';
import { UserContext } from '../context/UserContext';
import { useFolders } from '../hooks/folders';

const Folders = ({ navigation }: RouterProps) => {
  const { user } = useContext(UserContext);
  const { courseSelected, setCourseSelected } = useContext(CourseContext);
  const { folders, setFolders, folderSelected, setFolderSelected } =
    useContext(FolderContext);

  if (!user) {
    return;
  }
  if (!courseSelected) {
    return;
  }
  const {
    data: folderData,
    error,
    isLoading,
  } = useFolders(user.uid, courseSelected?.id);
  useEffect(() => {
    if (folderData) {
      setFolders(folderData);
    }
  }, [folderData, setFolders]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);
  const handleDelete = (folder: FolderResponse) => {
    setFolderSelected(folder);
    setDeleteModal(true);
  };
  const handleUpdate = (folder: FolderResponse) => {
    setFolderSelected(folder);
    setUpdateModal(true);
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
                setCourseSelected(null);
                navigation.navigate('Matérias');
              }}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={30}
                style={{ color: '#8a2be2' }}
              />
            </Button>
            <Box w={200} flexDirection="row" alignItems="flex-end">
              <Text
                fontSize={27}
                fontWeight="bold"
                fontFamily="Inter Bold"
                color="#F5F5DC"
              >
                Pastas de {courseSelected.name}
              </Text>
              <FontAwesomeIcon
                icon={faFolderOpen}
                size={30}
                style={{ color: '#8a2be2' }}
              />
            </Box>
          </>
        }
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          minHeight: '84%',
        }}
      >
        {folders?.length === 0 || folders === null ? (
          <Text
            fontSize={20}
            fontFamily="Inter Regular"
            color="#F5F5DC"
            marginLeft={5}
          >
            Nenhuma pasta...
          </Text>
        ) : (
          <Box>
            {folders.map((folder) => {
              return (
                <CardFolder
                  key={folder.id}
                  folder={folder}
                  onPress={() => {
                    navigation.navigate('Arquivos');
                    setFolderSelected(folder);
                  }}
                  onDelete={() => handleDelete(folder)}
                  onUpdate={() => handleUpdate(folder)}
                />
              );
            })}
          </Box>
        )}
        <Button h={50} bgColor="#8a2be2">
          <ButtonText
            fontSize={22}
            fontWeight="bold"
            fontFamily="Inter Bold"
            color="white"
            marginRight={5}
            onPress={() => navigation.navigate('Lembretes')}
          >
            Lembretes
          </ButtonText>
          <FontAwesomeIcon icon={faBell} size={22} style={{ color: 'white' }} />
        </Button>

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

      <ModalFolderAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        course={courseSelected}
      />
      {folderSelected ? (
        <ModalFolderDelete
          isOpen={showDeleteModal}
          onClose={() => setDeleteModal(false)}
          folder={folderSelected}
        />
      ) : (
        <></>
      )}

      {folderSelected ? (
        <ModalFolderUpdate
          isOpen={showUpdateModal}
          onClose={() => setUpdateModal(false)}
          folder={folderSelected}
        />
      ) : (
        <></>
      )}
    </ImageBackground>
  );
};

export default Folders;
