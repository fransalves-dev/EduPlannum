import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Box,
  Button,
  ButtonText,
  Image,
  ImageBackground,
  Text,
} from '@gluestack-ui/themed';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { ReminderResponse } from '../../types/remindersProps';
import { RouterProps } from '../../types/routerProps';
import { Background, ChatImage } from '../assets/images';
import Header from '../components/Header';
import CardReminder from '../components/reminders/CardReminder';
import ModalReminderAdd from '../components/reminders/ModalReminderAdd';
import ModalReminderDelete from '../components/reminders/ModalReminderDelete';
import { CourseContext } from '../context/CourseContext';
import { ReminderContext } from '../context/ReminderContext';
import { UserContext } from '../context/UserContext';
import { useReminders } from '../hooks/reminders';
const Reminders = ({ navigation }: RouterProps) => {
  const { user } = useContext(UserContext);
  const { reminders, setReminders, reminderSelected, setReminderSelected } =
    useContext(ReminderContext);
  const { courseSelected, setCourseSelected } = useContext(CourseContext);

  if (!user) {
    return;
  }
  if (courseSelected === null) {
    return;
  }
  const {
    data: remindersData,
    error,
    isLoading,
  } = useReminders(user.uid, courseSelected.id);
  useEffect(() => {
    if (remindersData) {
      setReminders(remindersData);
    }
  }, [remindersData, setReminders]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const handleDelete = (reminder: ReminderResponse) => {
    setReminderSelected(reminder);
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
                navigation.navigate('Pastas');
              }}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={30}
                style={{ color: '#8a2be2' }}
              />
            </Button>
            <Box w={150} flexDirection="row" alignItems="flex-end">
              <Text
                fontSize={27}
                fontWeight="bold"
                fontFamily="Inter Bold"
                color="#F5F5DC"
                marginRight={5}
              >
                Lembretes de {courseSelected.name}
              </Text>
              <FontAwesomeIcon
                icon={faBook}
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
          minHeight: '86%',
        }}
      >
        {reminders?.length === 0 || reminders === null ? (
          <Text
            fontSize={20}
            fontFamily="Inter Regular"
            color="#F5F5DC"
            marginLeft={5}
          >
            Nenhum lembrete...
          </Text>
        ) : (
          <Box>
            {reminders.map((reminder) => {
              return (
                <CardReminder
                  key={reminder.id}
                  reminder={reminder}
                  onPress={() => {
                    navigation.navigate('Pastas');
                  }}
                  onDelete={() => handleDelete(reminder)}
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
      <ModalReminderAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        course={courseSelected}
      />
      {reminderSelected ? (
        <ModalReminderDelete
          isOpen={showDeleteModal}
          onClose={() => setDeleteModal(false)}
          reminder={reminderSelected}
        />
      ) : (
        <></>
      )}
    </ImageBackground>
  );
};

export default Reminders;
