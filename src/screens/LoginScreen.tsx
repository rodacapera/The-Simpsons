import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useLoginScreen } from './hooks/useLoginScreen';
import { LoginScreenProps } from './types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { email, setEmail, password, setPassword, loading, handleLogin, showPassword, setShowPassword } = useLoginScreen();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      
      <Input
        label="Email"
        placeholder="homer@simpsons.com"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.inputContainer}>
        <Input
          label="Password"
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <FontAwesomeIcon 
          name={showPassword ? 'eye-slash' : 'eye'} 
          onPress={() => setShowPassword(!showPassword)} 
          size={24} 
          color="black" 
          style={styles.eyeIcon}
        />
      </View>

      <Button 
        title="Login" 
        onPress={handleLogin} 
        loading={loading}
        style={styles.button}
      />

      <Button
        title="Create Account"
        onPress={() => navigation.navigate('Register')}
        style={styles.secondaryButton}
        textStyle={styles.secondaryButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  } as ViewStyle,
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  } as TextStyle,
  button: {
    marginTop: 10,
  } as ViewStyle,
  secondaryButton: {
    backgroundColor: 'transparent',
    marginTop: 10,
  } as ViewStyle,
  secondaryButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  } as TextStyle,
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  input: {
    flex: 1,
  } as ViewStyle, 
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 40,
  } as ViewStyle,
});
