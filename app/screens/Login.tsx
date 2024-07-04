import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  Image,
  ImageBackground,
  Input,
  InputField,
  InputSlot,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { RouterProps } from '../../types/routerProps';

const LoginPage = ({ navigation }: RouterProps) => {
  var Logo = require('../assets/img/Logo_Novo.png');
  var Background = require('../assets/img/Background_Novo.png');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const login = async () => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert('Erro no login: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box bgColor="blue" h="100%">
      <ImageBackground source={Background} h="100%">
        <Center marginTop={30} position="relative" top={40} zIndex={10}>
          <Image source={Logo} h={220} w={250} alt="Logo" />
        </Center>

        <FormControl
          bgColor="#F5F5DC"
          position="relative"
          bottom={40}
          marginHorizontal={26}
          borderRadius={6}
          paddingTop={50}
        >
          <Center marginVertical={30} marginHorizontal={14} flexDirection="row">
            <Text
              textAlign="center"
              fontSize={18}
              color="#212121"
              fontFamily="Inter Semibold"
            >
              Faça seu login e comece a planejar com{' '}
              <Text fontSize={18} fontFamily="Inter Semibold" color="#8a2be2">
                edu.
              </Text>
            </Text>
          </Center>
          <Center>
            <VStack w={320}>
              <VStack space="xs">
                <Text
                  fontSize={18}
                  fontFamily="Inter Regular"
                  color="#8a2be2"
                  marginLeft={25}
                >
                  E-mail
                </Text>
                <Input
                  variant="rounded"
                  bgColor="#E4E9DD"
                  h={48}
                  padding={10}
                  borderColor="#545454"
                >
                  <InputSlot marginLeft={10}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size={20}
                      style={{ color: '#284060' }}
                    />
                  </InputSlot>

                  <InputField
                    paddingLeft={8}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    type="text"
                    placeholder="Digite seu email"
                    fontFamily="Inter Regular"
                    placeholderTextColor="#284060"
                  />
                </Input>
              </VStack>

              <VStack space="xs" marginTop={20}>
                <Text
                  fontSize={18}
                  fontFamily="Inter Regular"
                  color="#8a2be2"
                  marginLeft={25}
                >
                  Senha
                </Text>
                <Input
                  variant="rounded"
                  bgColor="#E4E9DD"
                  h={48}
                  padding={10}
                  borderColor="#545454"
                >
                  <InputSlot marginLeft={10} onPress={handleState}>
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      size={20}
                      style={{ color: '#284060' }}
                    />
                  </InputSlot>
                  <InputField
                    paddingLeft={8}
                    fontFamily="Inter Regular"
                    type={showPassword ? 'text' : 'password'}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#284060"
                  />
                </Input>
                <Center marginTop={37}>
                  <Button w="50%" bgColor="#212121" onPress={() => login()}>
                    {loading ? (
                      <Spinner size="small" />
                    ) : (
                      <ButtonText fontSize={18} fontFamily="Inter Semibold">
                        Entrar
                      </ButtonText>
                    )}
                  </Button>

                  <Box marginTop={37} h={1} w={160} bgColor="#8a2be2"></Box>
                  <Text
                    marginTop={17}
                    fontSize={18}
                    fontFamily="Inter Regular"
                    underline={true}
                    color="#8a2be2"
                  >
                    Não possui conta?{' '}
                    <Text
                      fontSize={18}
                      fontFamily="Inter Regular"
                      underline={false}
                    >
                      Clique abaixo.
                    </Text>
                  </Text>
                  <Button
                    marginTop={20}
                    marginBottom={22}
                    w="50%"
                    variant="outline"
                    borderColor="#8a2be2"
                    onPress={() => navigation.navigate('Cadastro')}
                  >
                    <ButtonText
                      color="#8a2be2"
                      fontSize={18}
                      fontFamily="Inter Semibold"
                    >
                      Criar Conta
                    </ButtonText>
                  </Button>
                </Center>
              </VStack>
            </VStack>
          </Center>
        </FormControl>
      </ImageBackground>
    </Box>
  );
};

export default LoginPage;
