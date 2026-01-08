import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, loading, style, textStyle }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style, loading ? styles.disabled : undefined]} 
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFD90F', // Simpsons Yellow
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
  disabled: {
    opacity: 0.7,
  } as ViewStyle,
});
