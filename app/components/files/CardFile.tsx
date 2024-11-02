import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { Linking } from 'react-native';
import { FilesResponse } from '../../../types/filesProps';

interface CardProps {
  file: FilesResponse;
  onDelete: () => void;
  onUpdate: () => void;
}

const CardGeneral = ({ file, onDelete, onUpdate }: CardProps) => {
  const openLink = async () => {
    if (file.link == null) {
      return;
    }
    const supported = await Linking.canOpenURL(file.link);

    if (supported) {
      await Linking.openURL(file.link);
    } else {
      console.log('Não é possível abrir o URL: ' + file.link);
    }
  };
  return (
    <Box bg="#F5F5DC" borderRadius={13} marginTop={25} paddingBottom={20}>
      <Box>
        <Button w={50} bg="transparent">
          <ButtonText color="#212121" onPress={() => onDelete()}>
            X
          </ButtonText>
        </Button>
      </Box>
      <Box flexDirection="column" marginLeft={50}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Box w={165}>
              <Text fontSize={26} fontFamily="Inter Bold" color="#212121">
                {file.name}
              </Text>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center" w={165}>
              <Text
                marginLeft={4}
                fontSize={18}
                fontFamily="Inter Regular"
                color="#212121"
              >
                {file.type}
              </Text>
            </Box>
          </Box>
          <Button w={150} bg="transparent" onPress={openLink}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} size={35} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default CardGeneral;
