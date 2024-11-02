import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { HStack, Toast, ToastTitle } from '@gluestack-ui/themed';
import React from 'react';
const ToastCreateSucess = () => {
  return (
    <Toast action="success" variant="solid" w="100%" bgColor="green">
      <HStack>
        <ToastTitle color="white" fontSize={14}>
          Sucesso
        </ToastTitle>
        <FontAwesomeIcon icon={faCheck} style={{ color: 'white' }} />
      </HStack>
    </Toast>
  );
};

export default ToastCreateSucess;
