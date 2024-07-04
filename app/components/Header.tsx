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
      bg="#F5F5DC"
      paddingHorizontal={20}
      paddingTop={45}
      paddingBottom={10}
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
          w={40}
        >
          <FontAwesomeIcon
            icon={faCircleUser}
            size={40}
            style={{ color: '#8a2be2' }}
          />
        </Button>
      </Center>
    </Box>
  );
};
export default Header;
