import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';

interface CardProps {
  mainTitle: string;
  secondaryTitle: string;
  mode: 'course' | 'folder';
  numberFolders?: number;
  numberFiles?: number;
  numberReminders?: number;
  numberTodo?: number;
  onPress: () => void;
}

const CardGeneral = ({
  mainTitle,
  secondaryTitle,
  mode,
  numberFiles,
  numberReminders,
  numberTodo,
  numberFolders,
  onPress,
}: CardProps) => {
  return (
    <Box bg="#F5F5DC" marginTop={25} marginBottom={15} borderRadius={13}>
      <Box position="relative" bottom={14} left={5}>
        <FontAwesomeIcon
          icon={faBookmark}
          size={43}
          style={{ color: '#8a2be2' }}
        />
      </Box>

      <Box
        flexDirection="row"
        marginRight={43}
        justifyContent="space-between"
        marginBottom={10}
      >
        <Box marginLeft={43}>
          <Text fontSize={28} fontFamily="Inter Bold" color="#212121">
            {mainTitle}
          </Text>
          <Box display="flex" flexDirection="row" alignItems="center">
            {mode === 'course' ? (
              <FontAwesomeIcon
                icon={faClock}
                size={20}
                style={{ color: '#212121' }}
              />
            ) : (
              <></>
            )}

            <Text
              marginLeft={4}
              fontSize={20}
              fontFamily="Inter Regular"
              color="#212121"
            >
              {secondaryTitle}
            </Text>
          </Box>
        </Box>

        <Box>
          <Button
            bgColor="transparent"
            position="relative"
            bottom={30}
            left="55%"
            onPress={() => onPress()}
          >
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              size={35}
              style={{ color: '#212121' }}
            />
          </Button>
          <Box>
            {mode === 'course' ? (
              <Box marginLeft={35} marginTop={20}>
                <Text fontSize={18} color="#212121" fontFamily="Inter Regular">
                  {numberFolders} pastas
                </Text>
                <Text fontSize={18} color="#8a2be2" fontFamily="Inter Regular">
                  {numberReminders} lembretes
                </Text>
              </Box>
            ) : (
              <Box marginLeft={35} marginTop={20}>
                <Text fontSize={18} color="#212121" fontFamily="Inter Regular">
                  {numberFiles} arquivos
                </Text>
                <Text fontSize={18} color="#8a2be2" fontFamily="Inter Regular">
                  {numberTodo} listas
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        flexDirection="row"
        bg="#F5F5DC"
        borderBottomRightRadius={13}
        borderBottomLeftRadius={13}
      >
        <Button
          w="50%"
          bgColor="black"
          borderTopRightRadius={0}
          borderTopLeftRadius={0}
          borderBottomRightRadius={0}
        >
          <ButtonText bgColor="#212121">Excluir</ButtonText>
        </Button>
        <Button
          w="50%"
          bgColor="#8a2be2"
          borderTopRightRadius={0}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
        >
          <ButtonText>Editar</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
export default CardGeneral;
