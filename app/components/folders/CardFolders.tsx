import { faBookmark, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { FolderResponse } from '../../../types/foldersProp';

interface CardProps {
  folder: FolderResponse;
  onPress: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

const CardFolder = ({ folder, onPress, onDelete, onUpdate }: CardProps) => {
  return (
    <Box bg="#F5F5DC" borderRadius={13} marginTop={25}>
      <Box position="relative" bottom={14} left={5}>
        <FontAwesomeIcon
          icon={faBookmark}
          size={50}
          style={{ color: '#8a2be2' }}
        />
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
                {folder.name}
              </Text>
            </Box>
          </Box>

          <Box flexDirection="column">
            <Button
              bgColor="transparent"
              flexDirection="column"
              onPress={() => onPress()}
              paddingRight={50}
            >
              <FontAwesomeIcon
                icon={faFile}
                size={45}
                style={{ color: '#8a2be2' }}
              />
            </Button>
          </Box>
        </Box>
        <Box
          alignItems="flex-end"
          marginRight={20}
          marginTop={10}
          marginBottom={15}
        >
          <Box>
            <Text fontSize={18} color="#212121" fontFamily="Inter Regular">
              {folder.number_file?.toString()} arquivos
            </Text>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="row">
        <Button
          w="50%"
          bgColor="#212121"
          borderTopRightRadius={0}
          borderTopLeftRadius={0}
          borderBottomRightRadius={0}
          onPress={() => onDelete()}
        >
          <ButtonText bgColor="#212121">Excluir</ButtonText>
        </Button>
        <Button
          w="50%"
          bgColor="#8a2be2"
          borderTopRightRadius={0}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          onPress={() => onUpdate()}
        >
          <ButtonText>Editar</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
export default CardFolder;
