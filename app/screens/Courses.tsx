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
import { CourseResponse } from '../../types/coursesProps';
import { RouterProps } from '../../types/routerProps';
import { Background, ChatImage } from '../assets/images';
import CardGeneral from '../components/courses/CardGeneral';
import ModalCourseAdd from '../components/courses/ModalCourseAdd';
import ModalCourseDelete from '../components/courses/ModalCourseDelete';
import ModalCourseUpdate from '../components/courses/ModalCourseUpdate';
import Header from '../components/Header';
import { CourseContext } from '../context/CourseContext';
import { UserContext } from '../context/UserContext';
import { useCourses } from '../hooks/courses';
const Courses = ({ navigation }: RouterProps) => {
  const { user } = useContext(UserContext);
  const { courses, setCourses, setCourseSelected, courseSelected } =
    useContext(CourseContext);
  if (!user) {
    return;
  }
  const { data: coursesData, error, isLoading } = useCourses(user.uid);
  useEffect(() => {
    if (coursesData) {
      setCourses(coursesData);
    }
  }, [coursesData, setCourses]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);
  const handleDelete = (course: CourseResponse) => {
    setCourseSelected(course);
    setDeleteModal(true);
  };
  const handleUpdate = (course: CourseResponse) => {
    setCourseSelected(course);
    setUpdateModal(true);
  };
  return (
    <ImageBackground source={Background} h="100%">
      <Header
        LeftComponent={
          <>
            <Text
              fontSize={27}
              fontWeight="bold"
              fontFamily="Inter Bold"
              color="#F5F5DC"
              marginRight={5}
            >
              Matérias
            </Text>
            <FontAwesomeIcon
              icon={faBook}
              size={30}
              style={{ color: '#8a2be2' }}
            />
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
        {courses?.length === 0 || courses === null ? (
          <Text
            fontSize={20}
            fontFamily="Inter Regular"
            color="#F5F5DC"
            marginLeft={5}
          >
            Nenhuma matéria...
          </Text>
        ) : (
          <Box>
            {courses.map((course) => {
              return (
                <CardGeneral
                  key={course.id}
                  mainTitle={course.name}
                  secondaryTitle={course.day_week}
                  numberFolders={course.number_folder}
                  numberReminders={course.number_reminder}
                  onPress={() => {
                    navigation.navigate('Pastas');
                    setCourseSelected(course);
                  }}
                  onDelete={() => handleDelete(course)}
                  onUpdate={() => handleUpdate(course)}
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

      <ModalCourseAdd
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      {courseSelected ? (
        <ModalCourseDelete
          isOpen={showDeleteModal}
          onClose={() => setDeleteModal(false)}
          course={courseSelected}
        />
      ) : (
        <></>
      )}

      {courseSelected ? (
        <ModalCourseUpdate
          isOpen={showUpdateModal}
          onClose={() => setUpdateModal(false)}
          course={courseSelected}
        />
      ) : (
        <></>
      )}
    </ImageBackground>
  );
};

export default Courses;
