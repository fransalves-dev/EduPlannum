import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { format } from 'date-fns';
import { ReminderResponse } from '../../../types/remindersProps';

interface CardProps {
  reminder: ReminderResponse;
  onPress: () => void;
  onDelete: () => void;
}

const CardReminder = ({ reminder, onPress, onDelete }: CardProps) => {
  const formattedDate = format(reminder.timeReminder, 'yyyy-MM-dd HH:mm:ss');
  return (
    <Box bg="#F5F5DC" borderRadius={13} marginTop={20}>
      <Box flexDirection="column" marginLeft={50} marginVertical={20}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Box w={200}>
              <Text fontSize={26} fontFamily="Inter Bold" color="#212121">
                {reminder.name}
              </Text>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center" w={200}>
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
                {formattedDate}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          alignItems="flex-end"
          marginRight={20}
          marginTop={10}
          marginBottom={15}
        >
          <Box>
            <Text fontSize={18} color="#8a2be2" fontFamily="Inter Regular">
              {reminder.message}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="row">
        <Button
          w="100%"
          bgColor="#212121"
          borderTopRightRadius={0}
          borderTopLeftRadius={0}
          borderBottomRightRadius={0}
          onPress={() => onDelete()}
        >
          <ButtonText bgColor="#212121">Excluir</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
export default CardReminder;
