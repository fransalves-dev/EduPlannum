import { faClock, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';

interface CardProps {
  mainTitle: string;
  secondaryTitle: string;
  numberFolders: number;
  numberReminders: number;
  onPress: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

const CardGeneral = ({
  mainTitle,
  secondaryTitle,
  numberReminders,
  numberFolders,
  onPress,
  onDelete,
  onUpdate,
}: CardProps) => {
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
                {mainTitle}
              </Text>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center" w={165}>
              <FontAwesomeIcon
                icon={faClock}
                size={14}
                style={{ color: '#212121' }}
              />

              <Text
                marginLeft={4}
                fontSize={18}
                fontFamily="Inter Regular"
                color="#212121"
              >
                {secondaryTitle}
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
                icon={faFolderOpen}
                size={45}
                style={{ color: '#212121' }}
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                size={25}
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
              {numberFolders?.toString()} pastas
            </Text>
            <Text fontSize={18} color="#8a2be2" fontFamily="Inter Regular">
              {numberReminders} lembretes
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
export default CardGeneral;
