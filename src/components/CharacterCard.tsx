import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { getCharacterImage } from '../services/api';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: getCharacterImage({path: character.portrait_path}) }} 
        style={styles.image} 
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.role} numberOfLines={1}>{character.occupation}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  } as ViewStyle,
  image: {
    width: 60,
    height: 80,
    marginRight: 16,
  } as ImageStyle,
  info: {
    flex: 1,
  } as ViewStyle,
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  } as TextStyle,
  role: {
    fontSize: 14,
    color: '#666',
  } as TextStyle,
});
