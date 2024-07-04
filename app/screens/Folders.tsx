import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Box,
  Button,
  ButtonText,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { RouterProps } from '../../types/routerProps';
import CardGeneral from '../components/CardGeneral';
import Header from '../components/Header';

const Folders = ({ navigation }: RouterProps) => {
  let userUid = FIREBASE_AUTH.currentUser?.uid;
  console.log(userUid);
  return (
    <Box bgColor="#284060" h="100%">
      <Header
        LeftComponent={
          <>
            <Button w={30} bgColor="transparent">
              <FontAwesomeIcon
                icon={faArrowLeft}
                size={30}
                style={{ color: '#8a2be2' }}
              />
            </Button>

            <Text
              fontSize={21}
              fontWeight="bold"
              color="#212121"
              marginRight={2}
            >
              Pastas
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
          mainTitle="Trabalhos G1"
          secondaryTitle="Matemática"
          numberFiles={2}
          numberTodo={1}
          mode="folder"
          onPress={() => navigation.navigate('Pastas')}
        />
        <Box
          paddingBottom={30}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button w={69} h={66} borderRadius={100} bgColor="#8a2be2">
            <ButtonText fontSize={34}>+</ButtonText>
          </Button>
          <Button w={69} h={66} borderRadius={100} bgColor="#8a2be2">
            <ButtonText fontSize={34}>c</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Folders;
