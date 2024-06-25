import {
  Avatar,
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  Image,
  Input,
  InputField,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { RouterProps } from '../../types/routerProps';

const LoginPage = ({ navigation }: RouterProps) => {
  var Logo = require('../assets/img/Logo.png');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

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
    <Box bgColor="white">
      <Center marginTop={30}>
        <Avatar bgColor="white" h={175} w={188}>
          <Image source={Logo} h={170} w={181} alt="Logo" />
        </Avatar>
        <Center bgColor="white" w="90%" position="relative" bottom={40}>
          <Text fontFamily="Inter Semibold" color="#000000" fontSize={24}>
            eduPlannum
          </Text>
        </Center>
      </Center>
      <Center>
        <Text color="#000000" fontSize={18}>
          Faça seu login
        </Text>
      </Center>

      <FormControl bgColor="white" h="100%">
        <Center>
          <VStack w={320}>
            <VStack space="xs">
              <Text
                fontSize={18}
                fontFamily="Inter Semibold"
                color="#000000"
                marginLeft={25}
              >
                Email
              </Text>
              <Input
                variant="rounded"
                bgColor="white"
                h={48}
                padding={10}
                borderColor="#545454"
              >
                <InputField
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  type="text"
                  placeholder="Digite seu email"
                  placeholderTextColor="#545454"
                />
              </Input>
            </VStack>

            <VStack space="xs" marginTop={20}>
              <Text
                fontSize={18}
                fontFamily="Inter Semibold"
                color="#000000"
                marginLeft={25}
              >
                Senha
              </Text>
              <Input
                variant="rounded"
                bgColor="white"
                h={48}
                padding={10}
                borderColor="#545454"
              >
                <InputField
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  type="password"
                  placeholder="Digite sua senha"
                  placeholderTextColor="#545454"
                />
              </Input>
              <Center marginTop={20}>
                {loading ? (
                  <Spinner size="small" />
                ) : (
                  <Button w="50%" bgColor="black" onPress={() => login()}>
                    <ButtonText>Entrar</ButtonText>
                  </Button>
                )}
                <Button
                  marginTop={20}
                  w="50%"
                  bgColor="black"
                  onPress={() => navigation.navigate('Cadastro')}
                >
                  <ButtonText>Cadastro</ButtonText>
                </Button>
              </Center>
            </VStack>
          </VStack>
        </Center>
      </FormControl>
    </Box>
  );
};

export default LoginPage;
