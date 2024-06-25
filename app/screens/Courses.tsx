import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
const Courses = () => {
  return (
    <Box bgColor="white">
      <Text marginTop={30}>Matérias</Text>
      <Button
        marginTop={20}
        w="50%"
        bgColor="black"
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <ButtonText>Sair</ButtonText>
      </Button>
    </Box>
  );
};

export default Courses;
