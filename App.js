import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext'
import LoginForm from './src/components/LoginForm'


const MainFlow = () => {
  return (
    <SafeAreaView>
      <Text>
        Main Flow
      </Text>
    </SafeAreaView>
  )
}

const LoginFlow = () => {
  return (
    <SafeAreaView>
      <LoginForm />
    </SafeAreaView>
  )
}

const AuthFlow = () => {
  const {state} = useContext(AuthContext)

  return (
    state ? <MainFlow /> : <LoginFlow />
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthFlow />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
