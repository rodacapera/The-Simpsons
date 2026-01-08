import React from 'react';
import { Image, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { getCharacterImage } from '../../services/api';
import { CharacterInfoProps } from '../types';
import BackButton from '../../components/BackButton';

const CharacterInfo = ({ character, navigation }: CharacterInfoProps) => {
  return (
    <View style={styles.card}>
      <BackButton navigation={navigation} />
      <Image
        source={{ uri: getCharacterImage({ path: character.portrait_path }) }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.role}>{character.occupation}</Text>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{character.status}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{character.gender}</Text>
      </View>

      {character.phrases && character.phrases.length > 0 && (
        <View style={styles.phrasesContainer}>
          <Text style={styles.sectionTitle}>Phrases</Text>
          {character.phrases.slice(0, 3).map((phrase, index) => (
            <Text
              key={index}
              style={styles.phrase}
            >
              "{phrase}"
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default CharacterInfo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    position: 'relative',
  } as ViewStyle,
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FFD90F',
    backgroundColor: '#eee',
  } as ImageStyle,
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  } as TextStyle,
  role: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  } as TextStyle,
  divider: {
    height: 1,
    backgroundColor: '#eee',
    width: '100%',
    marginVertical: 12,
  } as ViewStyle,
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  } as ViewStyle,
  label: { fontWeight: '600', color: '#555' } as TextStyle,
  value: { color: '#777' } as TextStyle,
  phrasesContainer: {
    marginTop: 12,
    width: '100%',
  } as ViewStyle,
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  } as TextStyle,
  phrase: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 4,
  } as TextStyle,
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  } as ViewStyle,
  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  } as TextStyle,
});
