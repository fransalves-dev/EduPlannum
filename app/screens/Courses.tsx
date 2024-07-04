import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Box,
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { CourseObjectResponse } from '../../types/coursesProps';
import { RouterProps } from '../../types/routerProps';
import CardGeneral from '../components/CardGeneral';
import Header from '../components/Header';
import { fetchCourses } from '../services/courses-api';

const Courses = ({ navigation }: RouterProps) => {
  let userUid = FIREBASE_AUTH.currentUser?.uid;

  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const queryClient = useQueryClient();
  const [courses, setCourses] = useState<CourseObjectResponse>(
    [] as unknown as CourseObjectResponse
  );
  if (userUid === undefined) {
    return <Text>Tivemos um erro</Text>;
  }

  const {
    data: coursesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses', userUid],
    queryFn: () => fetchCourses(userUid),
  });
  useEffect(() => {
    if (coursesData) {
      setCourses(coursesData);
      console.log(courses);
    }
  }, [coursesData]);
  console.log(coursesData);

  return (
    <Box bgColor="#284060" h="100%">
      <Header
        LeftComponent={
          <>
            <Text
              fontSize={21}
              fontWeight="bold"
              color="#212121"
              marginRight={2}
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
      <ScrollView paddingHorizontal={20}>
        <CardGeneral
          mainTitle="Matemática"
          secondaryTitle="Segunda-Feira"
          numberFolders={4}
          numberReminders={2}
          mode="course"
          onPress={() => navigation.navigate('Pastas')}
        />

        <Box
          paddingBottom={30}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button
            w={69}
            h={66}
            borderRadius={100}
            bgColor="#8a2be2"
            onPress={() => setShowModal(true)}
            ref={ref}
          >
            <ButtonText fontSize={34}>+</ButtonText>
          </Button>
          <Button w={69} h={66} borderRadius={100} bgColor="#8a2be2">
            <ButtonText fontSize={34}>c</ButtonText>
          </Button>
        </Box>
      </ScrollView>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Engage with Modals</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>
              Elevate user interactions with our versatile modals. Seamlessly
              integrate notifications, forms, and media displays. Make an impact
              effortlessly.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Explore</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Courses;
