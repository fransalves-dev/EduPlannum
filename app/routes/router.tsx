import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { UserContext } from '../context/UserContext';
import Chat from '../screens/Chat';
import Courses from '../screens/Courses';
import Files from '../screens/Files';
import Folders from '../screens/Folders';
import LoginPage from '../screens/Login';
import Reminders from '../screens/Reminders';
import SignUpPage from '../screens/SignUp';

const Stack = createNativeStackNavigator();
const LoggedOutStack = createNativeStackNavigator();
const LoggedInStack = createNativeStackNavigator();

function LoggedOutLayout() {
  return (
    <LoggedOutStack.Navigator>
      <LoggedOutStack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false, animationTypeForReplace: 'push' }}
      />
      <LoggedOutStack.Screen
        name="Cadastro"
        component={SignUpPage}
        options={{ headerShown: false }}
      />
    </LoggedOutStack.Navigator>
  );
}

function LoggedInLayout() {
  return (
    <LoggedInStack.Navigator>
      <LoggedInStack.Screen
        name="Matérias"
        component={Courses}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="Pastas"
        component={Folders}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="Arquivos"
        component={Files}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="Lembretes"
        component={Reminders}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </LoggedInStack.Navigator>
  );
}

const Router = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (userLog) => {
      setUser(userLog);
    });
  });
  return (
    <Stack.Navigator initialRouteName="Login">
      {user ? (
        <Stack.Screen
          name="LoggedIn"
          component={LoggedInLayout}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="LoggedOut"
          component={LoggedOutLayout}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
export default Router;
