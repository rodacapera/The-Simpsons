import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from '../components/LoadingScreen';
import CharacterInfo from './components/CharacterInfo';
import NotesSection from './components/NotesSection';
import { useCharacterDetailScreen } from './hooks/useCharacterDetailScreen';
import { CharacterDetailScreenProps } from './types';

export const CharacterDetailScreen = ({ route }: CharacterDetailScreenProps) => {

  const { 
    notes, 
    loadingNotes, 
    title, 
    text, 
    editingId, 
    isFormVisible, 
    extendedCharacter, 
    scrollViewRef,
    navigation,
    setTitle, 
    setText, 
    handleSaveNote, 
    resetForm, 
    handleDeleteNote, 
    startEdit, 
    setIsFormVisible, 
    handleTextAreaFocus 
  } = useCharacterDetailScreen(route);

  if (!extendedCharacter) {
    return <LoadingScreen />;
  }
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAwareScrollView 
        ref={scrollViewRef}
        contentContainerStyle={{ padding: 16, paddingBottom: 70 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Character Info */}
        <CharacterInfo character={extendedCharacter} navigation={navigation} />

        {/* Episodes Section with description and link to Episodes*/}
        <View style={styles.card}>
          <Text style={styles.episodesText}>Episodes</Text> 
          <Text style={styles.descriptionText}>Discover the episodes where this character first appeared.</Text> 
          <View style={styles.infoRow}>
            {/* link button to Episodes with hyperlink style */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('Episodes', { episodes: extendedCharacter.first_appearance_ep })}
              style={styles.episodesButton}
            >
              <Text style={styles.episodesButtonText}>View Episodes</Text>
            </TouchableOpacity> 
          </View>
        </View>
        
        {/* Notes Section */}
        <NotesSection 
          notes={notes}
          loadingNotes={loadingNotes}
          title={title}
          text={text}
          editingId={editingId}
          isFormVisible={isFormVisible}
          setIsFormVisible={setIsFormVisible}
          setTitle={setTitle}
          setText={setText}
          handleSaveNote={handleSaveNote}
          resetForm={resetForm}
          handleDeleteNote={handleDeleteNote}
          startEdit={startEdit}
          handleTextAreaFocus={handleTextAreaFocus}
        />
        
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  } as ViewStyle,
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
  episodesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  } as ViewStyle,
  episodesButton: {
    backgroundColor: '#FFD90F',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  episodesButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4f4d4dff',
  } as TextStyle,
  });


