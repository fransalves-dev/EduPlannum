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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { RouterProps } from '../../types/routerProps';
const SignUpPage = ({ navigation }: RouterProps) => {
  var Logo = require('../assets/img/Logo.png');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('Deu bom' + response);
    } catch (error: any) {
      console.log('Deu erro' + error);
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
          Faça seu cadastro
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
                  placeholder="Digite seu email para cadastro"
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
                  placeholder="Digite uma senha"
                  placeholderTextColor="#545454"
                />
              </Input>
              <Center marginTop={20}>
                {loading ? (
                  <Spinner size="small" />
                ) : (
                  <Button w="50%" bgColor="black" onPress={() => signUp()}>
                    <ButtonText>Cadastrar</ButtonText>
                  </Button>
                )}
                <Button
                  marginTop={20}
                  w="50%"
                  bgColor="black"
                  onPress={() => navigation.navigate('Login')}
                >
                  <ButtonText>Voltar</ButtonText>
                </Button>
              </Center>
            </VStack>
          </VStack>
        </Center>
      </FormControl>
    </Box>
  );
};

export default SignUpPage;
