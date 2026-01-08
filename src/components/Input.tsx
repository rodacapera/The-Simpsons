import React from 'react';
import { TextInput, StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  error?: string;
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({ label, value, onChangeText, secureTextEntry, placeholder, error, style }) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.inputError : undefined]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor="#999"
        autoCapitalize="none"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  } as ViewStyle,
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  } as TextStyle,
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  } as TextStyle,
  inputError: {
    borderColor: 'red',
  } as TextStyle,
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  } as TextStyle,
});
