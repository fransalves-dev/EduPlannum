import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Button, Center } from '@gluestack-ui/themed';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface HeaderProps {
  LeftComponent: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ LeftComponent }) => {
  return (
    <Box
      bgColor="#284060"
      paddingHorizontal={25}
      paddingTop={45}
      paddingBottom={20}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Center display="flex" flexDirection="row">
        {LeftComponent}
      </Center>
      <Center>
        <Button
          onPress={() => FIREBASE_AUTH.signOut()}
          bgColor="transparent"
          w={57}
        >
          <FontAwesomeIcon
            icon={faCircleUser}
            size={57}
            style={{ color: '#F5F5DC' }}
          />
        </Button>
      </Center>
    </Box>
  );
};
export default Header;
